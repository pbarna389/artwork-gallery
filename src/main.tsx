import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ArtworkContextProvider from './context/ArtworkContext'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ArtworkContextProvider>
      <App />
    </ArtworkContextProvider>
  </React.StrictMode>,
)
