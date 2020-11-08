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
    this.initialPhase = initialPhase;
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
        p.vertex(x + this.update(), y + i);
      } else {
        p.vertex(x + i, y + this.update());
      }
    }
    p.endShape();
    this.phase -= this.offset * this.speed;
  }

  update() {
    const value = Math.sin(this.phase - this.initialPhase);
    this.phase += this.offset;
    return value * this.amplitude;
  }

  setAmplitude = (value) => {
    this.amplitude = value;
  }
  setFrequency = (value) => {
    this.frequency = value;
    this.offset = 2 * Math.PI * this.frequency / Math.floor(this.width);
  }
  setSpeed = (value) => {
    this.speed = value;
  }
}

export default SinusoidFollower;