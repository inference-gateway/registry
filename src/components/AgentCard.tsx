import type { Agent } from '../types/agent';
import { useState } from 'react';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [copied, setCopied] = useState(false);
  
  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const copyToClipboard = async () => {
    try {
      const imageUrl = `${agent.image.repository}:${agent.image.tag}`;
      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/60">
      <div className="relative p-8">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        <div className="relative flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
              {agent.name}
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              v{agent.version} • <span className="text-blue-400">{agent.id}</span>
            </p>
          </div>
          <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/25">
            {agent.license}
          </span>
        </div>
        
        <p className="relative text-slate-300 mb-6 line-clamp-3 leading-relaxed">
          {agent.description}
        </p>
        
        <div className="relative flex flex-wrap gap-2 mb-6">
          {agent.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-slate-700/50 text-blue-300 text-xs font-semibold rounded-full border border-slate-600/30 backdrop-blur-sm"
            >
              {category}
            </span>
          ))}
        </div>
        
        <div className="relative flex flex-wrap gap-2 mb-6">
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-900/50 text-slate-400 text-xs rounded-md border border-slate-700/30"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="relative border-t border-slate-700/50 pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider">Author</span>
              <p className="font-semibold text-white truncate mt-1">
                {agent.author.name}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider">Size</span>
              <p className="font-semibold text-white mt-1">
                {formatSize(agent.image.size)}
              </p>
            </div>
          </div>
          
          {/* OCI Image URL with Copy Button */}
          <div className="mb-4">
            <span className="text-slate-400 text-xs uppercase tracking-wider mb-2 block">OCI Image</span>
            <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-xl border border-slate-700/30">
              <code className="flex-1 text-sm text-blue-300 font-mono truncate">
                {agent.image.repository}:{agent.image.tag}
              </code>
              <button
                onClick={copyToClipboard}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                  copied 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'
                }`}
                title="Copy OCI image URL"
              >
                {copied ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="relative flex gap-3 mt-6 pt-6 border-t border-slate-700/50">
          <a
            href={agent.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl transition-all duration-300 text-sm font-semibold backdrop-blur-sm border border-slate-600/30 hover:border-slate-500/50 group-hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Repository
            </div>
          </a>
          <a
            href={agent.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documentation
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}