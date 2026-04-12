import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-zinc-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-zinc-950 font-black text-sm">TR</span>
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-wider">Traders Region</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider">Trading Community</div>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Premium Discord trading community providing professional signals, market analysis, and education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a 
                href="https://twitter.com/tradersregion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@tradersregion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
              <a 
                href="https://instagram.com/tradersregion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">
            © 2024 Traders Region. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
