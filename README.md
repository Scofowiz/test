# Groq Chat Interface

A modern, clean chat interface powered by Groq's AI models. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🤖 **18 Groq Models**: All available Groq models including Llama 4, GPT OSS, Qwen, Whisper, and Compound systems
- 🎨 **Clean Design**: Neutral color scheme with subtle red accents
- ⚙️ **Full Control**: Adjust temperature, top_p, top_k, and max tokens
- 🧠 **Reasoning Mode**: Toggle reasoning capabilities for supported models
- 🔑 **Key Management**: Use system environment variables or input your API key directly
- 📱 **Responsive**: Works seamlessly on desktop, mobile, and iPad
- 🌙 **Dark Mode**: Automatic dark mode support
- 🎤 **Audio Support**: Whisper Large V3 and Turbo for audio transcription
- 🔊 **Text-to-Speech**: PlayAI TTS models for voice synthesis
- 🌐 **Long Context**: Up to 262K tokens with Kimi K2
- ⚡ **High Speed**: Models run at up to 1200 tokens/second

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Groq API key (get one at [https://console.groq.com/keys](https://console.groq.com/keys))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd groq-chat-interface
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Groq API key:
```
GROQ_API_KEY=your_api_key_here
```

Alternatively, you can enter your API key directly in the application's settings panel.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Models (18 Total)

### Production Models (7)
- **Llama 3.1 8B Instant** - 131K context, 560 tokens/sec
- **Llama 3.3 70B Versatile** - 131K context, 280 tokens/sec
- **Llama Guard 4 12B** - 131K context, 1200 tokens/sec (Content moderation)
- **GPT OSS 120B** - 131K context, 500 tokens/sec
- **GPT OSS 20B** - 131K context, 1000 tokens/sec
- **Whisper Large V3** - Audio transcription
- **Whisper Large V3 Turbo** - Fast audio transcription

### Production Systems (2)
- **Groq Compound System** - 131K context, 450 tokens/sec (Agentic system with real-time web search)
- **Groq Compound Mini** - 131K context, 450 tokens/sec (Agentic system)

### Preview Models (9)
- **Llama 4 Maverick 17B** - 131K context, 600 tokens/sec
- **Llama 4 Scout 17B** - 131K context, 750 tokens/sec
- **Prompt Guard 2 22M** - 512 tokens (Prompt injection detection)
- **Prompt Guard 2 86M** - 512 tokens (Prompt injection detection)
- **Kimi K2** - 262K context, 200 tokens/sec (Largest context window!)
- **Safety GPT OSS 20B** - 131K context, 1000 tokens/sec
- **PlayAI TTS** - 8K context (Text-to-speech)
- **PlayAI TTS Arabic** - 8K context (Arabic text-to-speech)
- **Qwen 3 32B** - 131K context, 400 tokens/sec

## Configuration

### Temperature
Controls randomness in responses (0-2):
- Lower values (0-0.5): More focused and deterministic
- Higher values (1-2): More creative and varied

### Top P
Nucleus sampling parameter (0-1):
- Controls diversity of word selection
- Lower values: More conservative choices
- Higher values: More diverse outputs

### Top K
Limits vocabulary to top K tokens:
- Range: 1-100
- Lower values: More focused
- Higher values: More diverse

### Max Tokens
Maximum length of generated responses:
- Adjust based on your needs
- Consider model's context window

### Reasoning Toggle
Enable to see the model's reasoning process (model-dependent).

## Building for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Groq SDK
- **Icons**: Lucide React

## License

MIT