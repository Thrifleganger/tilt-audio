class LissajousCurveFollower {

  constructor(
    p,
    color = p.color(255),
  ) {
    this.p = p;
    this.color = color;
    this.buffer = []
  }

  display(positionVector) {
    const {p, color} = this;
    this.buffer.push(positionVector);

    if (this.buffer.length > 150) {
      this.buffer.splice(0, 1);
    }

    p.noFill()
    p.stroke(color)
    p.beginShape();
    this.buffer.forEach(pos => {
      p.vertex(pos.x, pos.y);
    })
    p.endShape();

    p.fill(color);
    p.noStroke();
    p.ellipse(positionVector.x, positionVector.y, 10, 10);
  }
}

export default LissajousCurveFollower