
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Cloud, Briefcase, Brain } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: "Web & Mobile Development",
    description: "Custom web applications, responsive websites, and cross-platform mobile apps built with modern frameworks and best practices."
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description: "Cloud infrastructure setup, CI/CD pipeline implementation, containerization, and deployment automation for seamless operations."
  },
  {
    icon: Briefcase,
    title: "Technical Leadership",
    description: "Team leadership, technical strategy, architecture design, and mentoring to drive successful project delivery and team growth."
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Integration of AI technologies, machine learning solutions, and data analytics to create intelligent applications and automate processes."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-20 px-4 md:px-12 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I offer comprehensive solutions tailored to meet your specific technology needs and business goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 rounded-xl p-3 inline-flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
