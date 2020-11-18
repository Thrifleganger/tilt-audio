import SineWave from "./SineWave";

class AdditiveSineWave extends SineWave {

  constructor(
    p5,
    startingPosition = {x: 0, y: 0},
    dimensions = {x:0, y:0},
    amplitude = 0.7,
    frequency = 1,
    speed = 1,
    color = null
  ) {
    super(p5, startingPosition, dimensions, amplitude, frequency, speed, color);
    this.partials = []
  }

  addPartial(sineWave = new SineWave()) {
    this.partials.push({
      instance: sineWave,
      phase: 0.0
    });
  }

  update() {
    const value = this.partials.map(partial => Math.sin(partial.phase + partial.instance.additionalPhase) * partial.instance.amplitude)
      .reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    this.partials.forEach(partial => partial.phase += partial.instance.offset);
    return value * (this.dimensions.y/2);
  }
}

export default AdditiveSineWave;