import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (sessionStorage.redirect) {
  history.replaceState(null, '', sessionStorage.redirect)
  delete sessionStorage.redirect
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
