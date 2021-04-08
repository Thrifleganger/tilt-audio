import React, {useEffect, useRef} from 'react';
import p5 from 'p5';
import Grid from '@material-ui/core/Grid';
import SineWave from "../common/sinusoid/SineWave";
import SampleEmitter from "./SampleEmitter";
import SliderModel from "../common/SliderModel";
import styles from "../../../styles/widgets/SliderContainer.module.css"
import Container from "@material-ui/core/Container";
import WidgetHeading from "../common/WidgetHeading";
import SimpleSliderController from "../common/SimpleSliderController";
import {isMobile} from 'react-device-detect';

export default function AliasingWidget(props) {

  const amplitudeSlider = new SliderModel(
    "amplitude-slider",
    "Amplitude",
    0.7,
    0,
    1,
    0.01
  );

  const frequencySlider = new SliderModel(
    "frequency-slider",
    "Frequency",
    1,
    1,
    6,
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

  const samplingIntervalSlider = new SliderModel(
    "sampling-interval-slider",
    "Sampling Interval",
    0.5,
    0.2,
    2,
    0.01,
    "sec"
  );

  let sineWave;
  let ghostSineWave;
  let sampleEmitter;
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
      console.log("Aliasing canvas setup");
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
      sineWave = new SineWave(p, {x: 0, y: p.height/2}, {x: p.width/2.0, y: p.height},
        amplitudeSlider.defaultValue, frequencySlider.defaultValue, speedSlider.defaultValue, p.color(116, 249, 255));
      ghostSineWave = new SineWave(p, {x: p.width/2, y: p.height/2}, {x: p.width/2.0, y: p.height},
        amplitudeSlider.defaultValue, frequencySlider.defaultValue, speedSlider.defaultValue, p.color(116, 249, 255, 60));
      sampleEmitter = new SampleEmitter(p, {x: p.width, y: p.height},
        amplitudeSlider.defaultValue, frequencySlider.defaultValue, speedSlider.defaultValue);
    }

    p.draw = () => {
      p.background(p.color(10, 23, 38));
      sineWave.display();
      ghostSineWave.display();
      sampleEmitter.display();
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
    sineWave.setAmplitude(newValue);
    ghostSineWave.setAmplitude(newValue);
    sampleEmitter.setAmplitude(newValue);
  }

  const handleFrequencyChange = (newValue) => {
    sineWave.setFrequency(newValue);
    ghostSineWave.setFrequency(newValue);
    sampleEmitter.setFrequency(newValue);
  }

  const handleSpeedChange = (newValue) => {
    const value = parseFloat(newValue);
    sineWave.setSpeed(value);
    ghostSineWave.setSpeed(value);
    sampleEmitter.setSpeed(value);
  }

  const handleSamplingIntervalChange = (newValue) => {
    sampleEmitter.setSamplingInterval(newValue);
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
  }, {
    sliderModel: samplingIntervalSlider,
    sliderCallback: (value) => handleSamplingIntervalChange(value)
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