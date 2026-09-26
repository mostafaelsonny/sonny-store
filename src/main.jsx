import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { DataProvider } from './context/DataContext'; // 👈 استدعاء الـ Provider
import { AuthProvider } from './context/AuthContext.jsx'
import FavProvider from './context/FavProvider.jsx'
import CartProvider from './context/CartProvider.jsx';

// react router dom //
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <DataProvider>
    <CartProvider>
      <FavProvider>
      <App />
      </FavProvider>
    </CartProvider>
    </DataProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);