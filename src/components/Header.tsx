
import React from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="py-4 px-4 md:px-8 flex justify-between items-center">
      <div className="font-bold text-xl">
        <a href="/" className="flex items-center gap-2">
          <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md">Jhoenil Wahid</span>
        </a>
      </div>
      <nav className="hidden md:flex gap-8">
        <a href="#about" className="text-sm font-medium hover:text-gray-600 transition-colors">About</a>
        <a href="#services" className="text-sm font-medium hover:text-gray-600 transition-colors">Services</a>
        <a href="#portfolio" className="text-sm font-medium hover:text-gray-600 transition-colors">Portfolio</a>
        <a href="#contact" className="text-sm font-medium hover:text-gray-600 transition-colors">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
