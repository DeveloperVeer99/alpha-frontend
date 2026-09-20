import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/useAdmin';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdminMode, openLogin, logout } = useAdmin();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Mentor', href: '#mentor' },
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Community', href: '#community' },
    { name: 'Courses', href: '#courses' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-4 sm:px-6 py-4 transition-all duration-500">
        <div className={`max-w-6xl mx-auto transition-all duration-500 rounded-2xl ${
          isScrolled
            ? 'bg-zinc-950/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] px-4 md:px-6 h-14'
            : 'bg-transparent px-2 md:px-4 h-16'
        } flex items-center justify-between`}>

          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-[#D4AF37] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <span className="text-zinc-950 font-black text-xs tracking-tighter">AC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.15em] text-white leading-tight">
                Alpha Circle
              </span>
              <span className="text-[8px] md:text-[9px] font-semibold text-zinc-600 tracking-widest uppercase">
                Trading Mentorship
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            {isAdminMode ? (
              <button
                type="button"
                onClick={logout}
                className="hidden sm:flex items-center gap-1.5 bg-zinc-950 text-white px-5 py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:bg-zinc-800 border border-emerald-500/50"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Exit Edit Mode
              </button>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="hidden sm:flex items-center gap-1.5 bg-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 px-4 py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200"
                title="Admin login"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Admin
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-20 left-4 right-4 bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all rounded-xl"
                >
                  {item.name}
                </a>
              ))}
              {isAdminMode ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-center bg-zinc-950 border border-emerald-500/50 text-white px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all mt-3"
                >
                  Exit Edit Mode
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openLogin();
                  }}
                  className="block w-full text-center bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all mt-3"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
