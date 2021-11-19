import React, {useEffect, useRef, useState} from 'react';
import p5 from 'p5';
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Grid from "@material-ui/core/Grid";
import SliderModel from "../common/SliderModel";
import Container from "@material-ui/core/Container";
import SimpleSliderController from "../common/SimpleSliderController";
import LissajousUnitCircle from "./LissajousUnitCircle";
import LissajousCurveFollower from "./LissajousCurveFollower";

const LissajousCurvesConsolidated = ({match}) => {

  const countSlider = new SliderModel(
    "count-slider",
    "Count",
    4,
    2,
    8,
    1
  );

  const factorSlider = new SliderModel(
    "factor-slider",
    "Factor",
    1,
    0.5,
    2,
    0.01
  );

  const speedSlider = new SliderModel(
    "speed-slider",
    "Animation Speed",
    1,
    0,
    1,
    0.01,
  );

  let unitCircles = [], curveFollowers = [];
  let count = countSlider.defaultValue;
  let factor = factorSlider.defaultValue;
  let speed = speedSlider.defaultValue;

  const canvasRef = useRef(null);
  let myP5 = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({width: 0, height: 0})

  useEffect(() => {
    window.scrollTo(0, 0);
    myP5.current = new p5(sketch, canvasRef.current);
    setCanvasDimensions({width: canvasRef.current.clientWidth, height: canvasRef.current.clientWidth})
    return function cleanup() {
      myP5.current.remove();
    }
  }, [])

  const sketch = (p) => {
    const {clientWidth: width} = canvasRef.current;
    p.setup = () => {
      p.createCanvas(width, width);
      reset(p);
    }

    p.draw = () => {
      const {height:h, width:w} = p;
      p.colorMode(p.RGB, 255);
      p.background(p.color(10, 23, 38));

      for (let i = 0; i < count; i++) {
        unitCircles[i][0].display();
        unitCircles[i][1].display();

        p.noFill();
        p.strokeWeight(2);
        p.stroke(250,250,250,50);

        p.line(unitCircles[i][0].radiusPosition.x, unitCircles[i][0].radiusPosition.y, unitCircles[i][0].radiusPosition.x, h);
        p.line(unitCircles[i][1].radiusPosition.x, unitCircles[i][1].radiusPosition.y, w, unitCircles[i][1].radiusPosition.y);
      }

      p.colorMode(p.HSL, 360, 100, 100);
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          curveFollowers[i + j*count].display({ x: unitCircles[i][0].radiusPosition.x, y: unitCircles[j][1].radiusPosition.y });
        }
      }
    }

    p.windowResized = () => {
      p.createCanvas(canvasRef.current.clientWidth, canvasRef.current.clientWidth);
    }
  }

  const reset = (p) => {
    const {height:h, width:w} = p;
    const radius = w / (count + 1) /2 - 10;

    unitCircles = [];
    curveFollowers = [];
    p.colorMode(p.RGB, 255);
    for (let i = 0; i < count; i++) {
      unitCircles.push([
        new LissajousUnitCircle(p, {x: w*(i+1)/(count+1) + radius, y: radius}, radius, 6 * (i + factor), p.color(250), p.color(194, 245, 255)),
        new LissajousUnitCircle(p, {x: radius, y: h*(i+1)/(count+1) + radius}, radius, 6 * (i + factor), p.color(250), p.color(194, 245, 255))
      ]);
    }
    p.colorMode(p.HSL, 360, 100, 100);
    for (let i = 0; i < count*count; i++) {
      curveFollowers.push(new LissajousCurveFollower(p, p.color(i * 360 / (count*count), 50, 80)));
    }
    handleSpeedChange(speed);
  }

  const handleCountChange = (newValue) => {
    count = parseInt(newValue);
    reset(myP5.current);
  }

  const handleFactorChange = (newValue) => {
    factor = parseFloat(newValue);
    for (let i = 0; i < count; i++) {
      unitCircles[i][0].setFrequency(6 * (i + factor));
      unitCircles[i][1].setFrequency(6 * (i + factor));
    }
  }

  const handleSpeedChange = (newValue) => {
    speed = parseFloat(newValue);
    for (let unitCircle of unitCircles) {
      unitCircle[0].setSpeed(speed);
      unitCircle[1].setSpeed(speed);
    }
  }

  const controls = [{
    sliderModel: countSlider,
    sliderCallback: (value) => handleCountChange(value)
  }, {
    sliderModel: factorSlider,
    sliderCallback: (value) => handleFactorChange(value)
  }, {
    sliderModel: speedSlider,
    sliderCallback: (value) => handleSpeedChange(value)
  }];

  const sketchHeightStyle = {
    height: `${canvasDimensions.height}px`
  }

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match} />
      <div className={styles.canvasContainer} style={sketchHeightStyle}>
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

export default LissajousCurvesConsolidated;