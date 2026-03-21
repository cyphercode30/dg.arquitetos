import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfólio', href: '#projects' },
    { name: 'Método', href: '#process' },
    { name: 'Serviços', href: '#services' },
  ];

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: hidden && !mobileMenuOpen ? '-100%' : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Navegação principal"
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? 'bg-soft-alabaster/90 backdrop-blur-md py-4 border-b border-black/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-20 flex justify-between items-center">
        {/* Logo — accessible button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer bg-transparent border-none p-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo da página"
        >
          <img src="/images/DG-logo.svg" alt="DG Arquitetos" className="h-8 md:h-10 w-auto" />
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-deep-grey/60 hover:text-gold-accent transition-colors font-montserrat text-[10px] uppercase tracking-[0.4em] font-medium"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle — accessible */}
        <div className="md:hidden">
           <button 
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             className="text-deep-grey focus:outline-none p-2"
             aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
             aria-expanded={mobileMenuOpen}
             aria-controls="mobile-menu"
           >
              <div className="space-y-1.5" aria-hidden="true">
                 <div className={`w-8 h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                 <div className={`w-6 h-0.5 bg-current ml-auto transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                 <div className={`w-8 h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-soft-alabaster flex flex-col items-center justify-center space-y-10 z-[-1]"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
                className="text-deep-grey text-3xl font-playfair hover:text-gold-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
