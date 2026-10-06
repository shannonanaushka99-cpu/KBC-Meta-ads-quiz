/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class KbcAudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem('kbc_audio_muted');
      if (saved !== null) {
        this.muted = saved === 'true';
      }
    } catch {
      this.muted = false;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    try {
      localStorage.setItem('kbc_audio_muted', muted ? 'true' : 'false');
    } catch {
      // ignore
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // Tense clock tick (Ghadiyal Babu / Tik-Tiki)
  public playTick() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Audio fallback
    }
  }

  // Suspense heartbeat pulse
  public playHeartbeat() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Lub
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(75, now);
      osc1.frequency.exponentialRampToValueAtTime(38, now + 0.12);
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Dub
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(85, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(35, now + 0.32);
      gain2.gain.setValueAtTime(0.28, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.35);
    } catch {
      // Audio fallback
    }
  }

  // "Lock Kiya Jaye!" Dramatic Lock Chime
  public playLockSound() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const freqs = [196, 293.66, 392, 587.33]; // G major chord suspense
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12 / (idx + 1), now);
        gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.linearRampToValueAtTime(600, now + 0.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 0.85);
      });
    } catch {
      // Audio fallback
    }
  }

  // Sahi Jawab! (Correct Answer Fanfare)
  public playCorrectFanfare() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Ascending triumphant arpeggio C4 - E4 - G4 - C5 - E5
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteTime = now + i * 0.08;

        osc.type = i < 4 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.18, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.65);
      });

      // Triumphant chord bloom
      const chordTime = now + 0.45;
      const chord = [523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, chordTime);

        gain.gain.setValueAtTime(0.15, chordTime);
        gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(chordTime);
        osc.stop(chordTime + 1.3);
      });
    } catch {
      // Audio fallback
    }
  }

  // Galat Jawab! (Wrong Answer Buzzer / Drop)
  public playWrongBuzzer() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Dissonant descending tone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(164.81, now); // E3
      osc1.frequency.linearRampToValueAtTime(110.00, now + 0.8); // A2

      osc2.frequency.setValueAtTime(155.56, now); // Eb3 dissonant minor second
      osc2.frequency.linearRampToValueAtTime(103.83, now + 0.8);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(250, now + 0.8);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.9);
      osc2.stop(now + 0.9);
    } catch {
      // Audio fallback
    }
  }

  // Lifeline chime / whoosh
  public playLifelineChime() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const pitches = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
      pitches.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const t = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch {
      // Audio fallback
    }
  }

  // ₹7 Crore Jackpot Celebration
  public playWinJackpot() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Majestic fanfare
      const melody = [
        { f: 523.25, t: 0.0, d: 0.2 },
        { f: 659.25, t: 0.2, d: 0.2 },
        { f: 783.99, t: 0.4, d: 0.3 },
        { f: 1046.50, t: 0.7, d: 0.6 },
        { f: 880.00, t: 1.3, d: 0.3 },
        { f: 1046.50, t: 1.6, d: 0.9 }
      ];

      melody.forEach(note => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const time = now + note.t;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, time);

        gain.gain.setValueAtTime(0.25, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + note.d + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + note.d + 0.25);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const kbcAudio = new KbcAudioEngine();
