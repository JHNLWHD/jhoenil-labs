import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Github, Linkedin, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BookACall from '@/components/BookACall';
import { siteConfig } from '@/data/content';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          title: 'Message sent!',
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({
          title: 'Submission failed',
          description: 'There was an issue submitting your message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Submission error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/40" aria-labelledby="contact-heading">
      <div className="section-shell grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <span className="eyebrow">Let&apos;s talk</span>
          <h2 id="contact-heading" className="mt-4 text-3xl font-medium md:text-4xl">
            Have a project or an operation to modernize?
          </h2>
          <p className="mt-4 text-muted-foreground">
            The fastest way to start is a quick call — we&apos;ll figure out whether I&apos;m the
            right fit in 20 minutes. Prefer to write first? Use the form.
          </p>

          <div className="mt-8">
            <BookACall className="btn-primary" label="Book a call" />
          </div>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-foreground/80 transition-colors hover:text-[hsl(var(--brand))]"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <div className="flex items-center gap-3 text-foreground/80">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              {siteConfig.location}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground hover:text-[hsl(var(--brand))]"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            {siteConfig.githubUrl && (
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground hover:text-[hsl(var(--brand))]"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="edge-card p-7 hover:shadow-none">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Or send a message
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            name="contact"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label htmlFor="name" className="sr-only">
                Your name
              </label>
              <Input id="name" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Your email address
              </label>
              <Input id="email" type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Your message
              </label>
              <Textarea id="message" name="message" placeholder="What do you want to build?" value={formData.message} onChange={handleChange} required className="min-h-32" />
            </div>
            <Button type="submit" className="w-full rounded-full bg-foreground text-background hover:opacity-90">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
