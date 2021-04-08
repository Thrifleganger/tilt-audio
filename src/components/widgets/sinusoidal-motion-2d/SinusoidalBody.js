import {v4 as uuid} from 'uuid'

export class SinusoidalBody {

  constructor(p, position = {x:0,y:0}, frequency = 1, width = 100, amplitude = 1,
              phaseDifference = 0, moveAlongXAxis = true, moveAlongYAxis = true, moveAlongZAxis = false) {
    this.p = p;
    this.initialPosition = p.createVector(position.x, position.y);
    this.currentPosition = p.createVector(position.x, position.y);
    this.frequency = frequency;
    this.moveAlongXAxis = moveAlongXAxis;
    this.moveAlongYAxis = moveAlongYAxis;
    this.moveAlongZAxis = moveAlongZAxis;
    this.width = width;
    this.amplitude = amplitude;
    this.phaseDifference = phaseDifference;
    this.size = 20;
    this.phase = 0.0;
    this.offset = 2 * Math.PI * frequency / width;

    this.trailDots = new Map();
    setInterval(() => {
      const dotId = uuid();
      this.trailDots.set(dotId, new Dot(p, dotId, {x:this.currentPosition.x,y:this.currentPosition.y}, p.color(255), this.handleDotDestruction));
    }, 5)
  }

  display() {
    const {p, currentPosition, trailDots} = this;
    p.noStroke();
    p.fill(255);
    this.updatePosition();
    p.ellipse(currentPosition.x, currentPosition.y, this.size, this.size);
    trailDots.forEach(dot => dot.display());
  }

  updatePosition() {
    const {moveAlongXAxis, moveAlongYAxis, moveAlongZAxis, amplitude, initialPosition, phaseDifference, offset} = this;
    if (moveAlongXAxis) {
      this.currentPosition.x = initialPosition.x + Math.sin(this.phase) * amplitude;
    }
    if (moveAlongYAxis) {
      this.currentPosition.y = initialPosition.y +  Math.sin(this.phase + phaseDifference) * amplitude;
    }
    if (moveAlongZAxis) {
      this.size = this.p.map(Math.sin(this.phase + phaseDifference), -1, 1, 10, 50);
    }
    this.phase += offset;
  }

  handleDotDestruction = (dot) => {
    this.trailDots.delete(dot.id);
    dot = null;
  }

  setPhaseOffset(value) {
    this.phaseDifference = parseFloat(value);
  }

  setFrequency(value) {
    this.frequency = value;
    this.offset = 2 * Math.PI * value / this.width;
  }

  handleXAxisMotionToggle(value) {
    this.moveAlongXAxis = value;
  }

  handleYAxisMotionToggle(value) {
    this.moveAlongYAxis = value;
  }

  handleZAxisMotionToggle(value) {
    this.moveAlongZAxis = value;
  }
}

class Dot {
  constructor(p, id, position, color, destructionCallback) {
    this.p = p;
    this.id = id;
    this.position = position;
    this.color = color;
    this.opacity = 100;
    this.difference = 1;
    this.destructionCallback = destructionCallback;
  }

  display() {
    const {x,y} = this.position;
    const {p, color} = this;
    p.noStroke()
    p.fill(p.color(
      p.red(color),
      p.green(color),
      p.blue(color),
      this.opacity)
    );
    p.ellipse(x, y, 3, 3);
    this.opacity -= this.difference;
    if (this.opacity < 0) {
      this.destructionCallback(this);
    }
  }
}