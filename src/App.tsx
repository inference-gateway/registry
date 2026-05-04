import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AgentsPage } from './pages/AgentsPage'
import { SkillsPage } from './pages/SkillsPage'
import { HowToPage } from './pages/HowToPage'
import { Header } from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/agents/" replace />} />
        <Route path="/agents/" element={<AgentsPage />} />
        <Route path="/skills/" element={<SkillsPage />} />
        <Route path="/how-to/" element={<Navigate to="/how-to/prerequisites/" replace />} />
        <Route path="/how-to/:section/" element={<HowToPage />} />
        <Route path="*" element={<Navigate to="/agents/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
