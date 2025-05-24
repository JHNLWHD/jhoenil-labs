import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Twitter, Github } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error(response);
        toast({
          title: 'Submission Failed',
          description: 'There was an issue submitting your message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Submission Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 px-4 md:px-12" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Have a project in mind or want to explore opportunities for collaboration? Feel free to reach out.
              I'm always open to discussing new projects and ideas.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-600 mr-3" aria-hidden="true" />
                <a href="mailto:aljhoenilw@gmail.com" className="text-gray-700 hover:text-blue-600">
                  aljhoenilw@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-600 mr-3" aria-hidden="true" />
                <span className="text-gray-700">Philippines</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900" aria-label="GitHub Profile">
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900" aria-label="Twitter Profile">
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label htmlFor="name" className="sr-only">Your name</label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Your email address</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Your message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-32"
                />
              </div>
              <Button type="submit" className="bg-gray-900 hover:bg-gray-800 w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
