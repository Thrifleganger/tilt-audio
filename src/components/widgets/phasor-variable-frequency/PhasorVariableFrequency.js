import React, {useEffect, useRef} from 'react';
import {isMobile} from "react-device-detect";
import p5 from 'p5';
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Grid from "@material-ui/core/Grid";
import SliderModel from "../common/SliderModel";
import SinusoidFollower from "../common/sinusoid/SinusoidFollower";
import Container from "@material-ui/core/Container";
import SimpleSliderController from "../common/SimpleSliderController";
import AdditiveSinusoidFollower from "../common/sinusoid/AdditiveSinusoidFollower";
import UnitCircle from "../common/UnitCircle";
import AdditiveUnitCircleWithFollower from "../common/sinusoid/AdditiveUnitCircleWithFollower";

const PhasorVariableFrequency = ({match}) => {

  const amplitudeSlider = new SliderModel(
    "amplitude-slider",
    "Amplitude",
    0.5,
    0,
    1,
    0.01,
  );

  const frequencySlider = new SliderModel(
    "frequency-slider",
    "Frequency",
    12,
    1,
    20,
    1,
    "Hz"
  );

  const speedSlider = new SliderModel(
    "speed-slider",
    "Animation Speed",
    1,
    0,
    2,
    0.01,
  );

  let unitCircle1, unitCircle2, unitCircle3;
  let sineWave1, sineWave2, sineWave3;

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
      console.log("Phasor Introduction canvas setup");
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
      const {height:h, width:w} = p;
      const radius = p.height/10;
      unitCircle1 = new UnitCircle(p, {x: w/6, y: h/8}, radius, 6, p.color(250), p.color(194, 245, 255));
      unitCircle2 = new UnitCircle(p, {x: w/6, y: 3*h/8}, radius * amplitudeSlider.defaultValue, 12, p.color(250), p.color(255, 181, 181));
      unitCircle3 = new AdditiveUnitCircleWithFollower(p, {x: w/6, y: 3*h/4}, radius, 6, p.color(250), p.color(255, 251, 194));
      sineWave1 = new SinusoidFollower(p, {x: w/3, y: h/8}, 6, radius, 0.0, p.color(194, 245, 255), false);
      sineWave2 = new SinusoidFollower(p, {x: w/3, y: 3*h/8}, 12, radius * amplitudeSlider.defaultValue, 0.0, p.color(255, 181, 181), false);
      sineWave3 = new AdditiveSinusoidFollower(p, {x: w/3, y: 3*h/4}, 6, radius, 0.0, p.color(255, 251, 194), false);
      sineWave3.addPartial(sineWave1);
      sineWave3.addPartial(sineWave2);
      unitCircle3.addPartial(unitCircle1);
      unitCircle3.addPartial(unitCircle2);
    }

    p.draw = () => {
      const {height:h, width:w} = p;

      p.background(p.color(10, 23, 38));
      unitCircle1.display();
      unitCircle2.display();
      unitCircle3.display();
      sineWave1.display();
      sineWave2.display();
      sineWave3.display();

      p.noFill();
      p.strokeWeight(2);
      p.stroke(250,250,250,50);
      p.line(0, h/8, w, h/8);
      p.line(0, 3*h/8, w, 3*h/8);
      p.line(0, 3*h/4, w, 3*h/4);
      p.line(w/6, 0, w/6, h);
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
    const amp = myP5.current.height/10 * newValue;
    unitCircle2.setAmplitude(amp);
    sineWave2.setAmplitude(amp);
  }

  const handleFrequencyChange = (newValue) => {
    const value = parseInt(newValue);
    unitCircle2.setFrequency(value);
    sineWave2.setFrequency(value);

    unitCircle1.resetPhase();
    unitCircle2.resetPhase();
    unitCircle3.resetPhase();
    sineWave1.resetPhase();
    sineWave2.resetPhase();
    sineWave3.resetPhase();
  }

  const handleSpeedChange = (newValue) => {
    unitCircle1.setSpeed(newValue);
    unitCircle2.setSpeed(newValue);
    sineWave1.setSpeed(newValue);
    sineWave2.setSpeed(newValue);
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
          <SimpleSliderController sliders={controls} color={"#ffb5b5"}/>
        </Container>
      </div>
    </Grid>
  );
}

export default PhasorVariableFrequency;