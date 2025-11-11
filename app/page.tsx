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
  // Production Models
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', contextWindow: 131072, speed: '560 T/S' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', contextWindow: 131072, speed: '280 T/S' },
  { id: 'meta-llama/llama-guard-4-12b', name: 'Llama Guard 4 12B', contextWindow: 131072, speed: '1200 T/S' },
  { id: 'openai/gpt-oss-120b', name: 'GPT OSS 120B', contextWindow: 131072, speed: '500 T/S' },
  { id: 'openai/gpt-oss-20b', name: 'GPT OSS 20B', contextWindow: 131072, speed: '1000 T/S' },
  { id: 'whisper-large-v3', name: 'Whisper Large V3 (Audio)', contextWindow: 0, speed: 'Audio' },
  { id: 'whisper-large-v3-turbo', name: 'Whisper Large V3 Turbo (Audio)', contextWindow: 0, speed: 'Audio' },

  // Production Systems
  { id: 'groq/compound', name: 'Groq Compound System', contextWindow: 131072, speed: '450 T/S' },
  { id: 'groq/compound-mini', name: 'Groq Compound Mini', contextWindow: 131072, speed: '450 T/S' },

  // Preview Models
  { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B (Preview)', contextWindow: 131072, speed: '600 T/S' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B (Preview)', contextWindow: 131072, speed: '750 T/S' },
  { id: 'meta-llama/llama-prompt-guard-2-22m', name: 'Prompt Guard 2 22M (Preview)', contextWindow: 512, speed: 'Guard' },
  { id: 'meta-llama/llama-prompt-guard-2-86m', name: 'Prompt Guard 2 86M (Preview)', contextWindow: 512, speed: 'Guard' },
  { id: 'moonshotai/kimi-k2-instruct-0905', name: 'Kimi K2 (Preview)', contextWindow: 262144, speed: '200 T/S' },
  { id: 'openai/gpt-oss-safeguard-20b', name: 'Safety GPT OSS 20B (Preview)', contextWindow: 131072, speed: '1000 T/S' },
  { id: 'playai-tts', name: 'PlayAI TTS (Preview)', contextWindow: 8192, speed: 'TTS' },
  { id: 'playai-tts-arabic', name: 'PlayAI TTS Arabic (Preview)', contextWindow: 8192, speed: 'TTS' },
  { id: 'qwen/qwen3-32b', name: 'Qwen 3 32B (Preview)', contextWindow: 131072, speed: '400 T/S' },
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
