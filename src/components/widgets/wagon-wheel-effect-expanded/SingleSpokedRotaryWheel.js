import SmoothedValue from "../common/SmoothedValue";

class SingleSpokedRotaryWheel {
  constructor(p5, position = {x:0, y:0}, radius = 10, color, isSampled = false, sampleRate = 12) {
    this.p5 = p5;
    this.positionX = new SmoothedValue(position.x);
    this.positionY = new SmoothedValue(position.y);
    this.radius = radius;
    this.color = color;
    this.speed = 6;
    this.continuousPhase = 0;
    this.sampledPhase = 0;
    this.nextPhase = 0;
    this.isSampled = isSampled;
    this.sampleRate = sampleRate;
    p5.frameRate(60);
    p5.angleMode(p5.DEGREES);
  }

  display() {
    const {p5, radius} = this;
    const x = this.positionX.getNextValue();
    const y = this.positionY.getNextValue();

    p5.push();
    p5.translate(x, y);
    this.rotate();

    p5.noFill();
    p5.stroke(p5.color(255,255,255,100));
    p5.strokeWeight(2);
    p5.circle(0, 0, radius * 2);

    p5.stroke(this.color);
    p5.strokeWeight(4);
    p5.line(0, 0, 0, -radius);
    p5.pop();

    p5.push();
    p5.translate(x, y);
    p5.noFill();
    p5.stroke(p5.color(255,255,255,200));
    p5.strokeWeight(10);
    if (this.isSampled) {
      p5.arc(0, 0, radius * 2, radius * 2, this.sampledPhase - 90, this.continuousPhase - 90);
    } else {
      p5.arc(0, 0, radius * 2, radius * 2, this.sampledPhase - 90, this.nextPhase - 90);
    }
    p5.pop();
  }

  rotate() {
    const {p5, speed, isSampled, sampleRate} = this;
    this.continuousPhase += speed;
    if (p5.frameCount % sampleRate === 0) {
       this.sampledPhase = this.continuousPhase;
       this.nextPhase = this.sampledPhase + speed * sampleRate;
    }
    p5.rotate(isSampled ? this.sampledPhase : this.continuousPhase);
  }

  setSampleRate(value) {
    this.sampleRate = parseInt(value);
  }

  setPosition(value) {
    this.positionX.setTargetValue(value.x);
    this.positionY.setTargetValue(value.y);
  }
}

export default SingleSpokedRotaryWheel;