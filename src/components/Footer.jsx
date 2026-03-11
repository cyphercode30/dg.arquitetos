import React from 'react';

const Footer = () => {
  const quickLinks = [
    { name: 'Portfólio', href: '#projects' },
    { name: 'Método', href: '#process' },
    { name: 'Serviços', href: '#services' },
    { name: 'Contacto', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-soft-alabaster py-20 px-8 md:px-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-12 border-b border-black/[0.03]">
          {/* Brand/Logo */}
          <div 
            className="cursor-pointer transition-transform duration-500 hover:scale-110" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <img src="/images/DG-logo.svg" alt="DG Arquitetos Logo" className="h-10 md:h-12 w-auto" />
          </div>

          {/* Quick Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {quickLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-charcoal/60 hover:text-gold-accent transition-colors text-[10px] uppercase tracking-[0.3em] font-bold"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Presence */}
          <div className="flex space-x-10">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href} 
                className="text-gold-accent/40 hover:text-gold-accent transition-all duration-500 text-[9px] uppercase tracking-[0.3em] font-bold pb-1 border-b border-transparent hover:border-gold-accent/40"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          <div className="text-charcoal/20 font-montserrat text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-light text-center md:text-left">
             © 2026 DG ARQUITETOS. TODOS OS DIREITOS RESERVADOS. PROJETADO PARA A EXCELÊNCIA.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
