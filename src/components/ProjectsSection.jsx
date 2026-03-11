import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Villa Talatona',
    category: 'Residencial',
    image: '/images/portifolio/1.png',
    size: '1,200 m²',
  },
  {
    id: 2,
    title: 'Edifício Horizon',
    category: 'Corporativo',
    image: '/images/portifolio/2.png',
    size: '5,000 m²',
  },
  {
    id: 3,
    title: 'Mussulo Retreat',
    category: 'Lazer',
    image: '/images/portifolio/3.png',
    size: '800 m²',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-soft-alabaster py-24 px-8 md:px-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h3 className="text-gold-accent font-montserrat uppercase tracking-[0.5em] text-xs font-bold">Portfólio</h3>
            <h2 className="text-deep-grey font-playfair text-5xl md:text-7xl italic">Projectos <span className="text-gold-accent not-italic">Icónicos</span></h2>
          </div>
          <p className="text-charcoal/60 font-montserrat max-w-xs text-sm uppercase tracking-widest leading-loose">
            Uma curadoria de estruturas que desafiam o tempo e a gravidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="aspect-[3/4] overflow-hidden bg-deep-grey/5 relative shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-8 space-y-2">
                <span className="text-gold-accent font-montserrat text-[10px] uppercase tracking-widest font-bold">{project.category}</span>
                <div className="flex justify-between items-center">
                  <h3 className="text-deep-grey font-playfair text-2xl group-hover:text-gold-accent transition-colors duration-300">{project.title}</h3>
                  <span className="text-charcoal/40 font-montserrat text-[10px] tracking-widest">{project.size}</span>
                </div>
              </div>
              
              {/* Decorative line reveal */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-accent group-hover:w-full transition-all duration-700 delay-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
