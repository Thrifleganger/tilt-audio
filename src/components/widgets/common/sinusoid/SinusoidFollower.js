class SinusoidFollower {
  constructor(
    p,
    startingPosition = {x:0,y:0},
    frequency = 1,
    amplitude = 1,
    initialPhase = 0.0,
    color = p.color(255),
    isFlipped = false
  ) {
    this.p = p;
    this.startingPosition = startingPosition;
    this.frequency = frequency;
    this.speed = 1;
    this.amplitude = amplitude;
    this.width = Math.floor(p.width);
    this.additionalPhase = initialPhase;
    this.phase = 0.0;
    this.isFlipped = isFlipped;
    this.color = color;
    this.offset = 2 * Math.PI * frequency / Math.floor(this.width);
  }

  display() {
    const {p, width, isFlipped, color} = this;
    const {x,y} = this.startingPosition;

    p.noFill();
    p.strokeWeight(3);
    p.stroke(color);

    p.beginShape();
    for (let i = 0; i < width; i++) {
      if (isFlipped) {
        p.vertex(x + this.updatePerSample(), y + i);
      } else {
        p.vertex(x + i, y + this.updatePerSample());
      }
    }
    p.endShape();
    this.updatePerWave();
  }

  updatePerSample() {
    const value = Math.sin(this.phase - this.additionalPhase);
    this.phase += this.offset;
    return value * this.amplitude;
  }

  updatePerWave() {
    this.phase -= this.offset * this.speed;
  }

  setAmplitude = (value) => {
    this.amplitude = value;
  }

  setPhase(value) {
    this.additionalPhase = value * Math.PI;
  }

  setFrequency = (value) => {
    this.frequency = value;
    this.offset = 2 * Math.PI * this.frequency / Math.floor(this.width);
  }

  setSpeed = (value) => {
    this.speed = value;
  }

  resetPhase = () => {
    this.phase = 0.0;
  }
}

export default SinusoidFollower;