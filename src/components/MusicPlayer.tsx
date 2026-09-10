import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Disc3, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audioController } from '../services/audioController';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  useEffect(() => {
    const unsubscribe = audioController.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const togglePlay = () => {
    audioController.toggle();
    setIsPlaying(audioController.getIsPlaying());
  };

  const toggleMute = () => {
    const muted = audioController.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioController.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2 select-none">
      <motion.div
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(140,110,70,0.15)] text-[#2B231D]"
      >
        <button
          onClick={togglePlay}
          id="audio-play-toggle-btn"
          aria-label="Toggle Wedding Music"
          className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#FFE082] p-[1.5px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-full h-full rounded-full bg-[#FAF5EE] flex items-center justify-center">
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="flex items-center justify-center text-[#B8860B]"
              >
                <Disc3 className="w-4 h-4" />
              </motion.div>
            ) : (
              <Play className="w-3.5 h-3.5 text-[#B8860B] ml-0.5" />
            )}
          </div>
        </button>

        <div
          onClick={() => setShowVolumePopup(!showVolumePopup)}
          className="flex items-center gap-2 cursor-pointer pr-1"
        >
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-medium tracking-wide text-[#2B231D] flex items-center gap-1">
              <span>Wedding Music</span>
              <Sparkles className="w-2.5 h-2.5 text-[#B8860B]" />
            </span>
            <span className="text-[9px] text-[#8C6D37] font-sans tracking-wider uppercase">
              {isPlaying ? 'Playing • Romantic Melody' : 'Paused • Tap to Play'}
            </span>
          </div>

          <div className="flex items-end gap-[2px] h-4 w-5 pl-1">
            <motion.div
              animate={isPlaying ? { height: ['20%', '100%', '40%'] } : { height: '20%' }}
              transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
              className="w-[3px] bg-[#B8860B] rounded-full"
            />
            <motion.div
              animate={isPlaying ? { height: ['60%', '20%', '90%'] } : { height: '30%' }}
              transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', delay: 0.1 }}
              className="w-[3px] bg-[#D4AF37] rounded-full"
            />
            <motion.div
              animate={isPlaying ? { height: ['90%', '40%', '100%'] } : { height: '20%' }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
              className="w-[3px] bg-[#B8860B] rounded-full"
            />
          </div>
        </div>

        <button
          onClick={toggleMute}
          id="audio-mute-btn"
          aria-label="Mute or Unmute"
          className="p-1 rounded-full text-[#8C6D37] hover:text-[#B8860B] transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {showVolumePopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            className="p-3 rounded-2xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl text-[#2B231D] w-60"
          >
            <div className="flex items-center justify-between text-xs text-[#8C6D37] mb-2 font-serif">
              <span>Volume</span>
              <span>{isMuted ? '0%' : `${Math.round(volume * 100)}%`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-[#FAF5EE] rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
            />
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#D4AF37]/20 text-[10px] text-[#6B5A46]">
              <span>Soulful Acoustic Santoor</span>
              <button
                onClick={togglePlay}
                className="text-[#B8860B] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {isPlaying ? 'Pause Track' : 'Resume'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
