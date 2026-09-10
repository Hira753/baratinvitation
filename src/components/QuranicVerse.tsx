import React from 'react';
import { motion, Variants } from 'motion/react';
import { Sparkles } from 'lucide-react';

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: custom * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const QuranicVerse: React.FC = () => {
  return (
    <section className="relative w-full max-w-xl mx-auto px-4 py-5">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-[#FFFFFF] border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(140,110,70,0.08)] p-6 sm:p-8 text-center overflow-hidden"
      >
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="flex justify-center mb-3 text-[#B8860B]"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        <motion.p
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="font-arabic text-xl sm:text-2xl md:text-3xl text-[#2B231D] leading-[2.2] tracking-wide mb-4"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="flex items-center justify-center gap-3 my-3"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        <motion.blockquote
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="font-serif-luxury italic text-sm sm:text-base text-[#5A4A3E] leading-relaxed max-w-md mx-auto mb-3"
        >
          “And among His signs is that He created for you spouses from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy.”
        </motion.blockquote>

        <motion.p
          custom={5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="text-[11px] font-display-luxury font-semibold tracking-[0.25em] text-[#8C6D37] uppercase"
        >
          SURAH AR-RUM • 30:21
        </motion.p>
      </motion.div>
    </section>
  );
};
