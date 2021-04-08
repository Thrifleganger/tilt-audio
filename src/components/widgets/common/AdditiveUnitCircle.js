import UnitCircle from "./UnitCircle";

class AdditiveUnitCircle {
  constructor(
    p,
    position = {x:0,y:0},
    radius = 10,
    frequency = 1,
    baseColor = p.color(255),
    primaryColor = p.color(255)
  ) {
    this.p = p;
    this.position = position;
    this.frequency = frequency;
    this.baseColor = baseColor;
    this.primaryColor = primaryColor;

    this.speed = 1.0;
    this.additionalPhase = 0.0;
    this.offset = 2 * Math.PI * frequency / Math.floor(p.width);
    this.partials = [];
  }

  display() {
    const {x: originX, y: originY} = this.position;
    const {p} = this;

    p.stroke(255);
    p.noFill();
    p.strokeWeight(2);

    let phasorPositionVector = {x: originX, y: originY}
    this.partials.forEach(partial => {
      const {radius, additionalPhase, primaryColor} = partial.instance;
      const x = Math.cos(partial.phase - additionalPhase) * radius;
      const y = Math.sin(partial.phase - additionalPhase) * radius;

      p.noFill();
      p.stroke(primaryColor);
      p.line(phasorPositionVector.x, phasorPositionVector.y, phasorPositionVector.x + x, phasorPositionVector.y + y);

      p.fill(primaryColor)
      p.noStroke();
      p.ellipse(phasorPositionVector.x + x, phasorPositionVector.y + y, 10, 10);

      phasorPositionVector.x += x;
      phasorPositionVector.y += y;
    })

    this.drawAdditionalStyles(phasorPositionVector)

    this.partials.forEach(partial => {
      const {offset, speed} = partial.instance;
      partial.phase -= offset * speed;
    });
  }

  drawAdditionalStyles(phasorPositionVector) {
    const {x: originX, y: originY} = this.position;
    const {p, baseColor, primaryColor} = this;

    const radius = Math.sqrt(Math.pow((phasorPositionVector.x - originX), 2) +
      Math.pow((phasorPositionVector.y - originY), 2));
    p.noFill();
    p.stroke(primaryColor);
    p.ellipse(originX, originY, radius * 2, radius * 2);

    p.stroke(p.red(baseColor), p.green(baseColor), p.blue(baseColor), 50);
    p.line(originX, originY + radius, p.width, originY + radius);
    p.line(originX, originY - radius, p.width, originY - radius);

    p.stroke(primaryColor);
    p.drawingContext.setLineDash([5, 10]);
    p.line(phasorPositionVector.x, phasorPositionVector.y, p.width/3, phasorPositionVector.y);
    p.drawingContext.setLineDash([]);
  }

  addPartial(unitCircle = new UnitCircle()) {
    this.partials.push({
      instance: unitCircle,
      phase: 0.0
    });
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

  setPhase = (value) => {
    this.additionalPhase = value * Math.PI;
  }

  resetPhase = () => {
    this.partials.forEach(partial => {
      partial.phase = 0.0;
    });
  }
}

export default AdditiveUnitCircle;