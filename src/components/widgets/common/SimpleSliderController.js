import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import styles from "../../../styles/widgets/SliderContainer.module.css"
import Dial from "../common/Dial";

const SimpleSliderController = (props) => {
  const style = {
    width: "100%",
    overflow: "hidden",
  }
  const {sliders} = props
  return (
    <div style={style}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {sliders.map(slider => (
          <Grid key={slider.sliderModel.id} item xs={3}>
            <Dial model={slider.sliderModel} color={props.color}
                  changeCallback={event => slider.sliderCallback(event.target.value)}/>
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {sliders.map(slider => (
          <Grid className={styles.sliderLabel} key={slider.sliderModel.id} item xs={3}>
            {slider.sliderModel.parameter}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

SimpleSliderController.propTypes = {
  sliders: PropTypes.arrayOf(
    PropTypes.shape({
      sliderModel: PropTypes.object.isRequired,
      sliderCallback: PropTypes.func.isRequired
    })
  ).isRequired
}

export default React.memo(SimpleSliderController);