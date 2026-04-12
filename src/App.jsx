import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AnalystDashboard from './pages/AnalystDashboard';
import ResetPassword from './pages/ResetPassword';
import AllUsers from './pages/AllUsers';
import ManageAnalysts from './pages/ManageAnalysts';
import TradingRoom from './pages/TradingRoom';
import Blogs from './pages/Blogs';
import BlogView from './pages/BlogView';
import ManageBlogs from './pages/ManageBlogs';
import MarketCalendar from './pages/MarketCalendar';

function AppContent() {
  const location = useLocation();
  const isTradingRoom = location.pathname === '/trading-room';

  return (
    <div className="min-h-screen flex flex-col">
      {!isTradingRoom && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/analysts" element={<ManageAnalysts />} />
          <Route path="/admin/blogs" element={<ManageBlogs />} />
          <Route path="/analyst/dashboard" element={<AnalystDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/trading-room" element={<TradingRoom />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogId" element={<BlogView />} />
          <Route path="/market-calendar" element={<MarketCalendar />} />
        </Routes>
      </main>
      {!isTradingRoom && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
