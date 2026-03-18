import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'

function App() {
  return (
    <div data-theme="light" className="min-h-screen bg-bg text-text-default p-8">
      <h1 className="text-h1 font-bold">Murfy Design System</h1>
      <p className="text-text-main mt-4">Run <code>npm run storybook</code> to explore components.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
