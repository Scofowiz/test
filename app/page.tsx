'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Settings, Trash2, Menu } from 'lucide-react';
import SettingsPanel from './components/SettingsPanel';
import MessageList from './components/MessageList';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  topP: number;
  topK: number;
  maxTokens: number;
  enableReasoning: boolean;
  apiKey: string;
}

const GROQ_MODELS = [
  // Llama 4 Models (Preview)
  { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B 128E (Preview)', contextWindow: 131072 },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B 16E (Preview)', contextWindow: 131072 },

  // Llama 3.3 Models
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', contextWindow: 131072 },
  { id: 'llama-3.3-70b-specdec', name: 'Llama 3.3 70B Specdec', contextWindow: 8192 },

  // Llama 3.2 Models
  { id: 'llama-3.2-90b-text-preview', name: 'Llama 3.2 90B Text (Preview)', contextWindow: 8192 },
  { id: 'llama-3.2-11b-text-preview', name: 'Llama 3.2 11B Text (Preview)', contextWindow: 8192 },
  { id: 'llama-3.2-3b-preview', name: 'Llama 3.2 3B (Preview)', contextWindow: 8192 },
  { id: 'llama-3.2-1b-preview', name: 'Llama 3.2 1B (Preview)', contextWindow: 8192 },
  { id: 'llama-3.2-90b-vision-preview', name: 'Llama 3.2 90B Vision (Preview)', contextWindow: 8192 },
  { id: 'llama-3.2-11b-vision-preview', name: 'Llama 3.2 11B Vision (Preview)', contextWindow: 8192 },

  // Llama 3.1 Models
  { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B Versatile', contextWindow: 131072 },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', contextWindow: 131072 },

  // Llama 3 Models
  { id: 'llama3-70b-8192', name: 'Llama 3 70B', contextWindow: 8192 },
  { id: 'llama3-8b-8192', name: 'Llama 3 8B', contextWindow: 8192 },
  { id: 'llama3-groq-70b-8192-tool-use-preview', name: 'Llama 3 Groq 70B Tool Use', contextWindow: 8192 },
  { id: 'llama3-groq-8b-8192-tool-use-preview', name: 'Llama 3 Groq 8B Tool Use', contextWindow: 8192 },

  // DeepSeek Models
  { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill Llama 70B', contextWindow: 8192 },

  // Mixtral Models
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', contextWindow: 32768 },

  // Gemma Models
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', contextWindow: 8192 },
  { id: 'gemma-7b-it', name: 'Gemma 7B', contextWindow: 8192 },

  // Qwen Models
  { id: 'qwen/qwen3-32b', name: 'Qwen 3 32B (Preview)', contextWindow: 131072 },
  { id: 'qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B Instruct', contextWindow: 32768 },
  { id: 'qwen-2.5-32b-instruct', name: 'Qwen 2.5 32B Instruct', contextWindow: 32768 },
  { id: 'qwen2-72b-instruct', name: 'Qwen 2 72B Instruct', contextWindow: 32768 },

  // Kimi Models (Preview)
  { id: 'moonshotai/kimi-k2-instruct-0905', name: 'Kimi K2 0905 (Preview)', contextWindow: 262144 },

  // OpenAI GPT OSS Models
  { id: 'openai/gpt-oss-120b', name: 'GPT OSS 120B', contextWindow: 131072 },
  { id: 'openai/gpt-oss-20b', name: 'GPT OSS 20B', contextWindow: 131072 },

  // Groq Compound Systems
  { id: 'groq/compound', name: 'Groq Compound System', contextWindow: 131072 },
  { id: 'groq/compound-mini', name: 'Groq Compound Mini', contextWindow: 131072 },

  // Safety & Guard Models
  { id: 'meta-llama/llama-guard-4-12b', name: 'Llama Guard 4 12B', contextWindow: 131072 },
  { id: 'llama-guard-3-8b', name: 'Llama Guard 3 8B', contextWindow: 8192 },
  { id: 'meta-llama/llama-prompt-guard-2-22m', name: 'Prompt Guard 2 22M (Preview)', contextWindow: 512 },
  { id: 'meta-llama/llama-prompt-guard-2-86m', name: 'Prompt Guard 2 86M (Preview)', contextWindow: 512 },
  { id: 'openai/gpt-oss-safeguard-20b', name: 'Safety GPT OSS 20B (Preview)', contextWindow: 131072 },

  // Audio Models
  { id: 'whisper-large-v3', name: 'Whisper Large V3 (Audio)', contextWindow: 8192 },
  { id: 'whisper-large-v3-turbo', name: 'Whisper Large V3 Turbo (Audio)', contextWindow: 8192 },

  // Text-to-Speech Models (Preview)
  { id: 'playai-tts', name: 'PlayAI TTS (Preview)', contextWindow: 8192 },
  { id: 'playai-tts-arabic', name: 'PlayAI TTS Arabic (Preview)', contextWindow: 8192 },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    topP: 1,
    topK: 40,
    maxTokens: 8192,
    enableReasoning: false,
    apiKey: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          settings,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Settings Panel */}
      <SettingsPanel
        settings={settings}
        setSettings={setSettings}
        models={GROQ_MODELS}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              Groq Chat
            </h1>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:inline">
              {GROQ_MODELS.find((m) => m.id === settings.model)?.name}
            </span>
          </div>
          <button
            onClick={clearChat}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors group"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-red-500" />
          </button>
        </header>

        {/* Messages */}
        <MessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />

        {/* Input Area */}
        <div className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 resize-none rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 px-4 py-3 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[60px] max-h-[200px]"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
