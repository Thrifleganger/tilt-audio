class SmoothedValue {
  constructor(initialValue, easing = 0.2) {
    this.current = initialValue;
    this.target = initialValue;
    this.easing = easing;
  }

  setTargetValue(targetValue) {
    this.target = targetValue;
  }

  getNextValue() {
    const {current, target, easing} = this;
    if (current === target) {
      return current;
    }
    let diff = target - current;
    this.current = current + (diff * easing);
    return this.current;
  }
}

export default SmoothedValue;