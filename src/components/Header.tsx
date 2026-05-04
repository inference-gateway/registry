import { NavLink, useLocation } from 'react-router-dom';

const baseTabClass =
  'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border';
const activeTabClass =
  'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/10';
const inactiveTabClass =
  'text-slate-300 hover:bg-slate-700/50 hover:text-white border-transparent';

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `${baseTabClass} ${isActive ? activeTabClass : inactiveTabClass}`;

export function Header() {
  const location = useLocation();
  const howToActive = location.pathname.startsWith('/how-to');

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <NavLink to="/agents/" className="flex items-center gap-3 group">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Inference Gateway Registry
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/agents/" className={tabClass} end>
            Agents
          </NavLink>
          <NavLink to="/skills/" className={tabClass} end>
            Skills
          </NavLink>
          <NavLink
            to="/how-to/prerequisites/"
            className={`${baseTabClass} ${howToActive ? activeTabClass : inactiveTabClass}`}
          >
            How To
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
