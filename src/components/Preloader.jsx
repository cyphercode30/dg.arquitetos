import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate global loading sync (or tie it to real asset loading if preferred)
    // For a premium feel, we simulate a smooth 0-100% load over 2.5 seconds.
    const duration = 2500;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(finishLoading, 400); // Small pause at 100% before fading out
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-10vh', filter: 'blur(10px)' }}
      transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center space-y-16">
        {/* Brand Group */}
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img 
               animate={{ scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               src="/images/DG-logo.svg" 
               alt="DG" 
               className="h-16 md:h-20 w-auto filter invert brightness-0" 
            />
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, y: 10, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.6em' }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="text-white/60 font-montserrat text-[10px] uppercase font-light pl-[0.6em]"
          >
            Arquitetos
          </motion.span>
        </div>

        {/* Progress System */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2, duration: 1 }}
           className="flex flex-col items-center space-y-4 w-56 md:w-72"
        >
           <div className="flex justify-between w-full text-gold-accent font-montserrat tracking-[0.4em] text-[8px] uppercase font-medium">
              <span className="opacity-80">Sincronizando</span>
              <span>{Math.round(progress)}%</span>
           </div>
           
           <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-accent/40 to-gold-accent origin-left"
               style={{ width: `${progress}%` }}
               layout
             />
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
