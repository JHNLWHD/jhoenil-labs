
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Laptop, Heart, ShoppingCart, Code, BarChart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const ProjectCard = ({ icon: Icon, title, description, image, technologies, link }: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  image?: string,
  technologies: string[],
  link: string 
}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div className="h-48 overflow-hidden bg-gray-100">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <Icon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <a 
          href={link}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 w-full"
          aria-label={`View ${title} project`}
        >
          View Project <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
        </a>
      </CardFooter>
    </Card>
  );
};

const Projects = () => {
  const projects = [
    {
      icon: Laptop,
      title: 'Fintech Dashboard',
      description: 'A responsive financial analytics dashboard with real-time data visualization. Built for a US-based fintech startup.',
      image: '/placeholder.svg',
      technologies: ['React', 'TypeScript', 'D3.js', 'Firebase'],
      link: '#'
    },
    {
      icon: Heart,
      title: 'Health Tracker App',
      description: 'Cross-platform mobile app for tracking daily health metrics, workout data, and nutrition logging built with React Native.',
      image: '/placeholder.svg',
      technologies: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Platform',
      description: 'A clean modern shopping platform with advanced filters, cart management, secured transactions, and user support.',
      image: '/placeholder.svg',
      technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
      link: '#'
    },
    {
      icon: Code,
      title: 'Developer Collaboration Tool',
      description: 'Real-time collaboration platform for remote development teams with code sharing, video calls, and project management.',
      image: '/placeholder.svg',
      technologies: ['Vue.js', 'WebRTC', 'Express', 'Socket.io'],
      link: '#'
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Data visualization platform for marketing teams that integrates with various data sources and provides actionable insights.',
      image: '/placeholder.svg',
      technologies: ['Angular', 'Chart.js', 'Python', 'AWS'],
      link: '#'
    },
    {
      icon: BookOpen,
      title: 'Educational Platform',
      description: 'Learning management system for online courses with interactive lessons, quizzes, and progress tracking.',
      image: '/placeholder.svg',
      technologies: ['React', 'GraphQL', 'Node.js', 'MongoDB'],
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-12 md:py-16 px-4 md:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Link>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">All Projects</h1>
                <p className="text-gray-600 mt-2 max-w-lg">
                  A comprehensive collection of my software development projects across various technologies and industries.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  icon={project.icon}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  link={project.link}
                />
              ))}
            </div>

            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
