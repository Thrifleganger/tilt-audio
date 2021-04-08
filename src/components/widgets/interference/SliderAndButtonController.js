import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import styles from "../../../styles/widgets/SliderContainer.module.css"
import Dial from "../common/custom-component/Dial";
import FormGroup from "@material-ui/core/FormGroup";
import ToggleButton from "../common/custom-component/ToggleButton";

const SliderAndButtonController = (props) => {

  const {sliders, buttons} = props;
  const style = {
    width: "100%"
  }

  return (
    <Grid container justify={"center"} alignItems={"center"} style={style}>
      <Grid item xs={6} >
        <FormGroup>
          {buttons.map(button => (
            <ToggleButton key={button.id} button={button}/>
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

SliderAndButtonController.propTypes = {
  sliders: PropTypes.arrayOf(
    PropTypes.shape({
      sliderModel: PropTypes.object.isRequired,
      sliderCallback: PropTypes.func.isRequired
    })
  ).isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nameSelected: PropTypes.string.isRequired,
      nameDeselected: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired,
      buttonCallback: PropTypes.func.isRequired
    })
  ).isRequired
}

export default React.memo(SliderAndButtonController);