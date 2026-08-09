/**
 * Brew Bliss 3D - Procedural Web Audio API Ambiance & Sound Effects Generator
 * Generates relaxing coffee shop lo-fi acoustics & espresso steam hiss without external files.
 */

window.BrewAudio = {
  ctx: null,
  isPlaying: false,
  steamGain: null,
  musicGain: null,
  oscillators: [],

  init: function() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
  },

  toggleAmbiance: function() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopAmbiance();
      this.isPlaying = false;
    } else {
      this.startAmbiance();
      this.isPlaying = true;
    }
    return this.isPlaying;
  },

  startAmbiance: function() {
    if (!this.ctx) return;

    // 1. Espresso Machine Soft Steam Hiss (Filtered Pink Noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter for warm hiss
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    this.steamGain = this.ctx.createGain();
    this.steamGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.steamGain);
    this.steamGain.connect(this.ctx.destination);
    whiteNoise.start();
    this.oscillators.push(whiteNoise);

    // 2. Gentle Warm Lo-Fi Coffee Lounge Chord Pad (Sine / Triangle blend)
    const chordNotes = [261.63, 329.63, 392.00, 493.88]; // Cmaj7 warm chord
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    chordNotes.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass filter
      const lpf = this.ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(450, this.ctx.currentTime);

      osc.connect(lpf);
      lpf.connect(this.musicGain);
      osc.start();
      this.oscillators.push(osc);
    });

    this.musicGain.connect(this.ctx.destination);
  },

  stopAmbiance: function() {
    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch(e){}
    });
    this.oscillators = [];
  },

  playClickSound: function() {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
};
