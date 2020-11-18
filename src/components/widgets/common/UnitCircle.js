class UnitCircle {
  constructor(
    p,
    position = {x:0,y:0},
    radius = 10,
    frequency = 1,
    baseColor = p.color(255),
    primaryColor = p.color(255),
  ) {
    this.p = p;
    this.radius = radius;
    this.position = position;
    this.baseColor = baseColor;
    this.primaryColor = primaryColor;
    this.frequency = frequency;
    this.radiusPosition = {x:0,y:0};
    this.speed = 1.0;
    this.phase = 0.0;
    this.additionalPhase = 0.0;
    this.offset = 2 * Math.PI * frequency / Math.floor(p.width);
  }

  display() {
    const {x, y} = this.position;
    const {p, radius, phase, offset, speed, additionalPhase, baseColor, primaryColor} = this;

    p.noFill();
    p.stroke(primaryColor);
    p.strokeWeight(2);
    p.ellipse(x, y, radius * 2, radius * 2);

    this.radiusPosition.x = x + (Math.cos(phase - additionalPhase) * radius);
    this.radiusPosition.y = y + (Math.sin(phase - additionalPhase) * radius);

    p.stroke(primaryColor);
    p.line(x, y, this.radiusPosition.x, this.radiusPosition.y);

    this.phase -= offset * speed;
    this.drawAdditionalStyles();
  }

  drawAdditionalStyles() {
    const {p, position, radius, radiusPosition, baseColor, primaryColor} = this;

    p.stroke(p.red(baseColor), p.green(baseColor), p.blue(baseColor), 50);
    p.line(position.x, position.y + radius, p.width, position.y + radius);
    p.line(position.x, position.y - radius, p.width, position.y - radius);

    p.stroke(primaryColor);
    p.drawingContext.setLineDash([5, 10]);
    p.line(radiusPosition.x, radiusPosition.y, p.width/3, radiusPosition.y);
    p.drawingContext.setLineDash([]);

    p.fill(primaryColor);
    p.noStroke();
    p.ellipse(radiusPosition.x, radiusPosition.y, 10, 10);
  }

  setAmplitude = (value) => {
    this.radius = value;
  }

  setFrequency = (value) => {
    this.frequency = value;
    this.offset = 2 * Math.PI * this.frequency / Math.floor(this.p.width);
  }

  setSpeed = (value) => {
    this.speed = value;
  }

  setPhase = (value) => {
    this.additionalPhase = value * Math.PI;
  }

  resetPhase = () => {
    this.phase = 0.0;
  }
}

export default UnitCircle;