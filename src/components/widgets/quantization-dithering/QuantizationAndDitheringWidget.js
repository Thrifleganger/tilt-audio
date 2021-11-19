import SliderModel from "../common/SliderModel";
import React, {useEffect, useRef} from "react";
import p5 from 'p5';
import Grid from "@material-ui/core/Grid";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Container from "@material-ui/core/Container";
import SineWave from "../common/sinusoid/SineWave";
import WidgetHeading from "../common/WidgetHeading";
import SimpleSliderController from "../common/SimpleSliderController";
import {isMobile} from 'react-device-detect';
import {pow} from "mathjs";
import QuantizedSineWave from "../common/sinusoid/QuantizedSineWave";

const QuantizationAndDitheringWidget = ({match}) => {

  const amplitudeSlider = new SliderModel(
    "amplitude-slider",
    "Amplitude",
    1.0,
    0,
    1,
    0.01,
  );

  const bitDepthSlider = new SliderModel(
    "bitdepth-slider",
    "Bit Depth",
    4,
    2,
    6,
    1
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

  const offsetSlider = new SliderModel(
    "offset-slider",
    "Offset",
    0,
    -0.5,
    0.5,
    0.01
  );

  let myP5;
  let quantizedSineWave, sineWave;
  let bitDepth = bitDepthSlider.defaultValue;
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
      sineWave = new SineWave(p, {x: 0, y: p.height/2}, {x: p.width, y: p.height},
        amplitudeSlider.defaultValue, 1, 0, p.color(255, 255, 166));
      quantizedSineWave = new QuantizedSineWave(p, {x: 0, y: p.height/2}, {x: p.width, y: p.height},
        amplitudeSlider.defaultValue, 1, 4, 0, p.color(255, 166, 166));
    }

    p.draw = () => {
      p.background(p.color(10, 23, 38));
      quantizedSineWave.display();
      sineWave.display();

      p.stroke(p.color(200,200,200,80));
      p.strokeWeight(2);
      p.line(0, p.height/2, p.width, p.height/2);

      p.drawingContext.setLineDash([5, 10]);
      const numberOfLevels = pow(2, bitDepth);
      const heightDifference = p.height / numberOfLevels;
      for (let i = 1; i <= numberOfLevels; i++) {
        p.line(0, i * heightDifference, p.width, i * heightDifference);
      }
      p.drawingContext.setLineDash([]);
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
    quantizedSineWave.setAmplitude(newValue);
  }

  const handleBitDepthChange = (newValue) => {
    bitDepth = newValue;
    quantizedSineWave.setBitDepth(newValue);
  }

  const handlePhaseChange = (newValue) => {
    const value = parseFloat(newValue);
    sineWave.setPhase(value);
    quantizedSineWave.setPhase(value);
  }

  const handleOffsetChange = (newValue) => {
    sineWave.setHeightOffset(newValue);
    quantizedSineWave.setHeightOffset(newValue);
  }

  const controls = [{
    sliderModel: amplitudeSlider,
    sliderCallback: (value) => handleAmplitudeChange(value)
  }, {
    sliderModel: bitDepthSlider,
    sliderCallback: (value) => handleBitDepthChange(value)
  }, {
    sliderModel: phaseSlider,
    sliderCallback: (value) => handlePhaseChange(value)
  }, {
    sliderModel: offsetSlider,
    sliderCallback: (value) => handleOffsetChange(value)
  }];

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match} />
      <div className={`${styles.canvasContainer} ${isMobile ? styles.canvasContainerMobile : styles.canvasContainerDesktop}`}>
        <div ref={canvasRef}/>
      </div>
      <div className={styles.sliderContainer}>
        <Container maxWidth="sm">
          <SimpleSliderController sliders={controls} color={"#ffa6a6"}/>
        </Container>
      </div>
    </Grid>
  );
}

export default QuantizationAndDitheringWidget;