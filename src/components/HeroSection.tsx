
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="hero-gradient py-16 md:py-20 px-4 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4 text-sm uppercase font-medium text-gray-600">Welcome</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Senior Software Engineer<br />&amp; Tech Consultant
            </h1>
            <p className="text-gray-700 mb-8 max-w-lg">
              I'm <strong>Jhoenil Wahid</strong> - a passionate software engineer and consultant with expertise in modern web technologies, DevOps, technical leadership, and AI solutions. I help businesses transform their digital presence with cutting-edge technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gray-900 hover:bg-gray-800">View Portfolio</Button>
              <Button variant="outline">Contact Me</Button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="relative">
              <div className="bg-white p-1 rounded-xl shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Jhoenil Wahid" 
                  className="w-full max-w-sm h-auto rounded-lg"
                  style={{ aspectRatio: '4/5' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
