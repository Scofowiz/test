'use client';

import { Message } from '../page';
import { User, Bot, Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({
  messages,
  isLoading,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Bot className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mb-4" />
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              Welcome to Groq Chat
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
              Start a conversation with a powerful AI model. Configure your
              settings in the sidebar and send your first message.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}

            <div
              className={`flex-1 max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-red-500 text-white ml-auto'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
              }`}
            >
              <div className="markdown-content whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>

            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center">
                <User className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 max-w-[80%] rounded-lg px-4 py-3 bg-neutral-100 dark:bg-neutral-800">
              <Loader2 className="w-5 h-5 text-neutral-600 dark:text-neutral-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
