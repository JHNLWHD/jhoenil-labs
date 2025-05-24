import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Cloud, Briefcase, Brain } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: "Web & Mobile Development",
    description: "I create custom web applications, responsive websites, and cross-platform mobile apps using modern frameworks and best practices."
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud Solutions",
    description: "I specialize in cloud infrastructure setup, CI/CD pipelines, containerization, and deployment automation for seamless operations."
  },
  {
    icon: Briefcase,
    title: "Technical Leadership",
    description: "I provide team leadership, technical strategy, architecture design, and mentoring to ensure successful project delivery and team growth."
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description: "I integrate AI technologies to develop intelligent applications and automate complex processes."
  },
  {
    icon: Cloud,
    title: "Data Engineering",
    description: "I build dashboards, systems, and automations in Google Sheets to streamline workflows and enable data-driven decision-making."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-20 px-4 md:px-12 bg-gray-50" aria-labelledby="services-heading">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl font-bold mb-4">My Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I offer comprehensive solutions tailored to meet your specific technology needs and business goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 rounded-xl p-3 inline-flex items-center justify-center mb-4" aria-hidden="true">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="min-h-12 flex items-center justify-center">{service.title}</CardTitle>
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
