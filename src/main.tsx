import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { render } from 'preact'
import { App } from './app.tsx'
import { PersonProvider } from './context/ConnectionsContext.tsx'
import './index.css'
import theme from './theme.ts'

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <PersonProvider>
      <App />
    </PersonProvider>
  </ThemeProvider>
  , document.getElementById('app')!)
