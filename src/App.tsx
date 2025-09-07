import { useState } from 'react'
import { AgentsPage } from './pages/AgentsPage'
import { HowToPage } from './pages/HowToPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'agents' | 'howto'>('agents')

  return (
    <>
      {currentPage === 'agents' && <AgentsPage onShowHowTo={() => setCurrentPage('howto')} />}
      {currentPage === 'howto' && <HowToPage onBackToAgents={() => setCurrentPage('agents')} />}
    </>
  )
}

export default App