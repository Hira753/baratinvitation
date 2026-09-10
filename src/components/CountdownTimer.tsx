import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CountdownTime } from '../types';

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: custom * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2026-10-25T13:00:00+05:00').getTime();

  const calculateTimeLeft = (): CountdownTime => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="relative w-full max-w-xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-[#FFFFFF] border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(140,110,70,0.08)] p-6 sm:p-8 text-center overflow-hidden"
      >
        <div className="absolute inset-3 rounded-2xl border border-[#D4AF37]/20 pointer-events-none" />

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="relative z-10 flex flex-col items-center mb-5"
        >
          <span className="text-[10px] sm:text-xs font-display-luxury tracking-[0.25em] text-[#8C6D37] uppercase font-semibold">
            COUNTING DOWN
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#2B231D] mt-1 tracking-wide">
            Until the Big Day
          </h3>
          <p className="text-xs font-serif italic text-[#6B5A46] mt-1">
            Sunday, 25 October 2026 • 1:00 PM
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto my-2">
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeVariant}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/40 shadow-sm"
          >
            <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#2B231D]">
              {format(timeLeft.days)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-display-luxury tracking-wider text-[#8C6D37] uppercase mt-0.5 font-semibold">
              Days
            </span>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeVariant}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/40 shadow-sm"
          >
            <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#2B231D]">
              {format(timeLeft.hours)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-display-luxury tracking-wider text-[#8C6D37] uppercase mt-0.5 font-semibold">
              Hours
            </span>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeVariant}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/40 shadow-sm"
          >
            <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#2B231D]">
              {format(timeLeft.minutes)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-display-luxury tracking-wider text-[#8C6D37] uppercase mt-0.5 font-semibold">
              Mins
            </span>
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeVariant}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/40 shadow-sm"
          >
            <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#B8860B]">
              {format(timeLeft.seconds)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-display-luxury tracking-wider text-[#8C6D37] uppercase mt-0.5 font-semibold">
              Secs
            </span>
          </motion.div>
        </div>

        <motion.p
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariant}
          className="relative z-10 text-[11px] text-[#8C6D37] font-display-luxury tracking-widest uppercase mt-4 flex items-center justify-center gap-1.5 font-semibold"
        >
          <Sparkles className="w-3 h-3 text-[#B8860B]" />
          <span>Insha'Allah</span>
          <Sparkles className="w-3 h-3 text-[#B8860B]" />
        </motion.p>
      </motion.div>
    </section>
  );
};
