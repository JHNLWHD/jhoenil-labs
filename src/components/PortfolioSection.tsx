
import React from 'react';
import { ArrowRight, Laptop, Heart, ShoppingCart } from 'lucide-react';

const PortfolioItem = ({ icon: Icon, title, description, link }: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  link: string 
}) => {
  return (
    <div className="portfolio-card">
      <div className="portfolio-icon text-blue-600 mb-6" aria-hidden="true">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <a 
        href={link}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        aria-label={`View ${title} project`}
      >
        View Project <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
};

const PortfolioSection = () => {
  const portfolioItems = [
    {
      icon: Laptop,
      title: 'Fintech Dashboard',
      description: 'A responsive financial analytics dashboard with real-time data visualization. Built for a US-based fintech startup.',
      link: '#'
    },
    {
      icon: Heart,
      title: 'Health Tracker App',
      description: 'Cross-platform mobile app for tracking daily health metrics, workout data, and nutrition logging built with React Native.',
      link: '#'
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Platform',
      description: 'A clean modern shopping platform with advanced filters, cart management, secured transactions, and user support.',
      link: '#'
    }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-20 px-4 md:px-12" aria-labelledby="portfolio-heading">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 id="portfolio-heading" className="text-2xl md:text-3xl font-bold mb-3">Portfolio Highlights</h2>
            <p className="text-gray-600">Selected projects showcasing my expertise and problem-solving approach.</p>
          </div>
          <div className="hidden md:block">
            <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800" aria-label="View all portfolio projects">
              See All Projects <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          ))}
        </div>
        
        <div className="mt-8 md:hidden">
          <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800" aria-label="View all portfolio projects">
            See All Projects <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
