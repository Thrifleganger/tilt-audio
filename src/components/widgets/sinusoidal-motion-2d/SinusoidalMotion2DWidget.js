import React, {useEffect, useRef} from 'react';
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import {isMobile} from "react-device-detect";
import Grid from "@material-ui/core/Grid";
import p5 from 'p5';
import {SinusoidalBody} from "./SinusoidalBody";
import SliderModel from "../common/SliderModel";
import Container from "@material-ui/core/Container";
import SwitchAndSliderController from "../common/SwitchAndSliderController";

const SinusoidalMotion2DWidget = ({match}) => {

  const phaseOffsetSlider = new SliderModel(
    "phase-slider",
    "Phase Offset",
    Math.PI/2,
    -Math.PI/2,
    Math.PI/2,
    0.01,
    "π"
  );

  const frequencySlider = new SliderModel(
    "frequency-slider",
    "Frequency",
    5,
    2,
    15,
    0.1,
    "Hz"
  );

  let myP5;
  let sinusoidalBody;
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
      console.log("Sine wave canvas setup");
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
      sinusoidalBody = new SinusoidalBody(p, {x:p.width/2,y:p.height/2}, 6, p.width, 100, Math.PI/2, true, true);
    }

    p.draw = () => {
      p.background(p.color(10, 23, 38));
      sinusoidalBody.display();
    }

    p.windowResized = () => {
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
    }
  }


  const sliderControls = [{
    sliderModel: phaseOffsetSlider,
    sliderCallback: (value) => sinusoidalBody.setPhaseOffset(value)
  }, {
    sliderModel: frequencySlider,
    sliderCallback: (value) => sinusoidalBody.setFrequency(value)
  }]

  const buttonControls = [{
    name: "Motion along X-Axis",
    isChecked: true,
    buttonCallback: (value) => sinusoidalBody.handleXAxisMotionToggle(value)
  }, {
    name: "Motion along Y-Axis",
    isChecked: true,
    buttonCallback: (value) => sinusoidalBody.handleYAxisMotionToggle(value)
  }, {
    name: "Motion along Z-Axis",
    isChecked: false,
    buttonCallback: (value) => sinusoidalBody.handleZAxisMotionToggle(value)
  }]

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match}/>
      <div
        className={`${styles.canvasContainer} ${isMobile ? styles.canvasContainerMobile : styles.canvasContainerDesktop}`}>
        <div ref={canvasRef}/>
      </div>
      <div className={styles.sliderContainer}>
        <Container maxWidth="sm">
          <SwitchAndSliderController sliders={sliderControls} buttons={buttonControls} color={"#ffa6a6"}/>
        </Container>
      </div>
    </Grid>
  );
}

export default SinusoidalMotion2DWidget;