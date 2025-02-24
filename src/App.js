import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
// Import your components for different pages
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Videos from './components/Videos';
import Categories from './components/Categories';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
    useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated); // Store authentication status in localStorage
  }, [isAuthenticated]);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
             <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {/* Protected Route - Dashboard */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
