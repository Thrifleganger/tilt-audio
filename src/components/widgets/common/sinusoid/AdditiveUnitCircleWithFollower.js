import AdditiveUnitCircle from "../AdditiveUnitCircle";

class AdditiveUnitCircleWithFollower extends AdditiveUnitCircle {

  constructor(
    p,
    position = {x:0,y:0},
    radius = 10,
    frequency = 1,
    baseColor = p.color(255),
    primaryColor = p.color(255)
  ) {
    super(p, position, radius, frequency, baseColor, primaryColor);
    this.buffer = []
  }

  drawAdditionalStyles(phasorPositionVector) {
    const {x: originX, y: originY} = this.position;
    const {p, primaryColor} = this;

    this.buffer.push(phasorPositionVector);

    if (this.buffer.length > 150) {
      this.buffer.splice(0, 1);
    }

    p.noFill()
    p.stroke(primaryColor)
    p.beginShape();
    this.buffer.forEach(pos => {
      p.vertex(pos.x, pos.y);
    })
    p.endShape();

    const radius = Math.sqrt(Math.pow((phasorPositionVector.x - originX), 2) +
      Math.pow((phasorPositionVector.y - originY), 2));

    p.stroke(primaryColor);
    p.drawingContext.setLineDash([5, 10]);
    p.line(phasorPositionVector.x, phasorPositionVector.y, p.width/3, phasorPositionVector.y);
    p.drawingContext.setLineDash([]);
  }

  resetPhase = () => {
    this.buffer.splice(0, this.buffer.length);
    this.partials.forEach(partial => {
      partial.phase = 0.0;
    });
  }
}

export default AdditiveUnitCircleWithFollower