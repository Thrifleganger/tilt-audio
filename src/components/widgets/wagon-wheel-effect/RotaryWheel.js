class RotaryWheel {
  constructor(p5, position = {x:0, y:0}, radius = 10, speed = 1, numberOfSpokes = 4) {
    this.p5 = p5;
    this.position = position;
    this.radius = radius;
    this.speed = speed;
    this.numberOfSpokes = numberOfSpokes;
    this.phase = 0;
    p5.frameRate(24);
    p5.angleMode(p5.DEGREES);
  }

  display() {
    const {p5, radius, numberOfSpokes} = this;
    const {x,y} = this.position;
    p5.translate(x, y);

    this.rotate();

    p5.noFill();
    p5.stroke(p5.color(360,360,360,200));
    p5.strokeWeight(10);
    p5.circle(0, 0, radius * 2);
    p5.circle(0, 0, radius / 5);
    for (let i = 0; i < numberOfSpokes; i++) {
      p5.push();
      p5.rotate(360 * i / numberOfSpokes);
      p5.colorMode(p5.HSB, 360);
      p5.stroke(p5.color(i * 360 / numberOfSpokes, 250, 250));
      p5.strokeWeight(4);
      p5.line(0, 0, 0, radius);
      p5.pop();
    }
  }

  rotate() {
    const {p5, speed} = this;
    this.phase += speed;
    p5.rotate(this.phase);
  }

  setSpeed(value) {
    this.speed = parseFloat(value);
  }

  setNumberOfSpokes(value) {
    this.numberOfSpokes = parseInt(value);
  }

  setFrameRate(value) {
    this.p5.frameRate(parseInt(value));
  }
}

export default RotaryWheel;