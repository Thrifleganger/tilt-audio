import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import styles from "../../../styles/widgets/SliderContainer.module.css"
import Dial from "../common/custom-component/Dial";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const SinusoidalMotion2DController = (props) => {

  const {sliders, buttons} = props;
  const map = new Map();
  buttons.forEach(button => map.set(button.name, button.isChecked));
  const [buttonStates, setButtonStates] = useState(map);
  const style = {
    width: "100%",
  }

  const handleButtonClick = (value, id, callback) => {
    const map = new Map(buttonStates);
    map.set(id, value);
    setButtonStates(map);
    callback(value);
  }
  return (
    <Grid container justify={"center"} alignItems={"center"} style={style}>
      <Grid item xs={6} >
        <FormGroup>
          {buttons.map(button => (
            <FormControlLabel key={button.name}
                              control={<Switch checked={buttonStates.get(button.name)}
                                               onChange={event => handleButtonClick(event.target.checked, button.name, button.buttonCallback)}/>}
                              label={button.name}/>
          ))}
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          {sliders.map(slider => (
            <Grid key={slider.sliderModel.id} item xs={6}>
              <Dial model={slider.sliderModel} color={props.color}
                    changeCallback={event => slider.sliderCallback(event.target.value)}/>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={2}>
          {sliders.map(slider => (
            <Grid className={styles.sliderLabel} key={slider.sliderModel.id} item xs={6}>
              {slider.sliderModel.parameter}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

SinusoidalMotion2DController.propTypes = {
  sliders: PropTypes.arrayOf(
    PropTypes.shape({
      sliderModel: PropTypes.object.isRequired,
      sliderCallback: PropTypes.func.isRequired
    })
  ).isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired,
      buttonCallback: PropTypes.func.isRequired
    })
  ).isRequired
}

export default React.memo(SinusoidalMotion2DController);