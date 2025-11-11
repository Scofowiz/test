# Groq Chat Interface

A modern, clean chat interface powered by Groq's AI models. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🤖 **Dynamic Model Loading**: Automatically fetches the latest models from Groq's API
- 🔄 **Always Up-to-Date**: Refresh button to get the newest models as they're released
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

## Available Models

The application **dynamically fetches** all available models from Groq's API, ensuring you always have access to the latest models. The model list automatically updates when:
- You first open the application
- You enter or change your API key
- You click the refresh button in settings

This means you'll always have access to:
- Production models (Llama 3.1, 3.3, GPT OSS, Whisper, etc.)
- Agentic systems (Groq Compound)
- Preview models (Llama 4, Kimi K2, Qwen 3, etc.)
- Any new models Groq releases

See the [official Groq documentation](https://console.groq.com/docs/models) for the complete, up-to-date model list with specifications.

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