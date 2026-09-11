import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, X, Wand2 } from 'lucide-react';
import { useAestheticFont, FONT_OPTIONS } from '../context/FontContext';

export const FontSwitcher: React.FC = () => {
  const { currentFontId, currentFont, setFontId } = useAestheticFont();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Aesthetic Font Switcher Trigger */}
      <div className="fixed bottom-4 left-4 z-40">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(true)}
          id="aesthetic-font-switcher-btn"
          aria-label="Change Aesthetic Font"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_20px_rgba(140,110,70,0.18)] text-[#2B231D] text-xs font-serif font-medium cursor-pointer hover:border-[#B8860B] transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#FFE082] flex items-center justify-center text-white">
            <Wand2 className="w-3 h-3 text-[#2B231D]" />
          </div>
          <span className="flex items-center gap-1 font-sans text-[11px] font-semibold tracking-wide text-[#8C6D37]">
            Font: <span className="text-[#2B231D] font-serif">{currentFont.name}</span>
          </span>
          <Sparkles className="w-3 h-3 text-[#B8860B]" />
        </motion.button>
      </div>

      {/* Font Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-3xl bg-[#FAF6F0] border-2 border-[#D4AF37]/60 shadow-2xl p-6 text-[#2B231D] overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#B8860B]/15 flex items-center justify-center text-[#B8860B]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury font-bold text-base text-[#2B231D]">
                      Aesthetic Wedding Typography
                    </h3>
                    <p className="text-[11px] text-[#8C6D37] font-sans">
                      Select your favorite aesthetic font for the couple's names
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-[#8C6D37] hover:text-[#2B231D] hover:bg-[#B8860B]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Font Choices List */}
              <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {FONT_OPTIONS.map((font) => {
                  const isSelected = font.id === currentFontId;
                  return (
                    <div
                      key={font.id}
                      onClick={() => {
                        setFontId(font.id);
                      }}
                      className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#B8860B] shadow-md ring-1 ring-[#B8860B]/50'
                          : 'bg-[#FFFFFF]/70 border-[#D4AF37]/35 hover:bg-[#FFFFFF] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-serif font-bold text-[#2B231D]">
                            {font.name}
                          </span>
                          <span className="text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#8C6D37] border border-[#D4AF37]/30">
                            {font.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#B8860B] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Live Name Sample */}
                      <p
                        className={`${font.fontClass} text-2xl sm:text-3xl text-[#8C6D37] my-1 leading-relaxed`}
                      >
                        Milhan Qaiser & Muhammad Hussnain
                      </p>

                      <p className="text-[10px] text-[#6B5A46] font-sans">
                        {font.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Confirm / Close Button */}
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
                <span className="text-[11px] font-sans text-[#8C6D37]">
                  Active: <strong className="font-serif text-[#2B231D]">{currentFont.name}</strong>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-1.5 rounded-full bg-[#8C6D37] text-white text-xs font-sans font-medium hover:bg-[#6E5528] transition-colors shadow-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
