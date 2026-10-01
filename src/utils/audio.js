// Web Audio API Synthesizer for Hypercar Engine Sound
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.gainNode = null;
    this.filterNode = null;
    this.isEnabled = false;
    this.currentVelocity = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      // Low pass filter for engine roar
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(400, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(3, this.ctx.currentTime);

      // Oscillator 1: Main tone (sawtooth)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(65, this.ctx.currentTime); // ~C2 note

      // Oscillator 2: Electric hypercar harmonic (sine)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(130, this.ctx.currentTime);

      // Sub Oscillator: Deep rumble (triangle)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'triangle';
      this.subOsc.frequency.setValueAtTime(32.5, this.ctx.currentTime);

      // Routing
      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.subOsc.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.subOsc.start();
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;
    if (this.gainNode && this.ctx) {
      const targetGain = this.isEnabled ? 0.08 : 0;
      this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
    return this.isEnabled;
  }

  // Update pitch based on velocity (0 to 100)
  updateVelocity(velocity) {
    if (!this.isEnabled || !this.ctx || !this.osc1) return;

    this.currentVelocity = velocity;
    const now = this.ctx.currentTime;
    
    // Scale pitch: idle (55Hz) up to top speed (~240Hz)
    const baseFreq = 55 + (velocity * 2.2);
    this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.08);
    this.osc2.frequency.setTargetAtTime(baseFreq * 2.5, now, 0.08);
    this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.08);

    // Open filter as speed increases
    const filterFreq = 300 + (velocity * 25);
    this.filterNode.frequency.setTargetAtTime(filterFreq, now, 0.08);

    // Dynamic volume boost with throttle
    const dynamicVolume = 0.05 + (velocity / 100) * 0.08;
    this.gainNode.gain.setTargetAtTime(dynamicVolume, now, 0.08);
  }
}

export const soundEngine = new SoundEngine();
