import './assets/css/App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from './utils/axios'
// Auth
import Login from './pages/Auth/Login';
import Forgot from './pages/Auth/Forgot';
// Mahasiswa
import Dashboard from './pages/Main/Dashboard'
import Activity from './pages/Main/Activitiy'
import Gallery from './pages/Main/Gallery'
import Profile from './pages/Main/Profile'
import AddActivity from './pages/Second/AddActivity';
import DetailActivity from './pages/Second/DetailActivity';
// Admin
import AdminDashboard from './pages/Admin/Dashboard';
import Magang from './pages/Admin/Magang';
import MagangDetail from './pages/Admin/MagangDetail';
import MagangCreate from './pages/Admin/MagangCreate';

const App = () => {

  const verifyToken = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userData'))
      await axios.get(`/auth/verify-token/${user?.role}`);
      return true
    } catch (error) {
      return false
    }
  };

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login verifyToken={verifyToken} />} />
        <Route path="/lupa-password" element={<Forgot verifyToken={verifyToken} />}/>
        {/* Mahasiswa */}
        <Route exact path="/" element={<Dashboard verifyToken={verifyToken} />}/>
        <Route path="/kegiatan" element={<Activity verifyToken={verifyToken} />}/>
        <Route path="/galeri" element={<Gallery verifyToken={verifyToken} />}/>
        <Route path="/profil" element={<Profile verifyToken={verifyToken} />}/>
        <Route path="/kegiatan/tambah" element={<AddActivity verifyToken={verifyToken} />}/>
        <Route path="/kegiatan/:uuid" element={<DetailActivity verifyToken={verifyToken} />}/>
        {/* Admin */}
        <Route path="/administrator/dashboard" element={<AdminDashboard verifyToken={verifyToken} />}/>
        <Route path="/administrator/magang" element={<Magang verifyToken={verifyToken} />}/>
        <Route path="/administrator/magang/create" element={<MagangCreate verifyToken={verifyToken} />}/>
        <Route path="/administrator/magang/:fieldworkId" element={<MagangDetail verifyToken={verifyToken} />}/>
        {/* 404 */}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  )
}

export default App
