import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AddConnections } from './pages/AddConnections';
import { AddPersons } from './pages/AddPersons';
import { CalculateConnections } from './pages/CalculateConnections';
import { Overview } from './pages/Overview';

export function App() {

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/create" element={<AddPersons />} />
            <Route path="/edit" element={<AddConnections />} />
            <Route path="/calculate" element={<CalculateConnections />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
