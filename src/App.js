import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Videos from './components/Videos';
import Categories from './components/Categories';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

const App = () => {
    return (
        
        <Router>
            <Routes>
                <Route path='/' element ={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </Router>
    );
};

export default App;
