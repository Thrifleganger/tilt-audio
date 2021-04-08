import React, {useEffect, useRef, useState} from 'react';
import p5 from 'p5';
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Grid from "@material-ui/core/Grid";
import Axis from "../common/Axis";

function JuliaSetDisassembledWidget({match}) {

  const canvasRef = useRef(null);
  let myP5 = useRef(null);
  let pointerPosition = useRef(null);
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
    let xAxis, yAxis;
    let canvas;
    let juliaSetImage;
    let complexValue = {re: 0, im: 0};
    let complexValuePointerRadius = 10;
    let complexValuePointerTargeted = false;
    let shouldUpdateFractal = true;

    let additiveValue = {re: 0.2, im: 0.4};
    let additiveValuePointerRadius = 10;
    let additiveValuePointerTargeted = false;
    let range = {min: -1.2, max: 1.2, step: 0.2}
    const {clientWidth: width} = canvasRef.current;

    p.setup = () => {
      console.log("Julia Set Disassembled canvas setup");
      canvas = p.createCanvas(width, width);
      juliaSetImage = p.createImage(width, width);
      xAxis = new Axis(p, p.createVector(0, p.height/2), p.createVector(p.width, p.height/2), range);
      yAxis = new Axis(p, p.createVector(p.width/2, 0), p.createVector(p.width/2, p.height), range);
      yAxis.setSkipOrigin(true);
      p.pixelDensity(1);
    }

    p.draw = () => {

      if (shouldUpdateFractal) {
        updateFractal(juliaSetImage);
        shouldUpdateFractal = false;
      }
      p.image(juliaSetImage, 0, 0);
      xAxis.draw();
      yAxis.draw();
      drawIterativeCalculations();

      p.noStroke();
      p.fill(p.color(255));
      const complexPointer = complexValueToBounds(complexValue);
      p.circle(complexPointer.x, complexPointer.y, complexValuePointerRadius * 2);

      const additivePointer = complexValueToBounds(additiveValue);
      p.circle(additivePointer.x, additivePointer.y, additiveValuePointerRadius * 2);
    }

    const drawIterativeCalculations = () => {
      let n = 0;
      const maxIterations = 30;
      
      let prevZr = complexValue.re;
      let prevZi = complexValue.im;
      const cr = additiveValue.re;
      const ci = additiveValue.im;

      while (n < maxIterations) {
        const currentZr = (prevZr * prevZr - prevZi * prevZi) + cr;
        const currentZi = (2 * prevZr * prevZi) + ci;
        const prevBounds = complexValueToBounds({re: prevZr, im: prevZi});
        const currentBounds = complexValueToBounds({re: currentZr, im: currentZi});
        p.push()
        p.colorMode(p.HSB, 360);
        const color = p.color(p.map(n, 0, 30, 60, 5), 200, 360);

        p.noFill();
        p.stroke(color)
        p.line(prevBounds.x, prevBounds.y, currentBounds.x, currentBounds.y);

        p.fill(color);
        p.noStroke();
        p.circle(currentBounds.x, currentBounds.y, p.map(n, 0, 30, 15, 5));
        p.pop();

        prevZr = currentZr
        prevZi = currentZi
        n++
      }
    }

    const updateFractal = (image) => {
      let maxIterations = 30;

      image.loadPixels();
      for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
          let n = 0;
          const point = boundsToComplexValue({x:x, y:y});
          let zr = point.re;
          let zi = point.im;
          const cr = additiveValue.re;
          const ci = additiveValue.im;

          while (n < maxIterations) {
            let absolute = zr * zr - zi * zi;
            let imaginary = 2 * zr * zi;
            zr = absolute + cr;
            zi = imaginary + ci;

            if (Math.abs(zr + zi) > 2) {
              break;
            }
            n++;
          }
          let i = (x + y * width) * 4;
          if (n === maxIterations) {
            image.pixels[i] = 0;
            image.pixels[i+1] = 0;
            image.pixels[i+2] = 0;
            image.pixels[i+3] = 100;
          } else {
            image.pixels[i] = 201;
            image.pixels[i+1] = 147;
            image.pixels[i+2] = 147;
            image.pixels[i+3] = 100;

          }
        }
      }
      image.updatePixels();
      p.image(image, 0, 0);
    }

    const complexValueToBounds = (value = {re: 0, im: 0}) => {
      return {
        x: p.map(value.re, range.min, range.max, 0, p.width),
        y: p.map(value.im, range.min, range.max, 0, p.height)
      }
    }

    const boundsToComplexValue = (value = {x: 0, y: 0}) => {
      return {
        re: p.map(value.x, 0, p.width, range.min, range.max),
        im: p.map(value.y, 0, p.height, range.min, range.max)
      }
    }

    p.mousePressed = (event) => {
      if (event.target === canvas.canvas) {
        handleGenericPressEvent()
      }
    }

    p.mouseDragged = () => {
      handleGenericDragEvent();
    }

    p.mouseReleased = () => {
      handleGenericReleaseEvent();
    }

    p.touchStarted = (event) => {
      if (event.target === canvas.canvas && pointerPosition.current === null) {
        handleGenericPressEvent(event);
        event.preventDefault();
      }
    }

    p.touchMoved = (event) => {
      if (pointerPosition.current != null) {
        handleGenericDragEvent(event);
        event.preventDefault();
      }
    }

    p.touchEnded = (event) => {
      if (event.changedTouches[0].identifier === 0 && pointerPosition.current != null) {
        handleGenericReleaseEvent();
        event.preventDefault();
      }
    }

    const handleGenericPressEvent = () => {
      pointerPosition.current = {x: p.mouseX, y: p.mouseY};
      if (isWithinPointerBounds(complexValue, p.mouseX, p.mouseY)) {
        complexValuePointerTargeted = true;
      } else if (isWithinPointerBounds(additiveValue, p.mouseX, p.mouseY)) {
        additiveValuePointerTargeted = true;
      }
    }

    const handleGenericDragEvent = () => {
      if (complexValuePointerTargeted) {
        complexValue = boundsToComplexValue({x: p.mouseX, y: p.mouseY});
      } else if (additiveValuePointerTargeted) {
        shouldUpdateFractal = true;
        additiveValue = boundsToComplexValue({x: p.mouseX, y: p.mouseY});
      }
    }

    const handleGenericReleaseEvent = () => {
      if (complexValuePointerTargeted) {
        complexValuePointerTargeted = false;
      } else if (additiveValuePointerTargeted) {
        additiveValuePointerTargeted = false;
      }
      pointerPosition.current = null;
    }

    const isWithinPointerBounds = (value, x, y) => {
      const complexPointer = complexValueToBounds(value);
      const radius = complexValuePointerRadius;
      return x > complexPointer.x - radius &&
        x < complexPointer.x + radius &&
        y > complexPointer.y - radius &&
        y < complexPointer.y + radius;
    }
  }

  const sketchHeightStyle = {
    height: `${canvasDimensions.height}px`
  }

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match}/>
      <div className={styles.canvasContainer} style={sketchHeightStyle}>
        <div ref={canvasRef}/>
      </div>
    </Grid>
  );
}

export default JuliaSetDisassembledWidget;