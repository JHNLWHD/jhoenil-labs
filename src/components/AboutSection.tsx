
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-20 px-4 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-white p-1 rounded-xl shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="Jhoenil Wahid" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="mb-4 text-sm uppercase font-medium text-blue-600">About Me</div>
            <h2 className="text-3xl font-bold mb-6">Turning Complex Problems Into Elegant Solutions</h2>
            <p className="text-gray-700 mb-4">
              With over 8 years of experience in software development and technical consulting, I've helped startups, agencies, and enterprises build and scale their digital products.
            </p>
            <p className="text-gray-700 mb-4">
              My journey began as a full-stack developer, and I've since expanded my expertise to include cloud architecture, team leadership, and AI integration. I'm passionate about clean code, performance optimization, and creating technology that makes a difference.
            </p>
            <p className="text-gray-700 mb-6">
              I've successfully delivered projects for clients across various industries including fintech, healthcare, e-commerce, and education, combining technical excellence with business understanding.
            </p>
            <Button className="bg-gray-900 hover:bg-gray-800">Download Resume</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
