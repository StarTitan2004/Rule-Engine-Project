import React from 'react';
import Graph from './components/Graph';

const App = () => (
  <div className="app">
    <header>
      <h1>Firewall Packet Visualization</h1>
    </header>
    <main>
      <Graph />
    </main>
  </div>
);

export default App;
