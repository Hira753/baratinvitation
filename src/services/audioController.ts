import { NoteDefinition } from '../types';

class WeddingAudioController {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.7;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private gainNode: GainNode | null = null;
  private currentNoteIndex: number = 0;
  private htmlAudio: HTMLAudioElement | null = null;
  private listeners: Array<(playing: boolean) => void> = [];

  readonly weddingTrackUrl: string =
    'https://res.cloudinary.com/irbsm5bs/video/upload/v1787845694/WhatsApp_Video_2026-08-27_at_8.45.44_PM_wmjyjm.mp4';
  readonly fallbackTrackUrl: string =
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-oriental-relaxing-meditation-112191.mp3';

  private readonly melodyNotes: NoteDefinition[] = [
    { freq: 293.66, dur: 0.4, type: 'santoor' },
    { freq: 329.63, dur: 0.4, type: 'santoor' },
    { freq: 369.99, dur: 0.45, type: 'santoor' },
    { freq: 440.0, dur: 0.85, type: 'flute', chord: [220.0, 293.66, 369.99] },
    { freq: 493.88, dur: 0.55, type: 'flute' },
    { freq: 440.0, dur: 0.45, type: 'flute' },
    { freq: 369.99, dur: 0.7, type: 'flute' },
    { freq: 329.63, dur: 0.95, type: 'pad', chord: [196.0, 293.66, 329.63] },
    { freq: 293.66, dur: 0.4, type: 'santoor' },
    { freq: 369.99, dur: 0.4, type: 'santoor' },
    { freq: 440.0, dur: 0.6, type: 'flute' },
    { freq: 554.37, dur: 1.05, type: 'flute', chord: [220.0, 369.99, 440.0] },
    { freq: 493.88, dur: 0.5, type: 'flute' },
    { freq: 440.0, dur: 0.5, type: 'flute' },
    { freq: 369.99, dur: 0.95, type: 'pad', chord: [146.83, 220.0, 293.66] },
    { freq: 440.0, dur: 0.4, type: 'flute' },
    { freq: 493.88, dur: 0.4, type: 'flute' },
    { freq: 587.33, dur: 0.8, type: 'flute', chord: [293.66, 369.99, 440.0] },
    { freq: 554.37, dur: 0.45, type: 'flute' },
    { freq: 493.88, dur: 0.65, type: 'flute' },
    { freq: 440.0, dur: 0.5, type: 'flute' },
    { freq: 369.99, dur: 1.0, type: 'pad', chord: [220.0, 277.18, 329.63] },
    { freq: 369.99, dur: 0.4, type: 'flute' },
    { freq: 440.0, dur: 0.4, type: 'flute' },
    { freq: 493.88, dur: 0.55, type: 'flute' },
    { freq: 440.0, dur: 0.45, type: 'flute' },
    { freq: 369.99, dur: 0.45, type: 'santoor' },
    { freq: 329.63, dur: 0.45, type: 'santoor' },
    { freq: 293.66, dur: 1.25, type: 'pad', chord: [146.83, 220.0, 293.66, 369.99] },
    { freq: 880.0, dur: 0.35, type: 'bell' },
    { freq: 739.99, dur: 0.35, type: 'bell' },
    { freq: 587.33, dur: 0.45, type: 'santoor' },
    { freq: 440.0, dur: 0.55, type: 'santoor' },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.htmlAudio = new Audio();
        this.htmlAudio.src = this.weddingTrackUrl;
        this.htmlAudio.loop = true;
        this.htmlAudio.volume = this.volume;
        this.htmlAudio.crossOrigin = 'anonymous';
        this.htmlAudio.preload = 'auto';

        this.htmlAudio.addEventListener('error', (e) => {
          console.warn('Primary audio failed to load, trying fallback', e);
          if (this.htmlAudio && this.htmlAudio.src !== this.fallbackTrackUrl) {
            this.htmlAudio.src = this.fallbackTrackUrl;
            if (this.isPlaying) {
              this.htmlAudio.play().catch(() => {
                this.startProceduralMelody();
              });
            }
          } else {
            this.startProceduralMelody();
          }
        });
      } catch (err) {
        console.warn('HTML Audio initialization error', err);
      }
    }
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.isPlaying));
  }

  private initAudioContext(): void {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(
          this.isMuted ? 0 : this.volume * 0.45,
          this.audioCtx.currentTime,
        );
        this.gainNode.connect(this.audioCtx.destination);
      }
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public async startAudio(): Promise<void> {
    if (this.isPlaying) return;

    this.initAudioContext();
    this.isPlaying = true;
    this.notify();

    if (this.htmlAudio) {
      this.htmlAudio.volume = this.isMuted ? 0 : this.volume;
      this.htmlAudio
        .play()
        .then(() => {})
        .catch((err) => {
          console.warn('Audio play prevented or deferred', err);
          this.startProceduralMelody();
        });
    } else {
      this.startProceduralMelody();
    }
  }

  public stopAudio(): void {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    this.notify();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.stopAudio();
    } else {
      this.startAudio();
    }
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(
        this.isMuted ? 0 : this.volume * 0.45,
        this.audioCtx.currentTime,
      );
    }
    if (this.htmlAudio) {
      this.htmlAudio.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startProceduralMelody(): void {
    if (!this.isPlaying || !this.audioCtx) return;

    const playNext = () => {
      if (!this.isPlaying || !this.audioCtx) return;
      const note = this.melodyNotes[this.currentNoteIndex];
      this.playNote(note.freq, note.dur, note.type);

      if (note.chord) {
        note.chord.forEach((freq) => this.playChordNote(freq, note.dur * 1.5));
      }

      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
      this.timerId = setTimeout(playNext, note.dur * 950);
    };

    playNext();
  }

  private playNote(freq: number, duration: number, type: string): void {
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    if (type === 'flute') {
      osc.type = 'sine';
      const vibrato = this.audioCtx.createOscillator();
      const vibratoGain = this.audioCtx.createGain();
      vibrato.frequency.setValueAtTime(5, now);
      vibratoGain.gain.setValueAtTime(3.5, now);
      vibrato.connect(osc.frequency);
      vibrato.start(now);
      vibrato.stop(now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.32, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else if (type === 'santoor') {
      osc.type = 'triangle';
      gain.gain.setValueAtTime(this.volume * 0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.85);
    } else if (type === 'bell') {
      osc.type = 'sine';
      gain.gain.setValueAtTime(this.volume * 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);
    } else {
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    osc.frequency.setValueAtTime(freq, now);
    osc.connect(gain);

    if (this.gainNode) {
      gain.connect(this.gainNode);
    } else {
      gain.connect(this.audioCtx.destination);
    }

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private playChordNote(freq: number, duration: number): void {
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(this.volume * 0.14, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    if (this.gainNode) {
      gain.connect(this.gainNode);
    } else {
      gain.connect(this.audioCtx.destination);
    }

    osc.start(now);
    osc.stop(now + duration);
  }
}

export const audioController = new WeddingAudioController();
