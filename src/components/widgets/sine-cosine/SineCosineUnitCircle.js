class SineCosineUnitCircle {
  constructor(
    p,
    position = {x:0,y:0},
    radius = 10,
    frequency = 1
  ) {
    this.p = p;
    this.radius = radius;
    this.position = position;
    this.frequency = frequency;
    this.animatedRadius = new AnimatedRadius(p, this.position, radius, frequency);
  }

  display() {
    const {x, y} = this.position;
    const {width, height} = this.p;
    const {p, radius, animatedRadius} = this;

    p.noFill();
    p.strokeWeight(2);
    p.stroke(200, 200, 200, 60);
    p.line(0, y, width, y);
    p.line(x, 0, x, height);
    p.line(x - radius, y, x - radius, height);
    p.line(x + radius, y, x + radius, height);
    p.line(x, y - radius, width, y - radius);
    p.line(x, y + radius, width, y + radius);

    p.stroke(p.color(240));
    p.ellipse(x, y, radius * 2, radius * 2);
    animatedRadius.display();
  }

  setAmplitude = (value) => {
    this.radius = value;
    this.animatedRadius.setAmplitude(value)
  }

  setFrequency = (value) => {
    this.animatedRadius.setFrequency(value);
  }

  setSpeed = (value) => {
    this.animatedRadius.setSpeed(value);
  }

  setPhase = (value) => {
    this.animatedRadius.additionalPhase = value * Math.PI;
  }
}

class AnimatedRadius {
  constructor(p, origin = {x:0,y:0}, length, frequency) {
    this.p = p;
    this.origin = origin;
    this.length = length;
    this.frequency = frequency;
    this.speed = 1.0;
    this.phase = 0.0;
    this.additionalPhase = 0.0;
    this.offset = 2 * Math.PI * frequency / Math.floor(p.width);
  }

  display() {
    const {p, length, phase, offset, speed} = this;
    const {x,y} = this.origin;

    const circleX = x + (Math.cos(phase - this.additionalPhase) * length);
    const circleY = y + (Math.sin(phase - this.additionalPhase) * length);

    p.line(x, y, circleX, circleY);

    p.strokeWeight(2);
    p.stroke(p.color(226, 166, 255));
    p.line(x, y, circleX, y);
    p.drawingContext.setLineDash([5, 10]);
    p.line(circleX, y, circleX, 3*p.width/10);

    p.drawingContext.setLineDash([]);
    p.stroke(p.color(197, 255, 116));
    p.line(circleX, circleY, circleX, y);
    p.drawingContext.setLineDash([5, 10]);
    p.line(circleX, circleY, 3*p.width/10, circleY);
    p.drawingContext.setLineDash([]);

    this.phase -= offset * speed;
  }

  setAmplitude = (value) => {
    this.length = value;
  }

  setFrequency = (value) => {
    this.frequency = value;
    this.offset = 2 * Math.PI * this.frequency / Math.floor(this.p.width);
  }

  setSpeed = (value) => {
    this.speed = value;
  }
}

export default SineCosineUnitCircle;