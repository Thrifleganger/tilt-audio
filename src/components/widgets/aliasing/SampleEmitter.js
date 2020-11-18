import {v4 as uuid} from 'uuid'

class SampleEmitter {

  constructor(p5, dimensions, amplitude, frequency, speed) {
    this.p5 = p5;
    this.dimensions = dimensions;
    this.phase = 0.0;
    this.amplitude = amplitude;
    this.speed = speed;
    this.frequency = frequency;
    this.emitterPosition = 0;
    this.offset = 4 * Math.PI * frequency / dimensions.x;
    this.samplingInterval = 500;

    this.samples = new Map();
    const sampleGenerationCallback = () => {
      const sampleId = uuid();
      this.samples.set(sampleId, new Sample(
        sampleId,
        this.p5,
        {x: this.dimensions.x/2, y: this.emitterPosition},
        this.dimensions.x,
        this.emitterDestructorCallback,
        this.frequency, this.speed
      ))
      setTimeout(sampleGenerationCallback, this.samplingInterval   / this.speed);
    };
    setTimeout(sampleGenerationCallback, this.samplingInterval  / this.speed);
  }

  display() {
    const {p5} = this;
    const {x,y} = this.dimensions;
    p5.stroke(p5.color(200,200,200,80));
    p5.strokeWeight(2);
    p5.line(x/2, 0, x/2, y);
    p5.ellipse(x/2, this.updateEmitter(), 25, 25);
    this.samples.forEach(sample => sample.display());
  }

  updateEmitter() {
    const value = Math.sin(this.phase);
    this.phase += this.offset * this.speed;
    this.emitterPosition = this.dimensions.y/2 + (value * this.amplitude * this.dimensions.y/2);
    return this.emitterPosition;
  }

  emitterDestructorCallback = (sample) => {
    this.samples.delete(sample.id);
    sample = null;
  }

  setFrequency(value) {
    this.frequency = value;
    this.samples.clear();
    this.recalculateOffset();
  }

  setAmplitude(value) {
    this.amplitude = value;
  }

  setSpeed(value) {
    this.speed = value;
    this.samples.forEach(sample => sample.setSpeed(this.speed));
  }

  setSamplingInterval(value) {
    this.samplingInterval = value * 1000;
  }

  recalculateOffset() {
    this.offset = 4 * Math.PI * this.frequency / this.dimensions.x;
  }
}

class Sample {

  constructor(id, p5, position, containerWidth, destructorCallback, frequency, speed) {
    this.id = id;
    this.p5 = p5;
    this.position = position;
    this.containerWidth = containerWidth;
    this.destructorCallback = destructorCallback;
    this.frequency = frequency;
    this.speed = speed;
    this.size = 14;
  }

  display() {
    const {p5, size} = this;
    p5.noStroke();
    p5.fill(p5.color(255, 166, 166));
    this.update();
    p5.ellipse(this.position.x, this.position.y, size, size);
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x - this.size > this.containerWidth) {
      this.destructorCallback(this);
    }
  }

  setSpeed(value) {
    this.speed = value;
  }
}

export default SampleEmitter;