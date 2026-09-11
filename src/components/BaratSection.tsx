import React from 'react';
import { motion, Variants } from 'motion/react';
import { Sparkles, Clock } from 'lucide-react';
import { useAestheticFont } from '../context/FontContext';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: custom * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const BaratSection: React.FC = () => {
  const { currentFont } = useAestheticFont();

  return (
    <section className="relative w-full max-w-xl mx-auto px-4 py-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-[2.5rem] bg-[#FFFFFF] border-2 border-[#D4AF37]/50 shadow-[0_18px_50px_rgba(140,110,70,0.14)] p-6 sm:p-10 text-center overflow-hidden"
      >
        <div className="absolute inset-2 sm:inset-3 rounded-[2rem] border border-[#D4AF37]/35 pointer-events-none" />

        {/* Bismillah Header */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="relative z-10 flex flex-col items-center mb-3 mt-2"
        >
          <p className="font-arabic text-2xl sm:text-3xl text-[#2B231D] tracking-widest leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <span className="text-[10px] sm:text-xs text-[#8C6D37] tracking-[0.25em] font-display-luxury uppercase mt-1 font-semibold">
            TOGETHER WITH THEIR FAMILIES
          </span>
          <div className="flex items-center gap-2 mt-1.5 text-[#B8860B]">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#B8860B]" />
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
        </motion.div>

        {/* Host Parents */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="relative z-10 my-2"
        >
          <h2 className="text-base sm:text-lg font-serif-luxury font-bold text-[#8C6D37] tracking-wider uppercase">
            MR & MRS. QAISER SIDDIQUE
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-[#5A4A3E] max-w-md mx-auto mt-1.5 leading-relaxed">
            Request the honour of your gracious presence at the Barat Ceremony of their beloved daughter
          </p>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="relative z-10 my-3 flex flex-col items-center"
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl ${currentFont.fontClass} font-normal text-[#8C6D37] leading-tight tracking-normal whitespace-nowrap transition-all duration-300`}>
            Milhan Qaiser
          </h1>
          <div className="my-0.5 flex items-center justify-center gap-2">
            <span className={`${currentFont.fontClass} text-2xl sm:text-3xl text-[#B8860B] italic transition-all duration-300`}>
              with
            </span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl ${currentFont.fontClass} font-normal text-[#8C6D37] leading-tight tracking-normal whitespace-nowrap transition-all duration-300`}>
            Muhammad Hussnain
          </h1>
          <p className="text-[10px] sm:text-xs font-display-luxury tracking-widest text-[#6B5A46] uppercase font-bold mt-2">
            S/O MR & MRS. MUHAMMAD MUNIR BHUTTA
          </p>
        </motion.div>

        {/* Date & Time */}
        <div className="relative z-10 mt-3 pt-2 flex flex-col items-center">
          <motion.span
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUpVariant}
            className="text-xs sm:text-sm font-serif italic text-[#B8860B] font-semibold tracking-wider mb-2"
          >
            Insha’Allah On
          </motion.span>

          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUpVariant}
            className="flex items-center justify-center gap-4 sm:gap-6 py-2 px-5 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/35 max-w-sm w-full shadow-xs"
          >
            <span className="font-display-luxury font-bold text-xs sm:text-sm text-[#2B231D] tracking-wider uppercase">
              SUNDAY
            </span>
            <div className="h-8 w-[1.5px] bg-[#D4AF37]" />
            <div className="text-center">
              <span className="font-serif-luxury font-bold text-2xl text-[#8C6D37] leading-none block">
                25
              </span>
              <span className="text-[10px] font-sans font-semibold text-[#8C6D37]">2026</span>
            </div>
            <div className="h-8 w-[1.5px] bg-[#D4AF37]" />
            <span className="font-display-luxury font-bold text-xs sm:text-sm text-[#2B231D] tracking-wider uppercase">
              OCTOBER
            </span>
          </motion.div>

          <motion.div
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUpVariant}
            className="flex items-center gap-1.5 mt-3 text-xs sm:text-sm font-sans font-semibold text-[#2B231D] tracking-wider"
          >
            <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Time: 1 : 00 PM</span>
          </motion.div>

          <motion.div
            custom={7}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUpVariant}
            className="mt-3 text-center"
          >
            <span className="text-[10px] font-display-luxury tracking-widest text-[#8C6D37] uppercase font-bold block mb-0.5">
              Venue:
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#2B231D] font-medium tracking-wide">
              Sapphire Marquee, Daewoo Road, Faisalabad
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
