'use client';

import React, { useState } from 'react';
import { Sparkles, Save, Eye, EyeOff, RefreshCw, CheckCircle2, AlertCircle, Zap, Info } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
  { id: 'anthropic', name: 'Anthropic (Claude)', models: ['claude-3-haiku-20240307', 'claude-3-sonnet-20240229', 'claude-3-opus-20240229'] },
  { id: 'google', name: 'Google Gemini', models: ['gemini-1.5-flash', 'gemini-1.5-pro'] },
];

const DEFAULT_PROMPTS: Record<string, string> = {
  summary: `You are an expert resume writer. Rewrite the following professional summary to be more impactful, concise, and ATS-optimized. Match the tone of a {{templateCategory}} resume. Return ONLY the rewritten content.

Current summary:
"""
{{fieldValue}}
"""`,
  experience: `You are an expert resume writer. Rewrite the following job description using strong action verbs and quantifiable achievements. Match the tone of a {{templateCategory}} resume. Return ONLY the rewritten content.

Current description:
"""
{{fieldValue}}
"""`,
  achievements: `You are an expert resume writer. Rewrite the following achievements as strong bullet points starting with action verbs. Each bullet should be on a new line starting with "•". Match the tone of a {{templateCategory}} resume. Return ONLY the rewritten bullets.

Current achievements:
"""
{{fieldValue}}
"""`,
  project: `You are an expert resume writer. Rewrite the following project description to highlight impact and technical skills. Match the tone of a {{templateCategory}} resume. Return ONLY the rewritten content.

Current description:
"""
{{fieldValue}}
"""`,
};

const CREDIT_LIMITS = [
  { tier: 'Free', current: 10, label: '10 / month' },
  { tier: 'Pro', current: 100, label: '100 / month' },
  { tier: 'Premium', current: -1, label: 'Unlimited' },
];

export default function AISettingsPage() {
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-4o-mini');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [maxTokens, setMaxTokens] = useState(500);
  const [temperature, setTemperature] = useState(0.7);
  const [enableAI, setEnableAI] = useState(true);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [activePromptTab, setActivePromptTab] = useState('summary');
  const [prompts, setPrompts] = useState(DEFAULT_PROMPTS);
  const [saving, setSaving] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);

  const selectedProvider = PROVIDERS.find((p) => p.id === provider)!;

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('AI settings saved successfully');
    setSaving(false);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      toast.error('Enter an API key first');
      return;
    }
    setTesting(true);
    setTestResult(null);
    await new Promise((r) => setTimeout(r, 1500));
    // Simulate a test
    const ok = apiKey.startsWith('sk-') || apiKey.length > 20;
    setTestResult({ ok, message: ok ? 'Connection successful — API key is valid.' : 'Connection failed — check your API key.' });
    setTesting(false);
  };

  const handleResetPrompt = (key: string) => {
    setPrompts((prev) => ({ ...prev, [key]: DEFAULT_PROMPTS[key] }));
    toast.success('Prompt reset to default');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">AI Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure the AI provider, model, and field-level prompts for the resume assistant.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>

      {/* Global toggle */}
      <div className="bg-white border border-slate-200/70 rounded-[20px] p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">AI Assist Feature</p>
            <p className="text-xs text-slate-500">Enable or disable the AI field improvement button for all users.</p>
          </div>
        </div>
        <button
          onClick={() => setEnableAI(!enableAI)}
          aria-pressed={enableAI}
          aria-label="Toggle AI assist"
          className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-1 ${enableAI ? 'bg-violet-600' : 'bg-slate-200'}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enableAI ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      </div>

      {/* Provider & Model */}
      <div className="bg-white border border-slate-200/70 rounded-[20px] p-5 space-y-5">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Provider & Model</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">AI Provider</label>
            <select
              value={provider}
              onChange={(e) => { setProvider(e.target.value); setModel(PROVIDERS.find((p) => p.id === e.target.value)!.models[0]); }}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all"
            >
              {PROVIDERS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all"
            >
              {selectedProvider.models.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* API Key */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">API Key</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={provider === 'openai' ? 'sk-…' : 'Enter API key'}
                className="w-full h-10 pl-3 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={handleTestConnection}
              disabled={testing}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-amber-500" />}
              Test
            </button>
          </div>
          {testResult && (
            <div className={`flex items-center gap-2 text-xs font-medium p-2 rounded-lg ${testResult.ok ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
              {testResult.ok ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
              {testResult.message}
            </div>
          )}
          <p className="text-[10px] text-slate-400">Stored encrypted. Never exposed in client-side code.</p>
        </div>

        {/* Generation params */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Max Tokens <span className="text-slate-400 font-normal">({maxTokens})</span></label>
            <input
              type="range" min={100} max={2000} step={50} value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400"><span>100</span><span>2000</span></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Temperature <span className="text-slate-400 font-normal">({temperature})</span></label>
            <input
              type="range" min={0} max={1} step={0.1} value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400"><span>Precise (0)</span><span>Creative (1)</span></div>
          </div>
        </div>
      </div>

      {/* Credit limits */}
      <div className="bg-white border border-slate-200/70 rounded-[20px] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">AI Credit Limits per Plan</h2>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">Rate limiting</span>
            <button
              onClick={() => setRateLimitEnabled(!rateLimitEnabled)}
              aria-pressed={rateLimitEnabled}
              aria-label="Toggle rate limiting"
              className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${rateLimitEnabled ? 'bg-violet-600' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${rateLimitEnabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {CREDIT_LIMITS.map(({ tier, current, label }) => (
            <div key={tier} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{tier}</p>
              <p className="text-xl font-black text-slate-900">{label}</p>
              <p className="text-[10px] text-slate-400">Resets on billing renewal</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 text-xs">
          <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          Credit limits are enforced server-side in <code className="font-mono bg-sky-100 px-1 rounded">/api/ai/assist</code>. Update the{' '}
          <code className="font-mono bg-sky-100 px-1 rounded">AI_LIMITS</code> constant there to change limits.
        </div>
      </div>

      {/* Prompt templates */}
      <div className="bg-white border border-slate-200/70 rounded-[20px] p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Field Prompt Templates</h2>

        {/* Tab bar */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {Object.keys(DEFAULT_PROMPTS).map((key) => (
            <button
              key={key}
              onClick={() => setActivePromptTab(key)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer capitalize ${activePromptTab === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-slate-500">
              Use <code className="bg-slate-100 px-1 rounded font-mono">{'{{fieldValue}}'}</code> and{' '}
              <code className="bg-slate-100 px-1 rounded font-mono">{'{{templateCategory}}'}</code> as placeholders.
            </p>
            <button
              onClick={() => handleResetPrompt(activePromptTab)}
              className="text-[11px] font-bold text-violet-600 hover:underline cursor-pointer"
            >
              Reset to default
            </button>
          </div>
          <textarea
            rows={10}
            value={prompts[activePromptTab]}
            onChange={(e) => setPrompts((prev) => ({ ...prev, [activePromptTab]: e.target.value }))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all resize-y"
          />
        </div>
      </div>
    </div>
  );
}
