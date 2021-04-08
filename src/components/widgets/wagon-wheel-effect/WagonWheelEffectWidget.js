import React, {useEffect, useRef} from 'react';
import p5 from 'p5';
import Grid from '@material-ui/core/Grid';
import SliderModel from "../common/SliderModel";
import styles from "../../../styles/widgets/SliderContainer.module.css"
import Container from "@material-ui/core/Container";
import WidgetHeading from "../common/WidgetHeading";
import SimpleSliderController from "../common/SimpleSliderController";
import {isMobile} from 'react-device-detect';
import RotaryWheel from "./RotaryWheel";

export default function WagonWheelEffectWidget(props) {

  const spokeCounterSlider = new SliderModel(
    "spoke-counter-slider",
    "Spoke Count",
    4,
    1,
    20,
    1
  );

  const speedSlider = new SliderModel(
    "speed-slider",
    "Speed",
    5,
    1,
    360,
    1,
    "degrees of rotation per frame"
  );

  const frameRateSlider = new SliderModel(
    "frame-rate-slider",
    "Frame Rate",
    24,
    12,
    120,
    1,
    "fps"
  );

  let rotaryWheel;
  const canvasRef = useRef(null);
  const myP5 = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    myP5.current = new p5(sketch, canvasRef.current);
    return function cleanup() {
      myP5.current.remove();
    }
  }, [])

  const sketch = (p) => {
    p.setup = () => {
      console.log("Wagon Wheel Effect canvas setup");
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
      rotaryWheel = new RotaryWheel(p, {x: p.width/2, y: p.height/2}, p.height/3,
        speedSlider.defaultValue, spokeCounterSlider.defaultValue);
    }

    p.draw = () => {
      p.background(p.color(10, 23, 38));
      rotaryWheel.display();
    }

    p.windowResized = () => {
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
    }
  }

  const handleSpokeCounterChange = (newValue) => {
    rotaryWheel.setNumberOfSpokes(newValue);
  }

  const handleSpeedChange = (newValue) => {
    rotaryWheel.setSpeed(newValue);
  }

  const handleFrameRateChange = (newValue) => {
    rotaryWheel.setFrameRate(newValue);
  }

  const controls = [{
    sliderModel: spokeCounterSlider,
    sliderCallback: (value) => handleSpokeCounterChange(value)
  }, {
    sliderModel: speedSlider,
    sliderCallback: (value) => handleSpeedChange(value)
  }, {
    sliderModel: frameRateSlider,
    sliderCallback: (value) => handleFrameRateChange(value)
  }];


  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={props.match} />
      <div className={`${styles.canvasContainer} ${isMobile ? styles.canvasContainerMobile : styles.canvasContainerDesktop}`}>
        <div ref={canvasRef}/>
      </div>
      <div className={styles.sliderContainer}>
        <Container maxWidth="sm">
          <SimpleSliderController sliders={controls} color={"#74F9FF"}/>
        </Container>
      </div>
    </Grid>
  );
}