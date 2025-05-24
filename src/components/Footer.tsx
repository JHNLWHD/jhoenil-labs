
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold text-xl mb-4">Jhoenil Wahid</div>
            <p className="text-gray-400 text-sm mb-4">
              Senior Software Engineer & Tech Consultant: Transforming systems, empowering businesses.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white text-sm">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white text-sm">Services</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-white text-sm">Portfolio</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white text-sm">LinkedIn</a>
            </div>
            <p className="text-xs text-gray-500">
              © {currentYear} Jhoenil Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
