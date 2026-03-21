import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    id: 1,
    name: 'Delton Gonga',
    role: 'Arquiteto Principal & Fundador',
    bio: 'Visionário com mais de 15 anos de experiência em projetos de alto padrão.',
  },
  {
    id: 2,
    name: 'Sarah Mendes',
    role: 'Diretora de Design de Interiores',
    bio: 'Especialista em fusão de texturas orgânicas com luxo contemporâneo.',
  },
  {
    id: 3,
    name: 'Hugo Santos',
    role: 'Engenheiro Chefe de Inovação',
    bio: 'Pioneiro em soluções estruturais sustentáveis para climas tropicais.',
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="bg-soft-alabaster py-24 px-8 md:px-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4 text-center">
          <span className="text-gold-accent font-montserrat uppercase tracking-[0.5em] text-xs font-bold italic block">Mentes Visionárias</span>
          <h2 className="text-deep-grey font-playfair text-4xl md:text-6xl uppercase tracking-tighter">Nossa <span className="text-gold-accent italic">Equipe</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group space-y-8 flex flex-col items-center text-center"
            >
              <div className="aspect-[4/5] w-full bg-white border border-black/5 relative overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)]">
                {/* Image Overlay/Placeholder */}
                <div className="absolute inset-0 bg-deep-grey transition-opacity duration-700 opacity-0 group-hover:opacity-10" />
                
                {/* Content Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105">
                   <span className="text-gold-accent/10 text-[18rem] font-playfair select-none">{member.name[0]}</span>
                </div>

                {/* Aesthetic border accent */}
                <div className="absolute inset-0 border-[0.5px] border-gold-accent/0 group-hover:border-gold-accent/20 transition-all duration-700 m-4" />
                
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
              
              <div className="space-y-3 px-4">
                <p className="text-gold-accent font-montserrat text-[10px] uppercase tracking-[0.4em] font-bold">
                  {member.role}
                </p>
                <h3 className="text-deep-grey font-playfair text-3xl group-hover:text-gold-accent transition-colors duration-500">
                  {member.name}
                </h3>
                <div className="w-12 h-[1px] bg-gold-accent/30 mx-auto group-hover:w-24 transition-all duration-700" />
                <p className="text-charcoal/60 font-montserrat text-sm leading-relaxed max-w-xs mx-auto">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
