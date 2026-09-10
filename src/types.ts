export interface RSVPContact {
  phone: string;
  display: string;
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
