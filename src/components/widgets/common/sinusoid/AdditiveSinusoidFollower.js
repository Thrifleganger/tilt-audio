import SinusoidFollower from "./SinusoidFollower";

class AdditiveSinusoidFollower extends SinusoidFollower{
  constructor(
    p,
    startingPosition = {x:0,y:0},
    frequency = 1,
    amplitude = 1,
    initialPhase = 0.0,
    color = p.color(255),
    isFlipped = false
  ) {
    super(p, startingPosition, frequency, amplitude, initialPhase, color, isFlipped);
    this.partials = []
  }

  addPartial(sineWave = new SinusoidFollower()) {
    this.partials.push({
      instance: sineWave,
      phase: 0.0
    });
  }

  updatePerSample() {
    const value = this.partials.map(partial => Math.sin(partial.phase - partial.instance.additionalPhase) * partial.instance.amplitude)
      .reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    this.partials.forEach(partial => partial.phase += partial.instance.offset);
    return value;
  }

  updatePerWave() {
    this.partials.forEach(partial => partial.phase -= partial.instance.offset * partial.instance.speed);
  }

  resetPhase = () => {
    this.partials.forEach(partial => {
      partial.phase = 0.0;
    })
  }
}

export default AdditiveSinusoidFollower;