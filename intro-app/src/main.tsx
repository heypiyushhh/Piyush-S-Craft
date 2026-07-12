import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CoursesShowcase from './CoursesShowcase.tsx'

const introContainer = document.getElementById('intro-root');
if (introContainer) {
  createRoot(introContainer).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

const coursesContainer = document.getElementById('courses-root');
if (coursesContainer) {
  createRoot(coursesContainer).render(
    <StrictMode>
      <CoursesShowcase />
    </StrictMode>,
  )
}
