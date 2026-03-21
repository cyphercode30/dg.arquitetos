import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

// Actual frames available in public/images/hero-animation/
const FRAME_COUNT = 31;
const framePath = (index) =>
  `/images/hero-animation/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all frames into an Image[] array — no state per frame
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    const onProgress = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
      if (loadedCount === FRAME_COUNT) {
        imagesRef.current = images;
        setLoaded(true);
        // Draw the first frame immediately
        drawFrame(0);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      img.onload = onProgress;
      img.onerror = onProgress;
      images.push(img);
    }
  }, []);

  // Draw a specific frame index (0-based) to the canvas — zero React re-renders
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Cover-fit the image (like object-cover)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    // Subtle cinematic color grading via globalCompositeOperation
    ctx.filter = 'contrast(1.05) brightness(1.02) saturate(1.05)';
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
    ctx.filter = 'none';
  }, []);

  // Resize canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (loaded) drawFrame(Math.round((frameIndex.get()) * (FRAME_COUNT - 1)));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  // Scroll tracking — raw, no spring on the scrubbing itself
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Raw frame index (0-based) — direct scroll-to-frame, no spring lag
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Draw directly on scroll — no state setter, no re-render
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (loaded) drawFrame(Math.round(latest));
  });

  // Parallax for content overlay only (spring is fine here)
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  // Sequence 1: Main content fades out early
  const contentOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const textScale      = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const contentY       = useTransform(smoothProgress, [0, 0.2], [0, -50]);
  const imageScale     = useTransform(smoothProgress, [0, 1], [1, 1.12]);

  // Sequence 2, 3, 4: Animated words
  const word1Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const word1Scale   = useTransform(smoothProgress, [0.25, 0.45], [0.8, 1.1]);
  const word1Y       = useTransform(smoothProgress, [0.25, 0.45], [50, -50]);

  const word2Opacity = useTransform(smoothProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const word2Scale   = useTransform(smoothProgress, [0.5, 0.7], [0.8, 1.1]);
  const word2Y       = useTransform(smoothProgress, [0.5, 0.7], [50, -50]);

  const word3Opacity = useTransform(smoothProgress, [0.75, 0.85, 0.95], [0, 1, 0]);
  const word3Scale   = useTransform(smoothProgress, [0.75, 0.95], [0.8, 1.1]);
  const word3Y       = useTransform(smoothProgress, [0.75, 0.95], [50, -50]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[500vh] bg-soft-alabaster overflow-visible"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-soft-alabaster">

        {/* Canvas Frame Scrub — no React re-renders during animation */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative">

            {/* Loading state */}
            {!loaded && (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-gold-accent font-montserrat text-[10px] tracking-[0.8em] uppercase"
                >
                  Sincronizando Visão HD...
                </motion.div>
                <div className="w-48 h-[1px] bg-gold-accent/20 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gold-accent origin-left"
                    style={{ scaleX: loadProgress / 100 }}
                  />
                </div>
                <span className="text-[10px] text-gold-accent/50 font-montserrat tracking-widest">
                  {loadProgress}%
                </span>
              </div>
            )}

            {/* Canvas — always mounted so it's ready when images load */}
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: loaded ? 'block' : 'none' }}
            />

            {/* 📽️ Cinematic overlays */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay z-10 overflow-hidden">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-[2]">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-soft-alabaster/20 via-transparent to-white/10 z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-soft-alabaster/10 via-transparent to-soft-alabaster/20 z-20" />
          </motion.div>
        </div>

        {/* Black overlay 50% — cinematic veil over canvas */}
        <div className="absolute inset-0 bg-black/50 z-[25] pointer-events-none" />

        {/* Content Overlay */}
        <motion.div
          style={{ opacity: contentOpacity, scale: textScale, y: contentY }}
          className="absolute inset-0 z-30 flex flex-col justify-center p-8 md:p-24 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-white text-center lg:text-left">

            <div className="lg:col-span-12 space-y-6 flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center space-x-4"
              >
                <div className="h-[1px] w-12 bg-gold-accent/50" />
                <span className="text-gold-accent font-montserrat text-xs uppercase tracking-[0.6em] font-medium drop-shadow-sm">
                  Arquitetura de Alto Padrão
                </span>
              </motion.div>

              <h1 className="font-playfair text-6xl md:text-[7rem] lg:text-[8.5rem] tracking-tighter leading-[0.85] select-none text-white drop-shadow-md">
                Arquitetura<span className="text-gold-accent">.</span><br />
                <span className="text-3xl md:text-5xl lg:text-7xl uppercase font-extralight tracking-[-0.05em] text-white/90">
                  De Excelência
                </span>
              </h1>
            </div>

            <div className="lg:col-span-12 mt-4 flex justify-center lg:justify-start pointer-events-auto">
              <p className="font-montserrat text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light max-w-3xl italic border-l-0 lg:border-l border-gold-accent/50 lg:pl-8 drop-shadow-sm">
                "Arquitetura não é apenas construir espaços, é esculpir o silêncio e a luz para abrigar a alma."
              </p>
            </div>

            <div className="lg:col-span-12 flex justify-center lg:justify-start items-center mt-12 pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#b48c3c', color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="group px-12 py-5 bg-transparent border border-gold-accent/60 text-gold-accent font-montserrat uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold relative overflow-hidden transition-all duration-500 rounded-px shadow-lg hover:shadow-xl hover:border-gold-accent"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Contacto</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* --- Scroll Animated Sequential Words --- */}
        <motion.div 
          style={{ opacity: word1Opacity, scale: word1Scale, y: word1Y }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
           <h2 className="font-playfair italic text-6xl md:text-8xl lg:text-[12rem] text-white/90 drop-shadow-2xl font-light tracking-tight">Essência</h2>
        </motion.div>

        <motion.div 
          style={{ opacity: word2Opacity, scale: word2Scale, y: word2Y }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
           <h2 className="font-playfair italic text-6xl md:text-8xl lg:text-[12rem] text-gold-accent drop-shadow-2xl font-light tracking-tight">Inovação</h2>
        </motion.div>

        <motion.div 
          style={{ opacity: word3Opacity, scale: word3Scale, y: word3Y }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
           <h2 className="font-playfair italic text-5xl md:text-7xl lg:text-[10rem] text-white/90 drop-shadow-2xl font-light tracking-tight">Exclusividade</h2>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 z-40 pointer-events-auto"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-accent/50 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gold-accent"
            />
          </div>
          <span className="text-[9px] text-white/80 uppercase tracking-[0.5em] font-light">Deslize</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
