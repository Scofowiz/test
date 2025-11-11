'use client';

import { Settings, X, Key, RefreshCw } from 'lucide-react';
import { ChatSettings, GroqModel } from '../page';

interface SettingsPanelProps {
  settings: ChatSettings;
  setSettings: (settings: ChatSettings) => void;
  models: GroqModel[];
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  loadingModels: boolean;
  onRefreshModels: () => void;
}

export default function SettingsPanel({
  settings,
  setSettings,
  models,
  showSettings,
  setShowSettings,
  loadingModels,
  onRefreshModels,
}: SettingsPanelProps) {
  const updateSetting = <K extends keyof ChatSettings>(
    key: K,
    value: ChatSettings[K]
  ) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <>
      {/* Mobile overlay */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Settings sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-0
          w-80 h-screen bg-white dark:bg-neutral-800
          border-r border-neutral-200 dark:border-neutral-700
          transition-transform duration-300 ease-in-out
          ${showSettings ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Settings Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-red-500" />
              <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">
                Settings
              </h2>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="lg:hidden p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
            >
              <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* API Key */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <Key className="w-4 h-4 text-red-500" />
                API Key
              </label>
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => updateSetting('apiKey', e.target.value)}
                placeholder="Enter your Groq API key"
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Leave empty to use system environment variable
              </p>
            </div>

            {/* Model Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Model ({models.length} available)
                </label>
                <button
                  onClick={onRefreshModels}
                  disabled={loadingModels}
                  className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors disabled:opacity-50"
                  title="Refresh model list"
                >
                  <RefreshCw className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 ${loadingModels ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <select
                value={settings.model}
                onChange={(e) => updateSetting('model', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={loadingModels}
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} {model.contextWindow > 0 ? `(${model.contextWindow.toLocaleString()} tokens)` : ''}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Models loaded from Groq API
              </p>
            </div>

            {/* Temperature */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Temperature
                </label>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {settings.temperature}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.temperature}
                onChange={(e) =>
                  updateSetting('temperature', parseFloat(e.target.value))
                }
                className="w-full accent-red-500"
              />
              <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            {/* Top P */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Top P
                </label>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {settings.topP}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.topP}
                onChange={(e) =>
                  updateSetting('topP', parseFloat(e.target.value))
                }
                className="w-full accent-red-500"
              />
            </div>

            {/* Top K */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Top K
                </label>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {settings.topK}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={settings.topK}
                onChange={(e) =>
                  updateSetting('topK', parseInt(e.target.value))
                }
                className="w-full accent-red-500"
              />
            </div>

            {/* Max Tokens */}
            <div>
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                Max Tokens
              </label>
              <input
                type="number"
                min="1"
                max="32768"
                value={settings.maxTokens}
                onChange={(e) =>
                  updateSetting('maxTokens', parseInt(e.target.value))
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Reasoning Toggle */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Enable Reasoning
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.enableReasoning}
                    onChange={(e) =>
                      updateSetting('enableReasoning', e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </div>
              </label>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Show model's reasoning process
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
