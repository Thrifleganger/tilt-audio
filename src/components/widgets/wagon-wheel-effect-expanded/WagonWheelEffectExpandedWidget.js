import React, {useEffect, useRef} from 'react';
import p5 from 'p5';
import Grid from '@material-ui/core/Grid';
import SliderModel from "../common/SliderModel";
import styles from "../../../styles/widgets/SliderContainer.module.css"
import Container from "@material-ui/core/Container";
import WidgetHeading from "../common/WidgetHeading";
import {isMobile} from 'react-device-detect';
import SingleSpokedRotaryWheel from "./SingleSpokedRotaryWheel";
import SwitchAndSliderController from "../common/SwitchAndSliderController";
import SmoothedValue from "../common/SmoothedValue";

export default function WagonWheelEffectExpandedWidget(props) {

  const sampleRateSlider = new SliderModel(
    "sample-rate-slider",
    "Sampling Interval",
    56,
    1,
    60,
    1,
    "frames"
  );

  let continuousWheel, sampledWheel, axisY1, axisY2;
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
      continuousWheel = new SingleSpokedRotaryWheel(p, {x: p.width/4, y: p.height/2}, p.height/3,
        p.color(255,255,0), false, sampleRateSlider.defaultValue);
      sampledWheel = new SingleSpokedRotaryWheel(p, {x: p.width*3/4, y: p.height/2}, p.height/3,
        p.color(0,255,255), true, sampleRateSlider.defaultValue);
      axisY1 = new SmoothedValue(p.width/4);
      axisY2 = new SmoothedValue(p.width*3/4);
    }

    p.draw = () => {
      p.background(p.color(10, 23, 38));
      continuousWheel.display();
      sampledWheel.display();
      p.stroke(p.color(250,250,250,80));
      p.strokeWeight(1);
      p.line(0, p.height/2, p.width, p.height/2);
      const x1 = axisY1.getNextValue();
      const x2 = axisY2.getNextValue();
      p.line(x1, 0, x1, p.height);
      p.line(x2, 0, x2, p.height);
    }

    p.windowResized = () => {
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
    }
  }

  const handleSampleRateChange = (newValue) => {
    continuousWheel.setSampleRate(newValue);
    sampledWheel.setSampleRate(newValue);
  }

  const handleOverlap = (value) => {
    const {width, height} = myP5.current;
    if (value) {
      continuousWheel.setPosition({x: width/2, y: height/2});
      sampledWheel.setPosition({x: width/2, y: height/2})
      axisY1.setTargetValue(width/2);
      axisY2.setTargetValue(width/2);
    } else {
      continuousWheel.setPosition({x: width/4, y: height/2});
      sampledWheel.setPosition({x: width*3/4, y: height/2});
      axisY1.setTargetValue(width/4);
      axisY2.setTargetValue(width*3/4);
    }
  }

  const sliderControls = [{
    sliderModel: sampleRateSlider,
    sliderCallback: (value) => handleSampleRateChange(value)
  }];

  const buttonControls = [{
    name: "Overlap Axis",
    isChecked: false,
    buttonCallback: (value) => handleOverlap(value)
  }]

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={props.match} />
      <div className={`${styles.canvasContainer} ${isMobile ? styles.canvasContainerMobile : styles.canvasContainerDesktop}`}>
        <div ref={canvasRef}/>
      </div>
      <div className={styles.sliderContainer}>
        <Container maxWidth="sm">
          <SwitchAndSliderController sliders={sliderControls} buttons={buttonControls} color={"#74F9FF"}/>
        </Container>
      </div>
    </Grid>
  );
}