import React, {useEffect, useRef} from "react";
import p5 from 'p5';
import Grid from "@material-ui/core/Grid";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import WidgetHeading from "../common/WidgetHeading";
import SineCosineUnitCircle from "./SineCosineUnitCircle";
import SinusoidFollower from "../common/sinusoid/SinusoidFollower";
import SliderModel from "../common/SliderModel";
import Container from "@material-ui/core/Container";
import SimpleSliderController from "../common/SimpleSliderController";
import {isMobile} from 'react-device-detect';

const SineCosineWidget = ({match}) => {

  const amplitudeSlider = new SliderModel(
    "amplitude-slider",
    "Amplitude",
    1,
    0,
    1,
    0.01
  );

  const frequencySlider = new SliderModel(
    "frequency-slider",
    "Frequency",
    6,
    1,
    14,
    1,
    "Hz"
  );

  const speedSlider = new SliderModel(
    "speed-slider",
    "Animation Speed",
    1,
    0.25,
    5,
    0.01
  );

  let myP5;
  let unitCircle;
  let sineFollower;
  let cosFollower;

  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    myP5 = new p5(sketch, canvasRef.current);
    return function cleanup() {
      myP5.remove();
    }
  }, [])

  const sketch = (p) => {
    p.setup = () => {
      console.log("Sine function canvas setup");
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
      const radius = p.width/10;
      const unitCircleXY = {x: p.width/16 + radius, y: p.width/16 + radius};
      const sineXY = {x: p.width/5 + radius, y: p.width/16 + radius};
      const cosXY = {x: p.width/16 + radius, y: p.width/5 + radius};
      unitCircle = new SineCosineUnitCircle(p, unitCircleXY, radius, frequencySlider.defaultValue);
      sineFollower = new SinusoidFollower(p, sineXY, frequencySlider.defaultValue, radius, 0.0, p.color(197, 255, 116), false);
      cosFollower = new SinusoidFollower(p, cosXY, frequencySlider.defaultValue, radius, Math.PI*3/2, p.color(226, 166, 255), true);
    }

    p.draw = () => {
      p.background(p.color(10, 23, 38));
      unitCircle.display();
      sineFollower.display();
      cosFollower.display();
    }

    p.windowResized = () => {
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
    }
  }

  const handleAmplitudeChange = (newValue) => {
    const amp = myP5.width/10 * newValue;
    unitCircle.setAmplitude(amp);
    sineFollower.setAmplitude(amp);
    cosFollower.setAmplitude(amp);
  }

  const handleFrequencyChange = (newValue) => {
    unitCircle.setFrequency(newValue);
    sineFollower.setFrequency(newValue);
    cosFollower.setFrequency(newValue);
  }

  const handleSpeedChange = (newValue) => {
    const value = parseFloat(newValue);
    unitCircle.setSpeed(value);
    sineFollower.setSpeed(value);
    cosFollower.setSpeed(value);
  }

  const controls = [{
    sliderModel: amplitudeSlider,
    sliderCallback: (value) => handleAmplitudeChange(value)
  }, {
    sliderModel: frequencySlider,
    sliderCallback: (value) => handleFrequencyChange(value)
  }, {
    sliderModel: speedSlider,
    sliderCallback: (value) => handleSpeedChange(value)
  }];

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match} />
      <div className={`${styles.canvasContainer} ${isMobile ? styles.canvasContainerMobile : styles.canvasContainerDesktop}`}>
        <div ref={canvasRef}/>
      </div>
      <div className={styles.sliderContainer}>
        <Container maxWidth="sm">
          <SimpleSliderController sliders={controls} color={"#c5ff74"}/>
        </Container>
      </div>
    </Grid>
  );
}

export default SineCosineWidget;