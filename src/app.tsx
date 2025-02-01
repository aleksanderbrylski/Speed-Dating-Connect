import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { CreateNewConnections } from './pages/CreateNewConnections';
import { InputData } from './pages/InputData';
import { Overview } from './pages/Overview';

export function App() {

  return (
    <Router>
      <div className="app-container">
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/create" element={<InputData />} />
            <Route path="/edit" element={<CreateNewConnections />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
