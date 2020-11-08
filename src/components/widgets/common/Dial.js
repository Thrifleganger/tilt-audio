import React, {Component} from 'react';
import PrecisionInputs from 'precision-inputs/common/precision-inputs.fl-controls';
import "precision-inputs/css/precision-inputs.fl-controls.css";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";

class Dial extends Component {
  constructor(props) {
    super(props);
    this.dialRef = React.createRef();
  }

  componentDidMount() {
    const {minValue, maxValue, defaultValue, step} = this.props.model
    this.dial = new PrecisionInputs.FLStandardKnob(this.dialRef.current, {
      min: minValue,
      max: maxValue,
      initial: defaultValue,
      step: step,
      color: this.props.color
    });
    this.dial.addEventListener('change', (event) => {
      this.props.changeCallback(event);
    });
  }

  render() {
    console.log(`Rendering dial ${this.props.model.parameter}`)
    return (
      <div ref={this.dialRef}/>
    );
  }
}

Dial.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parameter: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    defaultValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired
  }),
  changeCallback: PropTypes.func.isRequired
}

export default Dial;