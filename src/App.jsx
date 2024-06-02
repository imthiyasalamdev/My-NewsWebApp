import React from 'react';
import NewsList from './components/NewsList';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Welcome to News Website</h1>
      </header>
      <main className="p-4">
        <NewsList />
      </main>
    </div>
  );
}

export default App;
// API KEY: db0c89fbc7784902bc5964c83f1c3dd8