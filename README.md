
# Llama 3.2 Streaming Application

![Alt](https://repobeats.axiom.co/api/embed/dd6c17cd8297491dfeca29daac9d452775cd7e3e.svg "Repobeats analytics image")

This project implements a real-time AI model interaction interface using **Llama 3.2** with support for small LLM models on local execution. The application leverages several modern tools and technologies to provide a seamless experience for handling AI prompts, showcasing AI model outputs, and improving the interaction efficiency using debouncing.

## Key Features

- **AI Model Streaming**: Real-time response generation from Llama 3.2 and Smollm models.
- **Debounce Function**: Efficient input handling to avoid unnecessary API calls.
- **React Markdown**: Display of AI-generated content with formatting support.
- **Performance Tracking**: Calculate and display the runtime of responses in milliseconds.
- **Cache Mechanism**: Implements a caching mechanism to store recent responses for quick access.
- **AbortController**: Manages multiple instances of AI model requests, aborting previous requests if needed.
- **Dark Mode Support**: Switch between light and dark themes using `next-themes`.
- **Shadcn UI**: Clean and modern UI components styled using Tailwind CSS.

## Technologies Used

- **Next.js**: The React framework for building full-stack web applications.
- **Bun**: Lightning-fast JavaScript runtime that works seamlessly with npm projects.
- **Vercel AI SDK**: Used for integrating powerful AI capabilities.
- **Shadcn UI**: Components and utilities for building clean user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for fast styling.
- **Langchain/Ollama**: Used to interact with small and local LLM models like `Llama3.2` and `Smollm`.
  
## Installation and Usage

### Clone the Repository

```bash
git clone https://github.com/KenanGain/Llama3.2streaming.git
cd Llama3.2streaming
```

### Install Dependencies

For **npm**:

```bash
npm install
```

For **Bun**:

```bash
bun install
```

### Start the Development Server

For **npm**:

```bash
npm run dev
```

For **Bun**:

```bash
bun run dev
```

### Build for Production

For **npm**:

```bash
npm run build
```

For **Bun**:

```bash
bun run build
```

## API Interaction

The backend of the application is powered by a custom API endpoint `/api/chat` that interacts with the Llama3.2 and Smollm models, handling streaming responses efficiently. The debouncing feature ensures that user inputs are processed smoothly without unnecessary requests.

## How It Works

1. **Prompt Input**: Users input their prompt in the search bar.
2. **Debouncing**: Input is processed using a custom debounce function to avoid excessive API calls.
3. **API Call**: A fetch request is made to the `/api/chat` endpoint with the user's prompt.
4. **Response Streaming**: The response is streamed back in real-time and rendered in the interface.
5. **Performance Tracking**: The runtime of the response is calculated and displayed.

## Blog Post

Learn more about running small LLM models locally using Ollama, ONNX, and other tools in my blog post:

[The Future of Local LLM Execution - Running Language Models Locally with Ollama, ONNX, and More](https://dev.to/kenangain/the-future-of-local-llm-execution-running-language-models-locally-with-ollama-onnx-and-more-4f97)

## Connect with Me

Feel free to reach out or check out my profiles:

- LinkedIn: [Kenan Gain](https://www.linkedin.com/in/kenan-gain-33048518a/)
- Bento Profile: [Kenan Gain](https://bento.me/kenangain)
- YouTube: [KnightGamer87](https://www.youtube.com/@KnightGamer87)
- Email: [Kenangain2910@gmail.com](mailto:Kenangain2910@gmail.com)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Stay tuned for more updates and improvements as we continue to enhance AI model interaction experiences!
