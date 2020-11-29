class Axis {

  constructor(
    p,
    start = p.createVector(),
    end = p.createVector(),
    range = {min: 0, max: 1, step: 10},
  ) {
    this.p = p;
    this.start = start;
    this.end = end.sub(start.array());
    this.range = range;
    this.color = p.color(255);
    this.ignoreBoundaryNumbers = true;
    this.shouldDisplayText = true;
    this.shouldSkipOrigin = false;
  }

  draw() {
    const {p, start, end} = this;
    const {min, max, step} = this.range;
    p.noFill();
    this.setStrokeWeight();
    this.setStrokeColor();

    p.push();
    p.translate(start.x, start.y);
    p.line(0, 0, end.x, end.y);
    p.rotate(end.heading());

    for (let i = min; i <= max; i += step) {
      if ((this.isBoundaryValue(i) && this.ignoreBoundaryNumbers) ||
        (this.isOriginValue(i) && this.shouldSkipOrigin)) {
        continue;
      }
      const divisionLength = p.map(i, min, max, 0, end.mag())

      p.noFill();
      p.stroke(this.color);
      p.line(divisionLength, 5, divisionLength, - 5);

      p.noStroke();
      p.fill(this.color);
      if (this.shouldDisplayText) {
        p.push()
        p.translate(divisionLength + 5, -10);
        p.rotate(-end.heading());
        p.text(i.toFixed(1), 0, 0);
        p.pop();
      }
    }
    p.pop();
  }

  isBoundaryValue(value) {
    const {min, max} = this.range;
    return value === min || value === max;
  }

  isOriginValue(value) {
    const {min, max} = this.range;
    return  Math.round(value*100000) === Math.round(((Math.abs(max) - Math.abs(min))/2)*100000);
  }

  setStrokeWeight(weight = 1) {
    this.p.strokeWeight(1);
  }

  setStrokeColor(color = this.p.color(255)) {
    this.p.stroke(color);
    this.color = color;
  }

  setIgnoreBoundary(value) {
    this.ignoreBoundaryNumbers = value;
  }

  shouldDisplayText(value) {
    this.shouldDisplayText = value;
  }

  setSkipOrigin(value) {
    this.shouldSkipOrigin = value;
  }
}

export default Axis;