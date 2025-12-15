import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardHorizontalNav from './components/DashboardHorizontalNav/DashboardHorizontalNav';
import DashboardVerticalNav from './components/DashboardVerticalNav/DashboardVerticalNav';
import CreateProject from './components/CreateProject/CreateProject';

import { useState } from 'react';

function App() {

  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/profile/");
    
  const onlyDashboardRoute = location.pathname.startsWith("/dashboard");

  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <>

      {!isDashboardRoute && <Navbar />}
      {isDashboardRoute && <DashboardHorizontalNav showCreateProject = {showCreateProject} setShowCreateProject={setShowCreateProject} />}
      {onlyDashboardRoute && <DashboardVerticalNav />}
      {showCreateProject && <CreateProject onClose={setShowCreateProject}/>}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/profile/:id" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          </Routes>
        </main>
    </>
  )
}

export default App
