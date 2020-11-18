class SineWave {

  constructor(
    p5,
    startingPosition = {x: 0, y: 0},
    dimensions = {x:0, y:0},
    amplitude = 0.7,
    frequency = 1,
    speed = 1,
    color = null
  ) {
    this.p5 = p5;
    this.phase = 0.0;
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.dimensions = dimensions;
    this.coordinates = startingPosition;
    this.speed = speed;
    this.color = color;
    this.additionalPhase = 0.0;
    this.heightOffset = 0.0;
    this.offset = 2 * Math.PI * this.frequency / Math.floor(this.dimensions.x);
  }

  display() {
    this.p5.stroke(this.color);
    this.p5.noFill();
    this.p5.strokeWeight(3);
    this.p5.beginShape();
    for (let x = Math.floor(this.dimensions.x); x > 0; x--) {
      this.p5.vertex(this.coordinates.x + x,
        this.coordinates.y + (this.heightOffset * this.dimensions.y) + this.update());
    }
    this.p5.endShape();
    this.phase += this.offset * this.speed;
  }

  update() {
    const value = Math.sin(this.phase + this.additionalPhase);
    this.phase += this.offset;
    return value * this.amplitude * (this.dimensions.y/2);
  }

  setFrequency(value) {
    this.frequency = value;
    this.recalculateOffset();
  }

  setAmplitude(value) {
    this.amplitude = value;
  }

  setSpeed(value) {
    this.speed = value;
  }

  setPhase(value) {
    this.additionalPhase = value * Math.PI;
  }

  setHeightOffset(value) {
    this.heightOffset = value;
  }

  recalculateOffset() {
    this.offset = 2 * Math.PI * this.frequency / Math.floor(this.dimensions.x);
  }
}

export default SineWave;