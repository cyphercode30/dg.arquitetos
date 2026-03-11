import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const DG_FRAME_COUNT = 9;
const dgFramePath = (index) =>
  `/images/DG-Scroll-Animation/ezgif-frame-${index.toString().padStart(3, '0')}.png`;

const AboutSection = () => {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const imagesRef    = useRef([]);
  const [loaded, setLoaded]             = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  /* ─── Draw frame directly to canvas — zero React re-renders ─── */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[Math.max(0, Math.min(index, DG_FRAME_COUNT - 1))];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // object-cover fit anchored to top (prevents cutting off the head)
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = width / height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    
    if (ir > cr) { 
      sw = img.naturalHeight * cr; 
      sx = (img.naturalWidth - sw) / 2; // Center horizontally
    } else { 
      sh = img.naturalWidth / cr; 
      sy = 0; // Anchor to TOP vertically instead of center
    }

    ctx.clearRect(0, 0, width, height);
    ctx.filter = 'contrast(1.05) brightness(1.02) saturate(1.05)';
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
    ctx.filter = 'none';
  }, []);

  /* ─── Preload all 10 frames ─── */
  useEffect(() => {
    let count  = 0;
    const imgs = [];
    for (let i = 0; i < DG_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = dgFramePath(i + 1);
      img.onload = img.onerror = () => {
        count++;
        setLoadProgress(Math.round((count / DG_FRAME_COUNT) * 100));
        if (count === DG_FRAME_COUNT) {
          imagesRef.current = imgs;
          setLoaded(true);
          drawFrame(0);
        }
      };
      imgs.push(img);
    }
  }, []);

  /* ─── Keep canvas sized to container ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (loaded) drawFrame(Math.floor(frameIndex.get() * (DG_FRAME_COUNT - 1)));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  /* ─── Scroll tracking on the tall section — same as HeroSection ─── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Raw frame scrub — direct, no spring lag (same as hero)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, DG_FRAME_COUNT - 1]);
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (loaded) drawFrame(Math.floor(latest));
  });

  // Spring only for subtle scale parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const imageScale     = useTransform(smoothProgress, [0, 1], [1, 1.12]);

  const [isBioExpanded, setIsBioExpanded] = useState(false);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative h-[400vh] bg-soft-alabaster overflow-visible"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-charcoal lg:bg-soft-alabaster">
        <div className="max-w-7xl mx-auto px-8 md:px-20 w-full h-full lg:h-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative">

          {/* ── Left: DG Scroll Animation canvas ── */}
          <motion.div 
            style={{ scale: imageScale }} 
            className="absolute inset-0 lg:relative w-full h-full lg:aspect-[4/5] overflow-hidden bg-deep-grey/5 z-0 lg:z-10"
          >

            {/* Loading state */}
            {!loaded && (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-gold-accent font-montserrat text-[10px] tracking-[0.8em] uppercase"
                >
                  Carregando...
                </motion.div>
                <div className="w-32 h-[1px] bg-gold-accent/20 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gold-accent origin-left"
                    style={{ scaleX: loadProgress / 100 }}
                  />
                </div>
              </div>
            )}

            {/* Canvas — same rendering pattern as hero */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ display: loaded ? 'block' : 'none' }}
            />

            {/* Cinematic noise overlay — same as hero */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay z-10 overflow-hidden">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-[2]">
                <filter id="noiseFilterAbout">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterAbout)" />
              </svg>
            </div>

            {/* Dark overlay for mobile readability - darker now */}
            <div className="absolute inset-0 bg-charcoal/90 lg:hidden z-20 pointer-events-none" />

            {/* Quote card — pinned bottom-right (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-white border border-black/5 shadow-2xl p-4 hidden lg:block z-30"
            >
              <div className="w-full h-full border border-gold-accent/20 flex items-center justify-center p-8">
                <p className="text-gold-accent font-playfair text-xl italic text-center">
                  "A simplicidade é o último grau da sofisticação."
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Text content ── */}
          <div className="relative z-30 flex flex-col justify-center h-full lg:h-[70vh] w-full pt-20 lg:pt-0 items-center lg:items-start text-center lg:text-left">
            
            {/* Header stays pinned */}
            <div className="space-y-4 mb-12 flex flex-col items-center lg:items-start">
              <motion.h3
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-gold-accent font-montserrat uppercase tracking-[0.5em] text-xs font-bold"
              >
                O Fundador
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-white lg:text-deep-grey font-playfair text-5xl md:text-7xl leading-tight"
              >
                Delton <span className="text-gold-accent italic">Gonga</span>
              </motion.h2>
            </div>

            {/* Crossfading Biography Container */}
            <div className="relative flex-1 w-full max-w-xl">
              
              {/* Part 1 */}
              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0, 0.25, 0.4], [1, 1, 0]),
                  y: useTransform(smoothProgress, [0.25, 0.4], [0, -20]),
                  pointerEvents: useTransform(smoothProgress, v => v < 0.3 ? 'auto' : 'none')
                }}
                className="absolute inset-0 space-y-6 text-white/90 lg:text-charcoal/80 font-montserrat text-lg font-light leading-relaxed flex flex-col items-center lg:items-start"
              >
                <p>
                  Com uma visão que transcende o convencional, Delton Gonga estabeleceu a DG Arquitetos como um farol de inovação em Angola. Sua abordagem funde o rigor da engenharia moderna com a alma orgânica da paisagem africana.
                </p>
                <p className="border-t lg:border-t-0 border-l-0 lg:border-l-2 border-gold-accent/50 lg:border-gold-accent pt-6 lg:pt-4 lg:pl-8 italic text-white lg:text-deep-grey text-xl pb-4">
                  "Cada projeto é uma oportunidade de redefinir o que o luxo significa. Não se trata de excesso, mas do equilíbrio perfeito entre forma, função e emoção."
                </p>
              </motion.div>

              {/* Part 2 */}
              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0.35, 0.5, 0.7], [0, 1, 0]),
                  y: useTransform(smoothProgress, [0.35, 0.5, 0.7], [20, 0, -20]),
                  pointerEvents: useTransform(smoothProgress, v => v >= 0.3 && v < 0.6 ? 'auto' : 'none')
                }}
                className="absolute inset-0 text-white/80 lg:text-charcoal/70 font-montserrat text-lg md:text-xl font-light leading-relaxed border-t border-white/10 lg:border-charcoal/5 pt-8"
              >
                <p>
                  Formado nas melhores academias internacionais, Delton regressou a Angola com um propósito claro: elevar o padrão da arquitetura nacional para um nível competitivo globalmente. A sua assinatura reside na criação de espaços que dialogam intimamente com o meio envolvente.
                </p>
              </motion.div>

              {/* Part 3 */}
              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0.65, 0.8, 1], [0, 1, 1]),
                  y: useTransform(smoothProgress, [0.65, 0.8], [20, 0]),
                  pointerEvents: useTransform(smoothProgress, v => v >= 0.6 ? 'auto' : 'none')
                }}
                className="absolute inset-0 text-white/80 lg:text-charcoal/70 font-montserrat text-lg md:text-xl font-light leading-relaxed pt-8"
              >
                <p>
                  Ao longo da última década, liderou projetos de referência, desde residências de alto luxo a complexos comerciais vanguardistas. A sua filosofia dita que o luxo verdadeiro é sustentável, duradouro e perfeitamente sintonizado com quem o habita.
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
