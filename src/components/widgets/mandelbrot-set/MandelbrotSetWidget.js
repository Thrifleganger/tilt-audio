import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from "react-device-detect";
import p5 from 'p5';
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import {BrowserView} from 'react-device-detect';
import {makeStyles} from "@material-ui/core/styles";

const MandelbrotSetWidget = ({match}) => {

  const canvasRef = useRef(null);
  let myP5 = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({width: 0, height: 0})
  const [zoomLevelState, setZoomLevel] = useState(1);

  const useStyles = makeStyles(() => ({
    buttonContainer: {
      marginTop: "1em",
      alignItems: "center",
      justifyContent: "center"
    }
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    myP5.current = new p5(sketch, canvasRef.current);
    setCanvasDimensions({width: canvasRef.current.clientWidth, height: canvasRef.current.clientWidth})
    return function cleanup() {
      myP5.current.remove();
    }
  }, [])

  let shouldUpdate = useRef(true);
  let shouldPan = useRef(false);
  let shouldDisplayInfo = useRef(false);
  let range = useRef(2);
  let zoomLevel = useRef(1);
  let skewX = useRef(0);
  let skewY = useRef(0);

  const sketch = (p) => {

    let image;
    let mouseDownPosition;
    let canvas;
    let textSize;
    let infoDisplayCanvas;
    const maxIterations = 100;
    const {clientWidth: width} = canvasRef.current;

    p.preload = () => {
      //textFont = p.loadFont('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    }

    p.setup = () => {
      console.log("Mandelbrot Set canvas setup");

      if (isMobile) {
        canvas = p.createCanvas(width, width);
      } else {
        canvas = p.createCanvas(width, width);

      }
      image = p.createImage(width, width);
      infoDisplayCanvas = p.createGraphics(width, width);
      infoDisplayCanvas.colorMode(p.RGB, 255);
      p.pixelDensity(1);
      textSize = p.width/40;
      infoDisplayCanvas.textSize(textSize);
      //p.textFont(textFont);
    }

    p.draw = () => {
      if (mouseDownPosition == null) {
        panImage(0, 0);
      }
      if (shouldDisplayInfo.current) {
        displayInfo();
      }
      if (shouldUpdate.current) {
        updateFractal();
        shouldUpdate.current = false;
      }
    }

    const updateFractal = () => {
      let maxIter = maxIterations;
      maxIter = maxIter + ((zoomLevel.current > 7) ? (80 * zoomLevel.current - 500) : 0)

      p.colorMode(p.HSB, 255);
      image.loadPixels();
      for (let x = 0; x < p.width; x++) {
        for (let y = 0; y < p.height; y++) {

          let a = p.map(x, 0, p.width, -range.current + skewX.current, range.current + skewX.current);
          let b = p.map(y, 0, p.height, -range.current + skewY.current, range.current + skewY.current);
          let n = 0;

          let cr = a;
          let ci = b;
          let zr = 0;
          let zi = 0;

          while (n < maxIter) {
            let absolute = zr * zr - zi * zi;
            let imaginary = 2 * zr * zi;
            zr = absolute + cr;
            zi = imaginary + ci;

            if (Math.abs(zr + zi) > 16) {
              break;
            }
            n++;
          }
          if (n === maxIter) {
            image.set(x, y, p.color(0))
          } else {
            let brightness = p.map(n, 0, maxIter, 0, 1);
            brightness = p.map(Math.sqrt(brightness), 0, 1, 120, 260);
            let luminance = p.map(n, 0, maxIter, 0, 1);
            luminance = p.map(Math.sqrt(luminance), 0, 1, 255, 0);
            image.set(x, y, p.color(brightness, 100, luminance))
          }
        }
      }
      image.updatePixels();
      p.image(image, 0, 0);
    }

    const panImage = (newX, newY) => {
      p.image(image, newX, newY);
    }

    const displayInfo = () => {
      const c = infoDisplayCanvas;
      c.clear();
      c.noFill();
      c.stroke(c.color(200, 200, 200, 250));
      c.line(0, c.height/2, c.width, c.height/2);
      c.line(c.width/2, 0, c.width/2, c.height);

      c.noStroke();
      c.fill(c.color(200, 200, 200, 250))
      c.textAlign(c.LEFT);
      c.text("Zoom level: " + zoomLevel.current, c.width - c.width/5, c.height - (1.5 * textSize));
      const x = c.map(p.mouseX, 0, c.width, -range.current + skewX.current, +range.current + skewX.current);
      const y = c.map(p.mouseY, 0, c.height, -range.current + skewY.current, +range.current + skewY.current);

      if (p.mouseX > c.width/2) {
        c.textAlign(c.RIGHT)
      }
      c.text(`(${x}, ${y})`, p.mouseX, p.mouseY);
      p.image(c, 0, 0);
    }

    p.windowResized = () => {
      if (isMobile) {
        p.resizeCanvas(width, width);
      } else {
        p.resizeCanvas(width, width);
      }
    }

    p.mousePressed = (event) => {
      if (event.target === canvas.canvas) {
        mouseDownPosition = {x: event.clientX, y: event.clientY};
        shouldPan.current = true;
      }
    }

    p.mouseDragged = (event) => {
      if (mouseDownPosition != null) {
        panImage(event.clientX - mouseDownPosition.x, event.clientY - mouseDownPosition.y);
      }
    }

    p.mouseReleased = (event) => {
      if (mouseDownPosition != null) {
        skewX.current += (p.map(mouseDownPosition.x - event.clientX, -p.width, p.width, -1, 1) * 2 * range.current);
        skewY.current += (p.map(mouseDownPosition.y - event.clientY, -p.height, p.height, -1, 1) * 2 * range.current);
        shouldUpdate.current = true;
        mouseDownPosition = null;
      }
    }

    p.doubleClicked = (event) => {
      if (event.target === canvas.canvas) {
        skewX.current += p.map(event.layerX, 0, p.width, -1, 1) * range.current;
        skewY.current += p.map(event.layerY, 0, p.height, -1, 1) * range.current;
        range.current /= 2;
        zoomLevel.current += 1;
        shouldUpdate.current = true;
      }
    }

    p.touchStarted = (event) => {
      if (event.target === canvas.canvas && mouseDownPosition == null) {
        mouseDownPosition = {x: p.mouseX, y: p.mouseY};
        shouldPan.current = true;
        event.preventDefault();
      }
    }

    p.touchMoved = (event) => {
      if (mouseDownPosition != null) {
        panImage(p.mouseX - mouseDownPosition.x, p.mouseY - mouseDownPosition.y);
        event.preventDefault();
      }
    }

    p.touchEnded = (event) => {
      if (mouseDownPosition != null && event.changedTouches[0].identifier === 0) {
        skewX.current += (p.map(mouseDownPosition.x - p.mouseX, -p.width, p.width, -1, 1) * 2 * range.current);
        skewY.current += (p.map(mouseDownPosition.y - p.mouseY, -p.height, p.height, -1, 1) * 2 * range.current);
        shouldUpdate.current = true;
        mouseDownPosition = null;
        event.preventDefault();
      }
    }
  }

  const sketchHeightStyle = {
    height: `${canvasDimensions.height}px`
  }

  const handleMagnification = (value) => {
    switch (value) {
      case "minimize":
        range.current *= 2;
        zoomLevel.current -= 1;
        setZoomLevel(zoomLevel.current);
        break;
      case "maximize":
        range.current /= 2;
        zoomLevel.current += 1;
        setZoomLevel(zoomLevel.current);
        break;
    }
    shouldUpdate.current = true;
  }

  const handleReset = () => {
    range.current = 2;
    zoomLevel.current = 1;
    skewX.current = 0;
    skewY.current = 0;
    shouldUpdate.current = true;
  }

  const handleToggleInfo = () => {
    shouldDisplayInfo.current = !shouldDisplayInfo.current;
  }

  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match}/>
      <div className={styles.canvasContainer} style={sketchHeightStyle}>
        <div ref={canvasRef}/>
      </div>
      <Grid className={classes.buttonContainer} container spacing={2}>
        <Grid item>
          <Typography>
            Zoom Level: {zoomLevelState}
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup variant="contained" color="secondary">
            <Button onClick={() => handleMagnification("minimize")}>-</Button>
            <Button onClick={() => handleMagnification("maximize")}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => handleReset()}>Reset</Button>
        </Grid>
        <BrowserView>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => handleToggleInfo()}>Toggle Info</Button>
          </Grid>
        </BrowserView>
      </Grid>
    </Grid>
  );
}

export default MandelbrotSetWidget;