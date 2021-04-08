export default class SliderModel {
  constructor(id, parameter, defaultValue, minValue, maxValue, step, prefix = "") {
    this.id = id;
    this.parameter = parameter;
    this.defaultValue = defaultValue;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
    this.prefix = prefix
  }
}