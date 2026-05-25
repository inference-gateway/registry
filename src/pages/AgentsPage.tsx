import { useEffect, useMemo, useRef, useState } from 'react';
import type { CatalogAgent } from '../types/adl';
import { AgentCard } from '../components/AgentCard';
import { loadAgents } from '../services/agentService';
import { deriveTags } from '../utils/adl';

export function AgentsPage() {
  const [agents, setAgents] = useState<CatalogAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const loaded = await loadAgents();
        setAgents(loaded);
        setLoadError(null);
      } catch (error) {
        console.error('Failed to load agents:', error);
        setLoadError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const agentTags = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const agent of agents) {
      map.set(agent.metadata.name, deriveTags(agent));
    }
    return map;
  }, [agents]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const list of agentTags.values()) {
      for (const tag of list) tags.add(tag);
    }
    return Array.from(tags).sort();
  }, [agentTags]);

  const filteredAgents = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return agents.filter((agent) => {
      const tags = agentTags.get(agent.metadata.name) ?? [];
      const matchesSearch =
        searchTerm === '' ||
        agent.metadata.name.toLowerCase().includes(q) ||
        agent.metadata.description.toLowerCase().includes(q) ||
        tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesTag = selectedTag === '' || tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [agents, agentTags, searchTerm, selectedTag]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-slate-800/50 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 shadow-2xl shadow-red-500/10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 19h14.14a2 2 0 001.74-3l-7.07-12a2 2 0 00-3.48 0L3.19 16a2 2 0 001.74 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Couldn't load the agents catalog</h2>
          <p className="text-slate-400 text-sm mb-6 font-mono break-all">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-xl transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-500/10 via-transparent to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-6 leading-tight">
            Agent Registry
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover specialized A2A (agent-to-agent) services. All entries follow the{' '}
            <a
              href="https://github.com/inference-gateway/adl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              Agent Definition Language
            </a>{' '}
            schema.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search agents by name, description, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-2xl shadow-black/20"
              />
            </div>

            <div className="relative min-w-[200px]" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-2xl shadow-black/20 flex items-center justify-between hover:bg-slate-700/50"
              >
                <span className="truncate">{selectedTag ? `#${selectedTag}` : 'All Tags'}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/40 z-50 max-h-64 overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => handleTagSelect('')}
                    className={`w-full px-6 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-3 ${
                      selectedTag === '' ? 'text-blue-400 bg-blue-500/10' : 'text-white'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${selectedTag === '' ? 'bg-blue-400' : 'bg-transparent border border-slate-600'}`}></div>
                    All Tags
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`w-full px-6 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-3 ${
                        selectedTag === tag ? 'text-blue-400 bg-blue-500/10' : 'text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${selectedTag === tag ? 'bg-blue-400' : 'bg-transparent border border-slate-600'}`}></div>
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-slate-400 bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/30">
              {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'} found
            </span>
            {(searchTerm || selectedTag) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/30 hover:border-blue-500/30"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 backdrop-blur-xl rounded-2xl mb-6 border border-slate-700/50">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-300 text-lg">No agents found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.metadata.name} agent={agent} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-slate-300">
              The full catalog is also served as JSON at{' '}
              <a
                href="https://cdn.jsdelivr.net/gh/inference-gateway/agents@main/catalog.json"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm"
              >
                catalog.json
              </a>
              . To list a new agent, open a PR against{' '}
              <a
                href="https://github.com/inference-gateway/agents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                inference-gateway/agents
              </a>{' '}
              with the repo URL of any public agent that ships an{' '}
              <code className="text-blue-300">agent.yaml</code> at its root.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
