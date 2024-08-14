import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;