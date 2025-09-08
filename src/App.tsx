import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AgentsPage } from './pages/AgentsPage'
import { HowToPage } from './pages/HowToPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/agents/" replace />} />
        <Route path="/agents/" element={<AgentsPage />} />
        <Route path="/how-to/" element={<Navigate to="/how-to/prerequisites/" replace />} />
        <Route path="/how-to/:section/" element={<HowToPage />} />
        <Route path="*" element={<Navigate to="/agents/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
