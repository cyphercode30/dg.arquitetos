import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: '01',
    title: 'Arquitetura Residencial',
    heroTitle: 'Onde o Refúgio se torna Arte',
    desc: 'Criação de refúgios particulares que equilibram luxo absoluto e conforto orgânico.',
    expandedDesc: 'A nossa abordagem à arquitetura residencial é puramente centrada em si. Desenhamos espaços que vivem e respiram consigo, onde cada detalhe, da entrada de luz ao fluxo dos espaços, é pensado para elevar o seu bem-estar diário a um nível de luxo incomparável.',
  },
  {
    id: '02',
    title: 'Design de Interiores',
    heroTitle: 'O Toque Invisível do Luxo',
    desc: 'Curadoria de texturas, luz e mobiliário para criar experiências sensoriais únicas.',
    expandedDesc: 'A curadoria minuciosa define os nossos interiores. Selecionamos materiais nobres, desenhamos iluminação cénica e integramos mobiliário exclusivo para transformar edifícios vazios em santuários de requinte e gosto imaculado.',
  },
  {
    id: '03',
    title: 'Consultoria de Investimento',
    heroTitle: 'A Estratégia do Valor',
    desc: 'Análise técnica e estratégica para projetos imobiliários de alto rendimento.',
    expandedDesc: 'Uma arquitetura brilhante tem de ser sustentável financeiramente. Os nossos analistas avaliam a rentabilidade, estudam a viabilidade espacial e desenham projetos que servem de alavanca poderosa para maximizar o seu retorno de investimento.',
  },
  {
    id: '04',
    title: 'Urbanismo Sustentável',
    heroTitle: 'O Legado do Amanhã',
    desc: 'Planeamento de espaços que promovem a harmonia entre o homem e o ambiente.',
    expandedDesc: 'Acreditamos numa integração vitalícia. Planeamos não apenas para a escala urbana, mas para o ecossistema, criando comunidades duradouras que respeitam o meio ambiente enquanto ditam o padrão alto do urbanismo do futuro.',
  },
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  // Auto-play the services every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="services" className="bg-soft-alabaster py-24 px-8 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Dynamic Content */}
          <div className="space-y-12 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h3 className="text-gold-accent font-montserrat uppercase tracking-[0.5em] text-xs font-bold">Expertise</h3>
                  <h2 className="text-deep-grey font-playfair text-5xl md:text-7xl leading-none">
                    {activeService.heroTitle.split(' ').map((word, i, arr) => {
                      if (i === arr.length - 1 || i === arr.length - 2) {
                        return <span key={i} className="text-gold-accent italic">{word} </span>
                      }
                      return word + ' ';
                    })}
                  </h2>
                </div>
                <p className="text-charcoal/70 font-montserrat text-lg font-light leading-relaxed max-w-md">
                  {activeService.expandedDesc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Service List */}
          <div className="grid grid-cols-1 gap-1">
            {services.map((service, index) => {
              const isActive = activeService.id === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onClick={() => setActiveIndex(index)}
                  className={`group p-8 border-b border-black/5 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:z-10 ${
                    isActive ? 'bg-white border-gold-accent/30' : 'hover:bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-8">
                    <span className={`font-playfair text-3xl transition-colors duration-500 ${
                      isActive ? 'text-gold-accent' : 'text-gold-accent/30 group-hover:text-gold-accent/70'
                    }`}>
                      {service.id}
                    </span>
                    <div className="space-y-3">
                      <h3 className={`font-playfair text-2xl transition-transform duration-500 italic ${
                        isActive ? 'text-gold-accent translate-x-2' : 'text-deep-grey group-hover:translate-x-2'
                      }`}>
                        {service.title}
                      </h3>
                      <p className={`font-montserrat text-sm leading-relaxed max-w-sm transition-colors duration-500 ${
                        isActive ? 'text-charcoal/80' : 'text-charcoal/60'
                      }`}>
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
