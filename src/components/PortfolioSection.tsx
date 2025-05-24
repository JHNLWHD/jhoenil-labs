import React from 'react';
import { ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioItem = ({ icon: Icon, title, description, link }: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  link: string 
}) => {
  return (
    <div className="portfolio-card flex flex-col justify-between h-full">
      <div className="flex-grow">
        <div className="portfolio-icon text-blue-600 mb-6" aria-hidden="true">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>
      </div>
      <Link
        to={link}
        target="_blank"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-auto"
        aria-label={`View ${title} project`}
      >
        View Project <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  );
};

const PortfolioSection = () => {
  const portfolioItems = [
    {
      icon: Laptop,
      title: 'Kodigo Eleksyon 2025',
      description: 'An intuitive tool designed to help Filipinos prepare for the national elections. Users can create personalized voting guides and share them with others. During the election period, the platform attracted over 3.57K unique visitors and generated 15.1K page views, showcasing its impact in empowering informed voting decisions.',
      link: 'https://kodigoeleksyon2025.netlify.app/'
    },
    {
      icon: Laptop,
      title: 'Pilipinas Rotaract MDIO Website',
      description: 'The official website for Pilipinas Rotaract MDIO, highlighting their mission, initiatives, and organizational achievements.',
      link: 'https://mdio-pilipinas.netlify.app/'
    },
    {
      icon: Laptop,
      title: 'Rotaract Club of Zamboanga City West Website',
      description: 'A dedicated platform for the Rotaract Club of Zamboanga City West to showcase their projects, events, and community impact.',
      link: 'https://rotaract-zambo-city-west.netlify.app/'
    },
    {
      icon: Smartphone,
      title: 'Spayce',
      description: 'A feature-rich rent collection app offering reminders, bookkeeping, and tracking. Key features include automated notifications for tenants and landlords, ensuring seamless rental management.',
      link: 'https://play.google.com/store/apps/details?id=ph.spayce.owner&hl=fil'
    },
    {
      icon: Laptop,
      title: 'COVID19 ZC Website',
      description: 'A comprehensive tracker for COVID-19 statistics in Zamboanga City, providing real-time updates and historical data.',
      link: 'https://covid19-zc.netlify.app/'
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
      </div>
    </section>
  );
};

export default PortfolioSection;
