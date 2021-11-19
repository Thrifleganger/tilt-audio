import UnitCircle from "../common/UnitCircle";

class LissajousUnitCircle extends UnitCircle {
  constructor(
    p,
    position = {x:0,y:0},
    radius = 10,
    frequency = 1,
    baseColor = p.color(255),
    primaryColor = p.color(255),
  ) {
    super(p, position, radius, frequency, baseColor, primaryColor);
  }

  drawAdditionalStyles() {
    const {p, radiusPosition, primaryColor} = this;

    p.fill(primaryColor);
    p.noStroke();
    p.ellipse(radiusPosition.x, radiusPosition.y, 10, 10);
  }
}

export default LissajousUnitCircle;