import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionGlobalConfig } from 'motion/react'
import './index.css'
import App from './App.jsx'

// Respect the OS-level reduced-motion preference for all Motion animations
MotionGlobalConfig.reduceMotion = 'user'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
