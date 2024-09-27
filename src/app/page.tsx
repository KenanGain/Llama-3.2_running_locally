'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "./components/Navbar";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [runtime, setRuntime] = useState(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.length > 3) {
      setResult("");
      setIsLoading(true);

      try {
        const startTime = performance.now();
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, conversationId: "1" }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Failed to get reader from response");
        }

        let fullResponse = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = new TextDecoder().decode(value);
          fullResponse += chunk;
          setResult(fullResponse);
        }

        const endTime = performance.now();
        setRuntime(endTime - startTime);
      } catch (error) {
        console.error("Error in prompt processing:", error);
        setResult("An error occurred while processing your request.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setResult("");
      setRuntime(null);
    }
  };

  return (
    <div className="w-screen h-screen text-black dark:text-white bg-white dark:bg-black">
      <NavBar />
      <div className="flex flex-col items-center justify-center gap-2 pt-10">
        <p className="text-3xl font-semibold">Llama 3.2</p>
        <div className="border dark:text-black text-white dark:bg-white bg-black p-2 rounded-md drop-shadow-2xl">
          <p>
            Llama 3.2 Runtime:{" "}
            {runtime !== null ? runtime.toFixed(2) : "0000.00"} ms
          </p>
        </div>

        <div className="flex flex-col items-center text-pretty text-center justify-center border drop-shadow-2xl rounded-md w-[800px] h-[200px] overflow-auto">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ReactMarkdown className="p-4">{result}</ReactMarkdown>
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center px-24 pt-4 gap-2">
          <Input
            className="w-full h-10"
            type="text"
            placeholder="Prompt replies await—ask me anything, I'm quick to respond!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}