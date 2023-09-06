import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Activity from './pages/Activitiy'
import Gallery from './pages/Gallery'
import Profile from './pages/Profile'
import AddActivity from './pages/AddActivity';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />}/>
        <Route path="/kegiatan" element={<Activity />}/>
        <Route path="/galeri" element={<Gallery />}/>
        <Route path="/profil" element={<Profile />}/>
        <Route path="/kegiatan/tambah" element={<AddActivity />}/>
      </Routes>
    </Router>
  )
}

export default App
