
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold">JhonDeLabs</span>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white text-xs">
            Dribbble
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-xs">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-xs">
            Github
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-xs">
            LinkedIn
          </a>
        </div>
        
        <div className="mt-4 md:mt-0 text-xs text-gray-500">
          © {currentYear} JhonDeLabs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
