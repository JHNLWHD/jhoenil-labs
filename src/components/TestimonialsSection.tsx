
import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  avatarIndex: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, position, avatarIndex }) => {
  return (
    <div className="testimonial-card">
      <div className="mb-6">
        <img 
          src={`https://randomuser.me/api/portraits/men/${avatarIndex}.jpg`} 
          alt={`${author} portrait`}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
          width="48"
          height="48"
        />
      </div>
      <p className="text-gray-700 mb-6 text-sm md:text-base italic">"{quote}"</p>
      <p className="font-semibold text-sm">{author}</p>
      <p className="text-gray-500 text-xs">{position}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Jhoenil delivered a sophisticated web platform that exceeded our expectations. His technical expertise and problem-solving skills were invaluable.",
      author: "Michael R.",
      position: "CTO, Fintech Startup",
      avatarIndex: 32
    },
    {
      quote: "Working with Jhoenil was a game-changer for our healthcare app. He brought innovative ideas and flawless execution to the project.",
      author: "Sarah L.",
      position: "Product Manager, Health-Tech",
      avatarIndex: 45
    },
    {
      quote: "Jhoenil's technical leadership transformed our development process. Our team is now more efficient and our product much more stable.",
      author: "David K.",
      position: "Engineering Director, E-commerce",
      avatarIndex: 67
    }
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-20 px-4 md:px-12" aria-labelledby="testimonials-heading">
      <div className="container mx-auto max-w-7xl">
        <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-bold mb-12 text-center">What Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              avatarIndex={testimonial.avatarIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
