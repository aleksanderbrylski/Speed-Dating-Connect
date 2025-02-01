import { render } from 'preact'
import { App } from './app.tsx'
import { PersonProvider } from './context/ConnectionsContext.tsx'
import './index.css'

render(
  <PersonProvider>
    <App />
  </PersonProvider>
  , document.getElementById('app')!)
