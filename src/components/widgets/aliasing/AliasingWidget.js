import React, {useEffect, useRef} from 'react';
import p5 from 'p5';
import Grid from '@material-ui/core/Grid';
import SineWave from "../common/SineWave";
import SampleEmitter from "./SampleEmitter";
import SliderModel from "../common/SliderModel";
import styles from "../../../styles/widgets/SliderContainer.module.css"
import Container from "@material-ui/core/Container";
import WidgetHeading from "../common/WidgetHeading";
import SimpleSliderController from "../common/SimpleSliderController";

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
    1
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
    0.01
  );

  let myP5;
  let sineWave;
  let ghostSineWave;
  let sampleEmitter;
  const canvasRef = useRef(null);

  useEffect(() => {
    myP5 = new p5(sketch, canvasRef.current);
  }, [myP5])

  const sketch = (p) => {
    p.setup = () => {
      console.log("Aliasing canvas setup");
      p.createCanvas(canvasRef.current.clientWidth, 500);
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
      p.resizeCanvas(canvasRef.current.clientWidth, 500);
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
      <div className={styles.canvasContainer}>
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