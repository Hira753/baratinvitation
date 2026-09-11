import React, { createContext, useContext, useState } from 'react';
import { AestheticFontId, AestheticFontOption } from '../types';

export const FONT_OPTIONS: AestheticFontOption[] = [
  {
    id: 'allura',
    name: 'Allura Script',
    label: 'Modern Romance',
    fontClass: 'font-allura',
    preview: 'Milhan & Hussnain',
    description: 'Clean, effortless, flowing aesthetic calligraphy',
  },
  {
    id: 'pinyon',
    name: 'Pinyon Script',
    label: 'Royal Victorian',
    fontClass: 'font-pinyon',
    preview: 'Milhan & Hussnain',
    description: 'Aristocratic French/British ballroom script',
  },
  {
    id: 'montecarlo',
    name: 'MonteCarlo',
    label: 'Regal Baroque',
    fontClass: 'font-montecarlo',
    preview: 'Milhan & Hussnain',
    description: 'Opulent swashes & imperial romance',
  },
  {
    id: 'alexbrush',
    name: 'Alex Brush',
    label: 'Soft Romance',
    fontClass: 'font-alexbrush',
    preview: 'Milhan & Hussnain',
    description: 'Smooth, graceful & tender cursive strokes',
  },
  {
    id: 'greatvibes',
    name: 'Great Vibes',
    label: 'Classic Luxury',
    fontClass: 'font-greatvibes',
    preview: 'Milhan & Hussnain',
    description: 'Festive & elegant flowing loops',
  },
  {
    id: 'playfair',
    name: 'Playfair Italic',
    label: 'Editorial Vogue',
    fontClass: 'font-playfair-italic',
    preview: 'Milhan & Hussnain',
    description: 'High-fashion editorial aesthetic serif',
  },
];

interface FontContextType {
  currentFontId: AestheticFontId;
  currentFont: AestheticFontOption;
  setFontId: (id: AestheticFontId) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFontId, setCurrentFontId] = useState<AestheticFontId>(() => {
    try {
      const saved = localStorage.getItem('wedding_aesthetic_font');
      if (saved && FONT_OPTIONS.some((f) => f.id === saved)) {
        return saved as AestheticFontId;
      }
    } catch {
      // ignore
    }
    return 'allura'; // Default to the ultra-aesthetic Allura
  });

  const setFontId = (id: AestheticFontId) => {
    setCurrentFontId(id);
    try {
      localStorage.setItem('wedding_aesthetic_font', id);
    } catch {
      // ignore
    }
  };

  const currentFont =
    FONT_OPTIONS.find((f) => f.id === currentFontId) || FONT_OPTIONS[0];

  return (
    <FontContext.Provider value={{ currentFontId, currentFont, setFontId }}>
      {children}
    </FontContext.Provider>
  );
};

export const useAestheticFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useAestheticFont must be used within FontProvider');
  }
  return context;
};
