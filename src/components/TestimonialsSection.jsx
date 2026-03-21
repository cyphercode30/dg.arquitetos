import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'António Silva',
    position: 'CEO, Angola Investments Group',
    quote: 'Trabalhar com a DG Arquitetos foi transformar uma ideia abstrata num marco arquitetônico. A atenção ao detalhe noturno e a integração com a paisagem são inigualáveis.',
  },
  {
    id: 2,
    name: 'Maria Clara',
    position: 'Filantropa e Empreendedora',
    quote: 'Nossa residência no Mussulo não é apenas uma casa, é uma obra de arte. Delton Gonga capturou a alma da nossa família em cada estrutura.',
  },
  {
    id: 3,
    name: 'João Manuel',
    position: 'Diretor, Skyline Properties',
    quote: 'Eficiência, luxo e visão. Eles não apenas entregam projetos; eles entregam o futuro da arquitetura angolana.',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-soft-alabaster py-24 px-8 md:px-20 relative overflow-hidden">
      {/* Decorative background text with floating animation */}
      <motion.div 
        animate={{ x: [-20, 20] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.04] pointer-events-none select-none overflow-hidden"
      >
         <span className="text-[18rem] font-playfair font-black text-deep-grey whitespace-nowrap tracking-tighter">
            EXCELÊNCIA • VISIONÁRIO • LUXO • DESIGN
         </span>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-gold-accent font-montserrat uppercase tracking-[0.5em] text-xs font-bold block">Vozes de Prestígio</span>
          <h2 className="text-deep-grey font-playfair text-4xl md:text-5xl uppercase">O que dizem os nossos <span className="text-gold-accent italic">Parceiros</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col space-y-8 bg-white/60 backdrop-blur-sm p-12 border border-black/[0.03] shadow-lg hover:shadow-2xl transition-all duration-500 items-center text-center relative group"
            >
              <div className="text-gold-accent text-7xl font-playfair leading-none h-10 select-none opacity-20 group-hover:opacity-100 transition-opacity duration-500">“</div>
              <p className="text-charcoal/80 font-playfair text-xl leading-relaxed italic max-w-sm">
                {t.quote}
              </p>
              <div className="pt-8 border-t border-gold-accent/20 w-full">
                <h3 className="text-deep-grey font-montserrat font-bold text-sm tracking-[0.2em] uppercase">{t.name}</h3>
                <p className="text-gold-accent/60 font-montserrat text-[10px] uppercase tracking-[0.3em] mt-2 font-bold italic">{t.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
