export interface RSVPContact {
  phone: string;
  display: string;
}

export type AestheticFontId =
  | 'allura'
  | 'pinyon'
  | 'montecarlo'
  | 'alexbrush'
  | 'greatvibes'
  | 'playfair';

export interface AestheticFontOption {
  id: AestheticFontId;
  name: string;
  label: string;
  fontClass: string;
  preview: string;
  description: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface NoteDefinition {
  freq: number;
  dur: number;
  type: 'santoor' | 'flute' | 'pad' | 'bell';
  chord?: number[];
}
