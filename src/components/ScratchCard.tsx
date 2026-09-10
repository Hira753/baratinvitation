import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, Variants } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, WandSparkles, Check } from 'lucide-react';

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: custom * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [, setScratchedPercent] = useState(0);

  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.offsetWidth || 340;
    const h = canvas.offsetHeight || 190;
    canvas.width = w;
    canvas.height = h;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#E5C158');
    grad.addColorStop(0.3, '#FDF3C7');
    grad.addColorStop(0.6, '#D4AF37');
    grad.addColorStop(1, '#996515');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Diagonal gold shimmer lines
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let k = -w; k < w * 2; k += 20) {
      ctx.beginPath();
      ctx.moveTo(k, 0);
      ctx.lineTo(k + 40, h);
      ctx.lineTo(k + 50, h);
      ctx.lineTo(k + 10, 0);
      ctx.closePath();
      ctx.fill();
    }

    // Border line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Text on foil
    ctx.fillStyle = '#66460B';
    ctx.font = 'bold 13px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✧ SCRATCH TO REVEAL ✧', w / 2, h / 2 - 8);

    ctx.fillStyle = '#805A12';
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Rub with your finger or mouse', w / 2, h / 2 + 14);
  }, []);

  useEffect(() => {
    drawFoil();
    const handleResize = () => {
      if (!isRevealed) drawFoil();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFoil, isRevealed]);

  const revealInstantly = () => {
    setIsRevealed(true);
    setScratchedPercent(100);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFE082', '#0E2E22'],
      });
    } catch (err) {
      console.warn('Confetti error', err);
    }
  };

  const calculateScratchPercent = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
  ) => {
    try {
      const imgData = ctx.getImageData(0, 0, w, h).data;
      let clearCount = 0;
      const totalSampleCount = imgData.length / 4;
      for (let i = 3; i < imgData.length; i += 16) {
        if (imgData[i] === 0) {
          clearCount += 4;
        }
      }
      const pct = Math.round((clearCount / totalSampleCount) * 100);
      setScratchedPercent(pct);
      if (pct > 40 && !isRevealed) {
        revealInstantly();
      }
    } catch (err) {
      console.warn('Scratch calculation error', err);
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    calculateScratchPercent(ctx, canvas.width, canvas.height);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      scratchAt(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing && e.touches[0]) {
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  return (
    <section className="relative w-full max-w-xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-[#FFFFFF] border border-[#D4AF37]/40 shadow-[0_12px_35px_rgba(140,110,70,0.08)] p-6 sm:p-8 text-center overflow-hidden"
      >
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="relative z-10 flex flex-col items-center mb-5"
        >
          <span className="text-[10px] sm:text-xs font-display-luxury tracking-[0.25em] text-[#8C6D37] uppercase font-semibold mb-1">
            A SPECIAL SURPRISE
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#2B231D] font-medium tracking-wide flex items-center gap-2">
            <span>Scratch & Reveal Date</span>
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
          </h3>
        </motion.div>

        {/* Scratch Area */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          ref={containerRef}
          className="relative mx-auto w-full max-w-[380px] h-[210px] rounded-2xl p-1 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#B8860B] shadow-lg overflow-hidden select-none"
        >
          {/* Revealed Base Card */}
          <div className="w-full h-full rounded-[14px] bg-[#FAF6F0] p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-2 rounded-xl border border-dashed border-[#D4AF37]/40 pointer-events-none" />
            <p className="text-[11px] font-display-luxury tracking-[0.25em] text-[#8C6D37] uppercase font-semibold">
              SAVE THE DATE
            </p>
            <h4 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#2B231D] my-1 tracking-wide">
              Sunday
            </h4>
            <p className="text-sm font-sans font-semibold text-[#B8860B] tracking-wider mb-1.5">
              October 25, 2026 • 1:00 PM
            </p>
            <p className="font-script-luxury text-xl text-[#6B5A46] leading-none mb-2">
              We cannot wait to celebrate with you
            </p>
            <span className="text-[10px] font-display-luxury tracking-widest text-[#8C6D37] uppercase">
              #MILHANANDHUSSNAIN
            </span>
          </div>

          {/* Scratchable Canvas */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 w-full h-full cursor-crosshair rounded-[14px] touch-none transition-opacity duration-500"
            />
          )}

          {isRevealed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#8C6D37] text-[#FFFFFF] text-[10px] font-sans font-semibold border border-[#D4AF37]/60 flex items-center gap-1 shadow-md"
            >
              <Check className="w-3 h-3" />
              <span>Revealed!</span>
            </motion.div>
          )}
        </motion.div>

        {/* Action Controls */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="relative z-10 mt-5 flex flex-col items-center gap-2"
        >
          <p className="text-xs text-[#6B5A46] font-serif tracking-wider">
            {isRevealed
              ? '✨ Date unlocked! Save the date for Milhan & Hussnain.'
              : 'Rub the foil with your finger or cursor to reveal the date'}
          </p>
          {!isRevealed && (
            <button
              onClick={revealInstantly}
              id="scratch-auto-reveal-btn"
              className="mt-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF5EE] hover:bg-[#F3ECE0] text-[#8C6D37] text-[11px] font-sans font-medium tracking-wide border border-[#D4AF37]/50 shadow-sm transition-all cursor-pointer"
            >
              <WandSparkles className="w-3 h-3 text-[#B8860B]" />
              <span>Reveal Instantly</span>
            </button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};
