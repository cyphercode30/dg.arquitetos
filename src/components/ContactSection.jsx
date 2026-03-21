import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    visao: ''
  });

  const handleWhatsAppSubmit = () => {
    const phoneNumber = "244926799159";
    const message = `Olá Equipa DG Arquitetos!\n\n*Nome:* ${formData.nome || 'Não preenchido'}\n*Empresa:* ${formData.empresa || 'Não preenchida'}\n\n*Minha Visão do Projeto:*\n${formData.visao || 'Sem visão partilhada.'}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="bg-white py-24 px-8 md:px-20 relative border-t border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-gold-accent font-montserrat uppercase tracking-[0.5em] text-xs font-bold">Contacto</span>
            <h2 className="text-deep-grey font-playfair text-5xl md:text-7xl leading-none">Vamos criar o seu <span className="text-gold-accent italic">Legado</span></h2>
          </div>

          <p className="text-charcoal/60 font-montserrat text-lg font-light leading-relaxed max-w-md">
            Conte-nos um pouco sobre a sua visão. A nossa equipa entrará em contacto diretamente consigo através do WhatsApp para iniciarmos esta jornada de exclusividade.
          </p>
        </div>

        {/* Right Side: Form with proper label associations */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           className="bg-soft-alabaster border border-black/5 p-10 md:p-16 space-y-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label htmlFor="contact-nome" className="text-charcoal/40 text-[9px] uppercase tracking-widest font-bold block">Nome</label>
                <input 
                  id="contact-nome"
                  type="text" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full bg-transparent border-b border-black/10 py-2 text-deep-grey focus:border-gold-accent outline-none transition-colors" 
                  autoComplete="name"
                />
             </div>
             <div className="space-y-2">
                <label htmlFor="contact-empresa" className="text-charcoal/40 text-[9px] uppercase tracking-widest font-bold block">Empresa</label>
                <input 
                  id="contact-empresa"
                  type="text" 
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  className="w-full bg-transparent border-b border-black/10 py-2 text-deep-grey focus:border-gold-accent outline-none transition-colors" 
                  autoComplete="organization"
                />
             </div>
          </div>

          <div className="space-y-2">
             <label htmlFor="contact-visao" className="text-charcoal/40 text-[9px] uppercase tracking-widest font-bold block">Sua Visão</label>
             <textarea 
               id="contact-visao"
               rows="4" 
               value={formData.visao}
               onChange={(e) => setFormData({...formData, visao: e.target.value})}
               className="w-full bg-transparent border-b border-black/10 py-2 text-deep-grey focus:border-gold-accent outline-none transition-colors" 
               placeholder="Conte-nos sobre o seu projeto..."
             />
          </div>

          <motion.button
            onClick={handleWhatsAppSubmit}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(26, 26, 26, 1)", color: "#fff" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-gold-accent text-white font-montserrat uppercase tracking-[0.3em] font-bold text-xs shadow-lg"
            aria-label="Enviar mensagem via WhatsApp"
          >
            Enviar Mensagem
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
