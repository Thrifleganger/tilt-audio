import React, {useEffect, useRef} from 'react';
import {isMobile} from "react-device-detect";
import p5 from 'p5';
import SineWave from "../common/sinusoid/SineWave";
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SliderModel from "../common/SliderModel";
import AdditiveSineWave from "../common/sinusoid/AdditiveSineWave";
import SinusoidInterferencePlayer from "./SinusoidInterferencePlayer";
import SliderAndButtonController from "./SliderAndButtonController";

const SinusoidInterferenceWidget = ({match}) => {

  const amplitudeSlider = new SliderModel(
    "amplitude-slider",
    "Amplitude",
    1,
    0,
    1,
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


  let sineWave1, sineWave2, additiveSineWave, player;
  const canvasRef = useRef(null);
  const myP5 = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    myP5.current = new p5(sketch, canvasRef.current);
    return function cleanup() {
      myP5.current.remove();
      player.dispose();
    }
  }, []);

  const sketch = (p) => {
    p.setup = () => {
      console.log("Sine wave canvas setup");
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
      sineWave1 = new SineWave(p, {x: 0, y: p.height/8}, {x: p.width, y: p.height/5},
        1.0 , 6, 0, p.color(238, 191, 255));
      sineWave2 = new SineWave(p, {x: 0, y: p.height*3/8}, {x: p.width, y: p.height/5},
        amplitudeSlider.defaultValue , 6, 0, p.color(179, 181, 255));
      additiveSineWave = new AdditiveSineWave(p, {x: 0, y: p.height * 3/4}, {x: p.width, y: p.height/5},
        amplitudeSlider.defaultValue , 6, 0, p.color(255, 230, 191), 2);
      additiveSineWave.addPartial(sineWave1);
      additiveSineWave.addPartial(sineWave2);
      player = new SinusoidInterferencePlayer();
    }

    p.draw = () => {
      p.background(p.color(10, 23, 38));
      sineWave1.display();
      sineWave2.display();
      additiveSineWave.display();
      p.stroke(p.color(200,200,200,80));
      p.strokeWeight(2);
      p.line(0, p.height/8, p.width, p.height/8);
      p.line(0, p.height*3/8, p.width, p.height*3/8);
      p.line(0, p.height*3/4, p.width, p.height*3/4);
    }

    p.windowResized = () => {
      if (isMobile) {
        p.createCanvas(canvasRef.current.clientWidth, 300);
      } else {
        p.createCanvas(canvasRef.current.clientWidth, 500);
      }
    }
  }

  const controls = [{
    sliderModel: amplitudeSlider,
    sliderCallback: (value) => {sineWave2.setAmplitude(value); player.setAmplitude(value);}
  }, {
    sliderModel: phaseSlider,
    sliderCallback: (value) => {sineWave2.setPhase(value); player.setPhase(value); }
  }];

  console.log("Rendering...")

  const buttons = [{
    id: "play",
    nameSelected: "Stop Audio",
    nameDeselected: "Play Audio",
    isChecked: false,
    buttonCallback: () => {player.isPlaying ? player.stopAudio() : player.startAudio()}
  }]

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match} />
      <div className={`${styles.canvasContainer} ${isMobile ? styles.canvasContainerMobile : styles.canvasContainerDesktop}`}>
        <div ref={canvasRef}/>
      </div>
      <div className={styles.sliderContainer}>
        <Container maxWidth="sm">
          <SliderAndButtonController sliders={controls} buttons={buttons} color={"#ffe6bf"}/>
        </Container>
      </div>
    </Grid>
  );
}

export default SinusoidInterferenceWidget;