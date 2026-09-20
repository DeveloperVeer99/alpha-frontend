import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import AdminBar from './components/AdminBar';
import Home from './pages/Home';

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Single-page site */}
              <Route path="/" element={<Home />} />
              {/* Unknown URLs fall back to the homepage */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />

          {/* Admin layer */}
          <AdminLoginModal />
          <AdminBar />
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
