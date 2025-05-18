
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="hero-gradient py-16 md:py-20 px-4 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4 text-sm uppercase font-medium text-gray-600">Welcome to JhonDeLabs</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Crafting Modern<br />Web & Mobile<br />Experiences
            </h1>
            <p className="text-gray-700 mb-8 max-w-lg">
              I'm <strong>Jhonty Delgad</strong> - a senior developer specialized in
              React.js, React Native, and Flutter. I help startups and
              businesses launch world-class apps and digital platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gray-900 hover:bg-gray-800">View Portfolio</Button>
              <Button variant="outline">Let's Connect</Button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="relative">
              <div className="bg-white p-1 rounded-xl shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Jhonty Delgad" 
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
