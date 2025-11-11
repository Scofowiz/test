# Groq Chat Interface

A modern, clean chat interface powered by Groq's AI models. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🤖 **50+ Groq Models**: Complete access to all Groq models including Llama 4, GPT OSS, Qwen, Whisper, and more
- 🎨 **Clean Design**: Neutral color scheme with subtle red accents
- ⚙️ **Full Control**: Adjust temperature, top_p, top_k, and max tokens
- 🧠 **Reasoning Mode**: Toggle reasoning capabilities for supported models
- 🔑 **Key Management**: Use system environment variables or input your API key directly
- 📱 **Responsive**: Works seamlessly on desktop, mobile, and iPad
- 🌙 **Dark Mode**: Automatic dark mode support
- 🎤 **Audio Support**: Includes Whisper models for audio transcription
- 🔊 **Text-to-Speech**: PlayAI TTS models for voice synthesis
- 🌐 **Long Context**: Up to 262K tokens with Kimi K2

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

## Available Models (50+ Models!)

### Llama 4 Models (Preview)
- **Llama 4 Maverick 17B 128E** - 131K context window
- **Llama 4 Scout 17B 16E** - 131K context window

### Llama 3.3 Models
- **Llama 3.3 70B Versatile** - 131K context window
- **Llama 3.3 70B Specdec** - 8K context window

### Llama 3.2 Models
- **Llama 3.2 90B Text** - 8K context window
- **Llama 3.2 90B Vision** - 8K context window (Image support)
- **Llama 3.2 11B Text** - 8K context window
- **Llama 3.2 11B Vision** - 8K context window (Image support)
- **Llama 3.2 3B** - 8K context window
- **Llama 3.2 1B** - 8K context window

### Llama 3.1 Models
- **Llama 3.1 70B Versatile** - 131K context window
- **Llama 3.1 8B Instant** - 131K context window

### Llama 3 Models
- **Llama 3 70B** - 8K context window
- **Llama 3 8B** - 8K context window
- **Llama 3 Groq 70B Tool Use** - 8K context window (Function calling)
- **Llama 3 Groq 8B Tool Use** - 8K context window (Function calling)

### DeepSeek Models
- **DeepSeek R1 Distill Llama 70B** - 8K context window (Reasoning model)

### Mixtral Models
- **Mixtral 8x7B** - 32K context window

### Gemma Models
- **Gemma 2 9B** - 8K context window
- **Gemma 7B** - 8K context window

### Qwen Models
- **Qwen 3 32B** (Preview) - 131K context window
- **Qwen 2.5 72B Instruct** - 32K context window
- **Qwen 2.5 32B Instruct** - 32K context window
- **Qwen 2 72B Instruct** - 32K context window

### Kimi Models
- **Kimi K2 0905** (Preview) - 262K context window

### OpenAI GPT OSS Models
- **GPT OSS 120B** - 131K context window
- **GPT OSS 20B** - 131K context window

### Groq Compound Systems
- **Groq Compound System** - 131K context window (Agentic system)
- **Groq Compound Mini** - 131K context window (Agentic system)

### Safety & Guard Models
- **Llama Guard 4 12B** - 131K context window
- **Llama Guard 3 8B** - 8K context window
- **Prompt Guard 2 22M** (Preview) - 512 tokens (Prompt injection detection)
- **Prompt Guard 2 86M** (Preview) - 512 tokens (Prompt injection detection)
- **Safety GPT OSS 20B** (Preview) - 131K context window

### Audio Models
- **Whisper Large V3** - Audio transcription
- **Whisper Large V3 Turbo** - Fast audio transcription

### Text-to-Speech Models (Preview)
- **PlayAI TTS** - High-quality text-to-speech
- **PlayAI TTS Arabic** - Arabic text-to-speech

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