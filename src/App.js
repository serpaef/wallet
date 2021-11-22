import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WalletPage from './pages/WalletPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <LoginPage/> } />
      <Route path="/wallet" element={ <WalletPage/> } />
    </Routes>
  );
}

export default App;
