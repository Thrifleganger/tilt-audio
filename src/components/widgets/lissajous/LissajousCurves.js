import React, {useEffect, useRef} from 'react';
import {isMobile} from "react-device-detect";
import p5 from 'p5';
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Grid from "@material-ui/core/Grid";
import SliderModel from "../common/SliderModel";
import Container from "@material-ui/core/Container";
import SimpleSliderController from "../common/SimpleSliderController";
import LissajousUnitCircle from "./LissajousUnitCircle";
import LissajousCurveFollower from "./LissajousCurveFollower";

const LissajousCurves = ({match}) => {

  const amplitudeSlider = new SliderModel(
    "amplitude-slider",
    "Amplitude",
    1,
    0,
    1,
    0.01,
  );

  const frequencySlider = new SliderModel(
    "frequency-slider",
    "Frequency",
    6,
    2,
    24,
    0.01,
  );

  const phaseSlider = new SliderModel(
    "phase-slider",
    "Phase",
    0,
    -1,
    1,
    0.01,
    "π"
  );

  const speedSlider = new SliderModel(
    "speed-slider",
    "Animation Speed",
    1,
    0,
    1,
    0.01,
  );

  let unitCircle1, unitCircle2, curveFollower;

  const canvasRef = useRef(null);
  let myP5 = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    myP5.current = new p5(sketch, canvasRef.current);
    return function cleanup() {
      myP5.current.remove();
    }
  }, [])

  const sketch = (p) => {
    p.setup = () => {
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 600);
      }
      const {height:h, width:w} = p;
      const radius = p.height/8;
      unitCircle1 = new LissajousUnitCircle(p, {x: w/6, y: h/6}, radius, 6, p.color(250), p.color(194, 245, 255));
      unitCircle2 = new LissajousUnitCircle(p, {x: 5*w/6, y: 4*h/6}, radius, 6, p.color(250), p.color(255, 181, 181));
      curveFollower = new LissajousCurveFollower(p, p.color(255, 181, 181));
    }

    p.draw = () => {
      const {height:h, width:w} = p;

      p.background(p.color(10, 23, 38));
      unitCircle1.display();
      unitCircle2.display();

      p.noFill();
      p.strokeWeight(2);
      p.stroke(250,250,250,50);
      p.line(0, h/6, w, h/6);
      p.line(0, 4*h/6, w, 4*h/6);
      p.line(w/6, 0, w/6, h);
      p.line(5*w/6, 0, 5*w/6, h);

      p.line(unitCircle1.radiusPosition.x, unitCircle1.radiusPosition.y, unitCircle2.radiusPosition.x, unitCircle1.radiusPosition.y);
      p.line(unitCircle2.radiusPosition.x, unitCircle2.radiusPosition.y, unitCircle2.radiusPosition.x, unitCircle1.radiusPosition.y);

      curveFollower.display({ x: unitCircle2.radiusPosition.x, y: unitCircle1.radiusPosition.y });
    }

    p.windowResized = () => {
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 600);
      }
    }
  }

  const handleAmplitudeChange = (newValue) => {
    const amp = myP5.current.height/10 * newValue;
    unitCircle2.setAmplitude(amp);
  }

  const handlePhaseChange = (newValue) => {
    const value = parseFloat(newValue);
    unitCircle2.setPhase(value);
  }

  const handleFrequencyChange = (newValue) => {
    const value = parseFloat(newValue);
    unitCircle2.setFrequency(value);
  }

  const handleSpeedChange = (newValue) => {
    unitCircle1.setSpeed(newValue);
    unitCircle2.setSpeed(newValue);
  }

  const controls = [{
    sliderModel: amplitudeSlider,
    sliderCallback: (value) => handleAmplitudeChange(value)
  }, {
    sliderModel: phaseSlider,
    sliderCallback: (value) => handlePhaseChange(value)
  }, {
    sliderModel: frequencySlider,
    sliderCallback: (value) => handleFrequencyChange(value)
  },{
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
          <SimpleSliderController sliders={controls} color={"#ffb5b5"}/>
        </Container>
      </div>
    </Grid>
  );
}

export default LissajousCurves;