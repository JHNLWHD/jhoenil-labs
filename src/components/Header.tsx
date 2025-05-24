import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="py-4 px-4 md:px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="font-bold text-xl">
        <a href="/" className="flex items-center gap-2" aria-label="Jhoenil Wahid Home">
          <img src="jhoenil_labs.png" alt="Jhoenil Labs Logo" className="h-12 w-auto" />
        </a>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8">
        <a href="#about" className="text-sm font-medium hover:text-gray-600 transition-colors">About</a>
        <a href="#services" className="text-sm font-medium hover:text-gray-600 transition-colors">Services</a>
        <a href="#portfolio" className="text-sm font-medium hover:text-gray-600 transition-colors">Portfolio</a>
        <a href="#contact" className="text-sm font-medium hover:text-gray-600 transition-colors">Contact</a>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg p-4 z-50">
          <nav className="flex flex-col gap-4">
            <a href="#about" className="text-sm font-medium py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#services" className="text-sm font-medium py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#portfolio" className="text-sm font-medium py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#contact" className="text-sm font-medium py-2 hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
