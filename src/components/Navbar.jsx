import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleDashboard = () => {
    const user = authService.getCurrentUser();
    if (user) {
      if (user.role === 'superadmin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'analyst') {
        navigate('/analyst/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'P2P', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Market News', path: '/market-calendar' }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-4 sm:px-6 py-4 transition-all duration-500">
        <div className={`max-w-6xl mx-auto transition-all duration-500 rounded-2xl ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] px-3 sm:px-4 md:px-6 h-14' 
            : 'bg-transparent px-2 sm:px-2 md:px-4 h-16'
        } flex items-center justify-between`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-4 group">
            <div className="relative overflow-hidden w-8 h-8 md:w-9 md:h-9 bg-zinc-950 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
              <span className="text-white font-black text-xs tracking-tighter z-10">TR</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 leading-tight">
                Traders Region
              </span>
              <span className="text-[8px] md:text-[10px] font-bold text-zinc-400 tracking-widest uppercase opacity-80">
                Trading Community
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-zinc-100/50 p-1 rounded-full border border-zinc-200/20">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name}
                  to={item.path} 
                  className={`px-5 py-1.5 text-[12px] font-bold uppercase tracking-wider transition-all duration-200 rounded-full ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="hidden sm:block bg-zinc-100 text-zinc-900 px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:bg-zinc-200"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="hidden sm:block bg-red-600 text-white px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden sm:block bg-zinc-100 text-zinc-900 px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:bg-zinc-200"
              >
                Login
              </Link>
            )}
            <a 
              href="https://discord.gg/MgrrVexMrQ" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:block relative group overflow-hidden bg-zinc-950 text-white px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
            >
              <span className="relative z-10">Join Discord</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center transition-colors hover:bg-zinc-200"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 rounded-xl ${
                      isActive
                        ? 'bg-zinc-900 text-white' 
                        : 'text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      handleDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center bg-zinc-100 text-zinc-900 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-200 hover:bg-zinc-200 mt-4"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center bg-red-600 text-white px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-200 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-zinc-100 text-zinc-900 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-200 hover:bg-zinc-200 mt-4"
                >
                  Login
                </Link>
              )}
              
              <a 
                href="https://discord.gg/MgrrVexMrQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-zinc-950 text-white px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-200 hover:bg-zinc-800 mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

