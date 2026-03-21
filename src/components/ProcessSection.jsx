import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

// 40 frames in public/images/plant-animations/
const FRAME_COUNT = 40;
const framePath = (index) =>
  `/images/plant-animations/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;

// 4 process steps — each pinned to a scroll quarter
const STEPS = [
  {
    number: '01',
    title: 'Briefing & Visão',
    description:
      'Começamos por ouvir os seus sonhos. Uma conversa profunda onde captamos a essência do que deseja — estilo de vida, estética e necessidades funcionais.',
    range: [0.0, 0.25],
  },
  {
    number: '02',
    title: 'Conceito & Design',
    description:
      'O nosso estúdio transforma a visão em esboços e maquetas digitais tridimensionais, garantindo que cada ângulo e proporção sirva o propósito.',
    range: [0.25, 0.5],
  },
  {
    number: '03',
    title: 'Aprovação & Licenciamento',
    description:
      'Tratamos de toda a burocracia técnica e legal — plantas, alvarás e aprovações camarárias — para que se foque apenas no resultado final.',
    range: [0.5, 0.75],
  },
  {
    number: '04',
    title: 'Construção & Entrega',
    description:
      'Acompanhamento contínuo em obra. Garantimos que cada detalhe é executado com a precisão e o padrão de excelência que define a DG Arquitetos.',
    range: [0.75, 1.0],
  },
];

// ─── Single step card — opacity/y driven by scroll progress ───
const StepCard = ({ step, smoothProgress }) => {
  const [start, end] = step.range;
  const fadeIn  = start + 0.02;
  const fadeOut = end   - 0.02;

  const opacity = useTransform(
    smoothProgress,
    [start, fadeIn, fadeOut, end],
    [0,     1,      1,       0]
  );
  const y = useTransform(smoothProgress, [start, fadeIn], [30, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center p-8 md:p-24 pointer-events-none"
    >
      <div className="max-w-2xl flex flex-col items-center text-center space-y-6">
        {/* step tag */}
        <div className="flex items-center justify-center space-x-4">
          <div className="h-[1px] w-10 bg-gold-accent/60 md:hidden" />
          <span className="font-montserrat text-gold-accent text-[10px] uppercase tracking-[0.6em]">
            Passo {step.number}
          </span>
          <div className="h-[1px] w-10 bg-gold-accent/60" />
        </div>

        {/* title */}
        <h3 className="font-playfair text-4xl md:text-6xl text-white leading-tight drop-shadow-md">
          {step.title}
        </h3>

        {/* description */}
        <p className="font-montserrat text-white/80 text-sm md:text-base leading-relaxed font-light max-w-lg drop-shadow-sm">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Progress dots ───
const ProgressDots = ({ smoothProgress }) => (
  <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-3">
    {STEPS.map((step, i) => {
      const center  = (step.range[0] + step.range[1]) / 2;
      const opacity = useTransform(
        smoothProgress,
        [step.range[0], center, step.range[1]],
        [0.3, 1, 0.3]
      );
      const scaleVal = useTransform(
        smoothProgress,
        [step.range[0], center, step.range[1]],
        [0.6, 1.3, 0.6]
      );
      return (
        <motion.div
          key={step.number}
          style={{ opacity, scale: scaleVal }}
          className="w-1.5 h-1.5 rounded-full bg-gold-accent"
        />
      );
    })}
  </div>
);

// ─── Section header — fades out on first scroll ───
const SectionHeader = ({ smoothProgress }) => {
  const opacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const y       = useTransform(smoothProgress, [0, 0.12], [0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-24 left-1/2 -translate-x-1/2 w-full px-8 md:left-24 md:translate-x-0 md:w-auto z-40 flex items-center justify-center md:justify-start space-x-4"
    >
      <div className="h-[1px] w-10 bg-gold-accent/60 hidden md:block" />
      <span className="font-montserrat text-gold-accent text-[10px] uppercase tracking-[0.6em] text-center">
        Como Fazemos os Projectos
      </span>
      <div className="h-[1px] w-10 bg-gold-accent/60 md:hidden" />
    </motion.div>
  );
};

// ─── Main component ───
const ProcessSection = () => {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const imagesRef    = useRef([]);
  const [loaded, setLoaded]             = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Draw a frame directly — no React state
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[Math.max(0, Math.min(index, FRAME_COUNT - 1))];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = width / height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (ir > cr) {
      sw = img.naturalHeight * cr;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / cr;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.filter = 'contrast(1.05) brightness(1.02) saturate(1.05)';
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
    ctx.filter = 'none';
  }, []);

  // Preload all frames
  useEffect(() => {
    let count  = 0;
    const images = [];

    const onProgress = () => {
      count++;
      setLoadProgress(Math.round((count / FRAME_COUNT) * 100));
      if (count === FRAME_COUNT) {
        imagesRef.current = images;
        setLoaded(true);
        drawFrame(0);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src     = framePath(i + 1);
      img.onload  = onProgress;
      img.onerror = onProgress;
      images.push(img);
    }
  }, []);

  // Keep canvas sized to container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (loaded) drawFrame(Math.round(frameIndex.get() * (FRAME_COUNT - 1)));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Raw frame scrub — no spring lag
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (loaded) drawFrame(Math.round(latest));
  });

  // Spring only for UI transitions
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Subtle zoom on canvas — same as hero
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={containerRef}
      id="processo"
      className="relative h-[500vh] bg-soft-alabaster overflow-visible"
    >
      {/* Sticky viewport — identical structure to HeroSection */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-soft-alabaster">

        {/* Canvas background */}
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
                  Preparando Processo...
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

            {/* The canvas — same as hero */}
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: loaded ? 'block' : 'none' }}
            />

            {/* Cinematic overlays — identical to hero */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay z-10 overflow-hidden">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-[2]">
                <filter id="noiseFilterProcess">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterProcess)" />
              </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-soft-alabaster/15 via-transparent to-white/10 z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-soft-alabaster/10 via-transparent to-soft-alabaster/20 z-20" />
          </motion.div>
        </div>

        {/* Black overlay 50% — cinematic veil over canvas */}
        <div className="absolute inset-0 bg-black/50 z-[25] pointer-events-none" />

        {/* Section label — fades on scroll */}
        <SectionHeader smoothProgress={smoothProgress} />

        {/* Step cards — one visible at a time */}
        <div className="absolute inset-0 z-30">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} smoothProgress={smoothProgress} />
          ))}
        </div>

        {/* Progress dots */}
        <ProgressDots smoothProgress={smoothProgress} />

        {/* Scroll indicator — same as hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 z-40"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-accent/50 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gold-accent"
            />
          </div>
          <span className="text-[9px] text-gold-accent/80 uppercase tracking-[0.5em] font-light">Deslize</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
