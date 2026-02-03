import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Réservation', path: '/reservation' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-background/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Clock className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              TimeTravel <span className="text-primary group-hover:text-accent transition-colors">Agency</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  location.pathname === link.path ? "text-primary" : "text-gray-300"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  location.pathname === link.path ? "w-full" : ""
                )} />
              </Link>
            ))}
            <Link
              to="/reservation"
              className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/50 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg border-b border-white/10 p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-medium p-2 rounded-lg",
                location.pathname === link.path ? "bg-white/10 text-primary" : "text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
             to="/reservation"
             onClick={() => setIsMobileMenuOpen(false)}
             className="bg-primary text-white p-3 rounded-lg text-center font-bold"
          >
            Réserver maintenant
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;