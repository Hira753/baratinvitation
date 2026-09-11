import React from 'react';
import { motion, Variants } from 'motion/react';
import { useAestheticFont } from '../context/FontContext';

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: custom * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const FooterSection: React.FC = () => {
  const { currentFont } = useAestheticFont();

  return (
    <footer className="relative w-full max-w-xl mx-auto px-4 pt-8 pb-16 text-center text-[#2B231D]">
      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariant}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </motion.div>

      {/* Monogram Seal */}
      <motion.div
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariant}
        className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#FFE082] to-[#8C6D37] p-[2px] shadow-md flex items-center justify-center mb-3"
      >
        <div className="w-full h-full rounded-full bg-[#FAF5EE] flex flex-col items-center justify-center border border-[#D4AF37]/50">
          <span className="font-display-luxury text-sm font-bold text-[#8C6D37] tracking-tighter">
            M & H
          </span>
          <span className="text-[8px] text-[#B8860B] tracking-widest font-sans font-semibold">
            2026
          </span>
        </div>
      </motion.div>

      <motion.h4
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariant}
        className={`text-4xl sm:text-5xl ${currentFont.fontClass} font-normal text-[#2B231D] tracking-normal mb-1 transition-all duration-300`}
      >
        Milhan{' '}
        <span className={`${currentFont.fontClass} text-3xl sm:text-4xl text-[#B8860B] transition-all duration-300`}>&</span>{' '}
        Hussnain
      </motion.h4>

      <motion.p
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariant}
        className="text-xs sm:text-sm font-serif italic text-[#6B5A46] mb-3"
      >
        Thank you for being a cherished part of our celebrations
      </motion.p>

      <motion.p
        custom={5}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariant}
        className="font-arabic text-2xl text-[#B8860B] font-bold tracking-widest mb-3"
      >
        آمِين
      </motion.p>

      <motion.div
        custom={6}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariant}
        className="w-full max-w-xs mx-auto my-4 opacity-40"
      >
        <svg viewBox="0 0 300 60" className="w-full h-10 fill-current text-[#C5A059]">
          <path d="M 0,60 L 300,60 L 300,45 L 270,45 L 270,15 L 265,10 L 260,15 L 260,45 L 200,45 Q 200,20 150,10 Q 100,20 100,45 L 40,45 L 40,15 L 35,10 L 30,15 L 30,45 L 0,45 Z" />
        </svg>
      </motion.div>

      <motion.p
        custom={7}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariant}
        className="text-[10px] sm:text-[11px] font-display-luxury tracking-[0.25em] text-[#8C6D37] uppercase font-semibold"
      >
        OCTOBER 25, 2026 • FAISALABAD, PAKISTAN
      </motion.p>
    </footer>
  );
};
