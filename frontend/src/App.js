import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ElectionResults from './components/ElectionResult';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="bg-primary text-white text-center py-3">
        <h1>LokSabha Election Results 2024 Dashboard</h1>
      </header>
      <main className="container mt-4">
        <div className="row">
          <ElectionResults />
        </div>
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; {new Date().getFullYear()}LokSabha Election 2024 Results Dashboard - Developed By Somesh ♥️</p>
      </footer>
    </div>
  );
}

export default App;
