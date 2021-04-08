import {Destination, Gain, Oscillator, start} from 'tone'

class SinusoidInterferencePlayer {
  constructor() {
    this.sineOsc1 = new Oscillator(440, "sine");
    this.sineOsc2 = new Oscillator(440, "sine");
    this.gainNode = new Gain(0.1);
    this.isPlaying = false;
  }

  startAudio() {
    start().then();
    this.sineOsc1.connect(this.gainNode);
    this.sineOsc2.connect(this.gainNode);
    this.gainNode.connect(Destination);

    this.sineOsc1.start();
    this.sineOsc2.start();
    this.isPlaying = true;
  }

  stopAudio() {
    this.sineOsc1.disconnect();
    this.sineOsc2.disconnect();
    this.gainNode.disconnect();
    this.isPlaying = false;
  }

  dispose() {
    this.gainNode.disconnect();
    this.gainNode.dispose();
    this.sineOsc1.dispose();
    this.sineOsc2.dispose();
  }

  setPhase(value) {
    this.sineOsc2.phase = value * 180;
  }

  setAmplitude(value) {
    this.sineOsc2.volume.value = 20 * Math.log(value);
  }
}

export default SinusoidInterferencePlayer;