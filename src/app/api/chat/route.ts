import { ChatOllama } from "@langchain/ollama";
import type { NextRequest } from "next/server";

// Track the current abort controller
let currentAbortController: AbortController | null = null;
// biome-ignore lint/style/useConst: <explanation>
let currentInstance: ChatOllama | null = null;

// Counter to track the number of Ollama instances created
let ollamaInstanceCount = 0;

// Create a new ChatOllama instance for each request
const createOllama = () => {
  // Abort the previous instance if it exists
  if (currentAbortController) {
    currentAbortController.abort();
    console.log("Previous Ollama instance aborted.");
  }

  // Create a new abort controller for this request
  const abortController = new AbortController();
  currentAbortController = abortController; // Save the current abort controller

  ollamaInstanceCount++; // Increment the counter each time an instance is created
  console.log(`Ollama instance created. Total instances: ${ollamaInstanceCount}`);
  
  return new ChatOllama({
    model: "llama3.2:1b",
    // model: "smollm:135m",
    // Adjust to the correct model if necessary
    numPredict: 100,       // Limit the number of tokens generated
    // Additional configurations if needed
  });
};

// Cache implementation with expiry mechanism
class Cache<K, V> {
  private cache = new Map<K, { value: V; expiry: number }>();
  private readonly ttl: number;

  constructor(ttl: number = 60000) {
    this.ttl = ttl; // Default TTL of 1 minute
  }

  set(key: K, value: V): void {
    const expiry = Date.now() + this.ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expiry) {
      return item.value;
    }
    this.cache.delete(key);
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }
}

const responseCache = new Cache<string, string>(10000); // 10 seconds TTL

export async function POST(req: NextRequest) {
  try {
    const { prompt, conversationId }: { prompt: string; conversationId: string } = await req.json();

    // Process only if the prompt is more than 5 characters
    if (!prompt || prompt.length <= 5) {
      return new Response(null, { status: 204 });
    }

    const cacheKey = `${conversationId}:${prompt}`; // Ensure the cache key is unique per prompt

    // Check if a cached response exists
    if (responseCache.has(cacheKey)) {
      const cachedResponse = responseCache.get(cacheKey);
      return new Response(cachedResponse, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Create a new Ollama instance (and abort the previous one if it exists)
    const ollama = createOllama();
    let fullResponse = "";

    // Stream the entire response and append the content
    const stream = await ollama.stream(prompt);
    for await (const chunk of stream) {
      fullResponse += chunk.content;
    }

    // Cache the full response
    responseCache.set(cacheKey, fullResponse);

    // Return the full response
    return new Response(fullResponse, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error in Ollama chat:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
