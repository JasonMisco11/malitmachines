import React, { useState } from 'react';
import { SupabaseConfigState } from '../types';
import { testSupabaseConnection, saveSupabaseConfig, SUPABASE_SQL_SCHEMA } from '../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SupabaseConfigState;
  onUpdateConfig: (newConfig: SupabaseConfigState) => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [url, setUrl] = useState(config.url || '');
  const [anonKey, setAnonKey] = useState(config.anonKey || '');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    const res = await testSupabaseConnection(url, anonKey);
    setTesting(false);
    setTestResult(res);

    if (res.success) {
      const updatedConfig: SupabaseConfigState = {
        url,
        anonKey,
        isConnected: true,
        lastConnectedAt: new Date().toISOString(),
      };
      saveSupabaseConfig(updatedConfig);
      onUpdateConfig(updatedConfig);
    }
  };

  const handleDisconnect = () => {
    const emptyConfig: SupabaseConfigState = {
      url: '',
      anonKey: '',
      isConnected: false,
    };
    saveSupabaseConfig(emptyConfig);
    onUpdateConfig(emptyConfig);
    setUrl('');
    setAnonKey('');
    setTestResult({ success: false, message: 'Disconnected from Supabase.' });
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#c2c6d4] space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e1e3e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#191c1d]">Supabase Database Integration</h3>
              <p className="text-xs text-[#424752]">Connect your persistent cloud database for TCS bookings & cleaners.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-[#727784]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Current Connection Banner */}
        <div className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          config.isConnected ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="flex items-center gap-3">
            <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${config.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <p className="font-extrabold text-sm">
                {config.isConnected ? 'Supabase Database Connected' : 'Database Connection Pending'}
              </p>
              <p className="text-[11px] opacity-90 mt-0.5">
                {config.isConnected
                  ? `Active connection: ${config.url}`
                  : 'Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Secrets panel or enter credentials below.'}
              </p>
            </div>
          </div>

          {config.isConnected && (
            <button
              onClick={handleDisconnect}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-800 font-bold px-3 py-1.5 rounded-lg border border-red-300 transition-colors self-start sm:self-auto"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Informational Guidance Box */}
        <div className="bg-[#f8f9fa] border border-[#c2c6d4] p-4 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#003f87]">
            <span className="material-symbols-outlined text-sm">key</span>
            <span>Setting Up API Credentials</span>
          </div>
          <p className="text-[#424752] leading-relaxed">
            You can set <code className="font-mono-code text-[11px] bg-gray-200 px-1 py-0.5 rounded text-[#191c1d]">VITE_SUPABASE_URL</code> and <code className="font-mono-code text-[11px] bg-gray-200 px-1 py-0.5 rounded text-[#191c1d]">VITE_SUPABASE_ANON_KEY</code> in the <strong>Secrets panel</strong> or enter them below to test the connection directly.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleTestAndSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Supabase Project URL *</label>
            <input
              type="url"
              required
              placeholder="https://your-project-ref.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3.5 py-2.5 font-mono-code outline-none focus:ring-2 focus:ring-[#003f87]"
            />
          </div>

          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Supabase Anon / Public Key *</label>
            <input
              type="password"
              required
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3.5 py-2.5 font-mono-code outline-none focus:ring-2 focus:ring-[#003f87]"
            />
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl border text-xs ${
              testResult.success ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800'
            }`}>
              {testResult.message}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowSqlSchema(!showSqlSchema)}
              className="text-[#003f87] font-bold underline text-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">code</span>
              {showSqlSchema ? 'Hide SQL Script' : 'View SQL Schema Setup Script'}
            </button>

            <button
              type="submit"
              disabled={testing}
              className="bg-[#003f87] hover:bg-[#0056b3] text-white font-bold px-6 py-2.5 rounded-xl shadow-xs"
            >
              {testing ? 'Connecting...' : 'Save & Connect Supabase'}
            </button>
          </div>
        </form>

        {/* SQL Schema Code Accordion */}
        {showSqlSchema && (
          <div className="bg-[#1e1e1e] text-emerald-400 p-4 rounded-2xl text-xs font-mono-code space-y-3 relative">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-300 font-bold">Copy to Supabase SQL Editor:</span>
              <button
                onClick={handleCopySql}
                className="bg-emerald-600 text-white font-bold px-3 py-1 rounded text-[11px] hover:bg-emerald-500"
              >
                {copiedSql ? '✓ Copied!' : 'Copy SQL Script'}
              </button>
            </div>
            <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap text-[11px] leading-relaxed text-gray-200">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
