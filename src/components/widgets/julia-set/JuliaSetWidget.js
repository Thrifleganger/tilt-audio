import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from "react-device-detect";
import p5 from 'p5';
import WidgetHeading from "../common/WidgetHeading";
import styles from "../../../styles/widgets/SliderContainer.module.css";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const MandelbrotSetWidget = ({match}) => {

  const juliaCanvasRef = useRef(null);
  let juliaP5 = useRef(null);

  const sampleComplexValues = [{
    value: {re: 0.0, im: 0.8},
    representation: "(0 + 0.8i)"
  }, {
    value: {re: 0.37, im: 0.1},
    representation: "(0.37 + 0.1i)"
  }, {
    value: {re: 0.355, im: 0.355},
    representation: "(0.355 + 0.355i)"
  }, {
    value: {re: -0.54, im: 0.54},
    representation: "(-0.54 + 0.54i)"
  }, {
    value: {re: -0.4, im: -0.59},
    representation: "(-0.4 - 0.59i)"
  }, {
    value: {re: 0.2855, im: 0.01},
    representation: "(0.285 + 0.01i)"
  }, {
    value: {re: 0.34, im: -0.05},
    representation: "(0.34 - 0.05i)"
  }]

  const getRandom = (list) => {
    const randomIndex = Math.floor(Math.random() * Math.floor(list.length));
    return list[randomIndex];
  }
  const randomComplexNumber = getRandom(sampleComplexValues);

  const [canvasDimensions, setCanvasDimensions] = useState({width: 0, height: 0})
  const [zoomLevelState, setZoomLevel] = useState(1);
  const [isSelectOpen, setSelectOpen] = useState(false);
  const [complexRepresentation, setComplexRepresentation] = useState(randomComplexNumber.representation);
  const [selectAnchor, setSelectAnchor] = useState(null);

  const useStyles = makeStyles(() => ({
    buttonContainer: {
      marginTop: "1em",
      alignItems: "center",
      justifyContent: "center"
    },
    centeredContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column"
    }
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    juliaP5.current = new p5(juliaSketch, juliaCanvasRef.current);
    setCanvasDimensions({width: juliaCanvasRef.current.clientWidth, height: juliaCanvasRef.current.clientWidth})
    return function cleanup() {
      juliaP5.current.remove();
    }
  }, [])

  let shouldUpdate = useRef(true);
  let mouseDownPosition = useRef(null);
  let range = useRef(2);
  let zoomLevel = useRef(1);
  let skewX = useRef(0);
  let skewY = useRef(0);
  let complexValue = useRef(randomComplexNumber.value);
  let referenceBounds = useRef({x: 0, y: 0});
  let referenceBoundsOffset = useRef({x: 0, y: 0});

  const juliaSketch = (p) => {
    let canvas;
    let referenceImage;
    let mainImage;
    let referenceImageTargeted, freeRoamPointerTargeted, isDragging;
    const maxIterations = 100;
    const {clientWidth: width} = juliaCanvasRef.current;

    p.setup = () => {
      console.log("Julia Set canvas setup");
      canvas = p.createCanvas(width, width);
      mainImage = {id: "juliaSet", im: p.createImage(width, width), isReference: false};
      if (isMobile) {
        referenceImage = {id: "mandelbrotSet", im: p.createImage(parseInt(width/3), parseInt(width/3)), isReference: true};
      } else {
        referenceImage = {id: "mandelbrotSet", im: p.createImage(parseInt(width/4), parseInt(width/4)), isReference: true};
      }
      referenceBounds.current = {x: p.width - referenceImage.im.width - 10, y: 10}
      p.pixelDensity(1);
    }

    p.draw = () => {
      if (mouseDownPosition.current == null) {
        panImage(0, 0);
      }
      if (shouldUpdate.current) {
        updateFractal(mainImage);
        updateFractal(referenceImage);
        shouldUpdate.current = false;
      }
      drawGrid();
      if (mainImage.id === "mandelbrotSet") {
        p.noStroke();
        p.fill(p.color(255));
        p.ellipse(
          p.map(complexValue.current.re, -range.current + skewX.current, +range.current + skewX.current, 0, p.width),
          p.map(complexValue.current.im, -range.current + skewY.current, +range.current + skewY.current, 0, p.height),
          10, 10
        );
      }
    }

    const updateFractal = (image) => {
      let maxIter = maxIterations;
      maxIter = maxIter + ((zoomLevel.current > 7) ? (80 * zoomLevel.current - 500) : 0)

      p.colorMode(p.HSB, 255);
      image.im.loadPixels();
      for (let x = 0; x < image.im.width; x++) {
        for (let y = 0; y < image.im.height; y++) {

          let cr, ci, zr, zi, a, b;
          if (image.isReference) {
            a = p.map(x, 0, image.im.width, -2, 2);
            b = p.map(y, 0, image.im.height, -2, 2);
          } else {
            a = p.map(x, 0, image.im.width, -range.current + skewX.current, range.current + skewX.current);
            b = p.map(y, 0, image.im.height, -range.current + skewY.current, range.current + skewY.current);
          }

          let n = 0;
          if (image.id === "juliaSet") {
            cr = complexValue.current.re;
            ci = complexValue.current.im;
            zr = a;
            zi = b;
          } else {
            cr = a;
            ci = b;
            zr = 0;
            zi = 0;
          }

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
            image.im.set(x, y, p.color(0))
          } else {
            let hue = p.map(n, 0, maxIter, 0, 1);
            if (image.isReference) {
              hue = p.map(Math.sqrt(hue), 0, 1, 260, 120);
            } else {
              hue = p.map(Math.sqrt(hue), 0, 1, 120, 260);
            }
            let luminance = p.map(n, 0, maxIter, 0, 1);
            luminance = p.map(Math.sqrt(luminance), 0, 1, 255, 0);
            image.im.set(x, y, p.color(hue, 100, luminance))
          }
        }
      }
      image.im.updatePixels();
      if (image.isReference) {
        displayReferenceImage();
      } else {
        displayMainImage(0, 0);
      }
    }

    const drawGrid = () => {
      p.noFill();
      p.stroke(p.color(255));
      p.strokeWeight(1);
      if (referenceImage.id === "mandelbrotSet") {
        let x = p.map(complexValue.current.re,
          -2, +2,
          referenceBounds.current.x, referenceBounds.current.x + referenceImage.im.width);
        let y = p.map(complexValue.current.im,
          -2, +2,
          referenceBounds.current.y, referenceBounds.current.y + referenceImage.im.height);
        p.line(referenceBounds.current.x, y, referenceBounds.current.x + referenceImage.im.width, y);
        p.line(x, referenceBounds.current.y, x, referenceBounds.current.y + referenceImage.im.height);
      } else {
        let x = p.map(complexValue.current.re, -range.current + skewX.current, +range.current + skewX.current, 0, p.width);
        let y = p.map(complexValue.current.im, -range.current + skewY.current, +range.current + skewY.current, 0, p.height);
        p.line(0, y, p.width, y);
        p.line(x, 0, x, p.height);
      }
    }

    const panImage = (newX, newY) => {
      displayMainImage(newX, newY);
      displayReferenceImage();
    }

    const displayMainImage = (newX, newY) => {
      p.image(mainImage.im, newX, newY);
    }

    const displayReferenceImage = () => {
      const {x: refX, y: refY} = referenceBounds.current;
      p.image(referenceImage.im, refX, refY);
      p.noFill();
      p.stroke(p.color(0));
      p.rect(refX, refY, referenceImage.im.width, referenceImage.im.height);
    }

    const isWithinReferenceBounds = (x, y) => {
      const {x: refX, y: refY} = referenceBounds.current;
      return x > refX &&
        x < refX + referenceImage.im.width &&
        y > refY &&
        y < refY + referenceImage.im.height;
    }

    const isWithinFreeRoamPointer = (x, y) => {
      const pointX = p.map(complexValue.current.re, -range.current + skewX.current, +range.current + skewX.current, 0, p.width);
      let pointY = p.map(complexValue.current.im, -range.current + skewY.current, +range.current + skewY.current, 0, p.height);
      return x > pointX - 10 &&
        x < pointX + 10 &&
        y > pointY - 10 &&
        y < pointY + 10;
    }

    const swapImages = () => {
      let tempImage = referenceImage;
      if (isMobile) {
        referenceImage = {id: mainImage.id, im: p.createImage(parseInt(p.width/3), parseInt(p.height/3)), isReference: true};
      } else {
        referenceImage = {id: mainImage.id, im: p.createImage(parseInt(p.width/4), parseInt(p.height/4)), isReference: true};
      }
      mainImage = {id: tempImage.id, im: p.createImage(p.width, p.height), isReference: false};
      shouldUpdate.current = true;
    }

    p.windowResized = () => {
      p.resizeCanvas(width, width);
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
      if (event.target === canvas.canvas && mouseDownPosition.current == null) {
        handleGenericPressEvent(event);
        event.preventDefault();
      }
    }

    p.touchMoved = (event) => {
      if (mouseDownPosition.current != null) {
        handleGenericDragEvent(event);
        event.preventDefault();
      }
    }

    p.touchEnded = (event) => {
      if (mouseDownPosition.current != null && event.changedTouches[0].identifier === 0) {
        handleGenericReleaseEvent();
        event.preventDefault();
      }
    }

    const handleGenericPressEvent = () => {
      mouseDownPosition.current = {x: p.mouseX, y: p.mouseY};
      if (isWithinReferenceBounds(p.mouseX, p.mouseY)) {
        referenceBoundsOffset.current = {
          x: p.mouseX - referenceBounds.current.x,
          y: p.mouseY - referenceBounds.current.y
        }
        referenceImageTargeted = true;
        isDragging = false;
      } else if (isWithinFreeRoamPointer(p.mouseX, p.mouseY) && mainImage.id === "mandelbrotSet") {
        freeRoamPointerTargeted = true;
        isDragging = false;
      }
    }

    const handleGenericDragEvent = () => {
      const {x: offsetX, y: offsetY} = referenceBoundsOffset.current;
      if (mouseDownPosition.current == null) {
        return;
      }
      if (referenceImageTargeted) {
        isDragging = true;
        referenceBounds.current = {x: p.mouseX - offsetX, y: p.mouseY - offsetY}
        panImage(0, 0);
      } else if (freeRoamPointerTargeted) {
        isDragging = true;
        let re = p.map(p.mouseX, 0, p.width, -range.current + skewX.current, +range.current + skewX.current);
        let im = p.map(p.mouseY, 0, p.height, -range.current + skewY.current, +range.current + skewY.current);
        complexValue.current = {re: re, im: im}
        setComplexRepresentation(`(${re.toFixed(3)} ${im < 0 ? "-" : "+"} ${Math.abs(im).toFixed(3)}i)`);
        updateFractal(referenceImage);
        panImage(0, 0);
      } else {
        panImage(p.mouseX - mouseDownPosition.current.x, p.mouseY - mouseDownPosition.current.y);
      }
    }

    const handleGenericReleaseEvent = () => {
      if (mouseDownPosition.current == null) {
        return
      }
      if (referenceImageTargeted) {
        if (!isDragging) {
          swapImages();
        }
        referenceImageTargeted = false;
      } else if (freeRoamPointerTargeted) {
        updateFractal(referenceImage);
        freeRoamPointerTargeted = false;
      } else {
        skewX.current += (p.map(mouseDownPosition.current.x - p.mouseX, -p.width, p.width, -1, 1) * 2 * range.current);
        skewY.current += (p.map(mouseDownPosition.current.y - p.mouseY, -p.height, p.height, -1, 1) * 2 * range.current);
        shouldUpdate.current = true;
      }
      mouseDownPosition.current = null;    }
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
    complexValue.current = randomComplexNumber.value
    setComplexRepresentation(randomComplexNumber.representation);
    referenceBounds.current = {x: juliaP5.current.width - juliaP5.current.width/4 - 10, y: 10};
    shouldUpdate.current = true;
  }

  const handleSelectOpen = (event) => {
    setSelectAnchor(event.currentTarget);
    setSelectOpen(true)
  }

  const setComplexValue = (value, representation) => {
    complexValue.current = value;
    setComplexRepresentation(representation);
    shouldUpdate.current = true;
    setSelectOpen(false)
  }

  const sketchHeightStyle = {
    height: `${canvasDimensions.height}px`
  }
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      <WidgetHeading match={match}/>
      <div className={styles.canvasContainer} style={sketchHeightStyle}>
        <div ref={juliaCanvasRef}/>
      </div>
      <Grid className={classes.buttonContainer} container spacing={2}>
        <Grid className={classes.centeredContainer} item>
          <ButtonGroup variant="contained" color="secondary">
            <Button onClick={() => handleMagnification("minimize")}>-</Button>
            <Button onClick={() => handleMagnification("maximize")}>+</Button>
          </ButtonGroup>
          <Typography>
            Zoom Level: {zoomLevelState}
          </Typography>
        </Grid>
        <Grid className={classes.centeredContainer} item>
          <Button style={{textTransform: 'none'}} variant={"outlined"} onClick={handleSelectOpen}>
            {complexRepresentation}
          </Button>
          <Menu
            open={isSelectOpen}
            anchorEl={selectAnchor}
            keepMounted
            onClose={() => setSelectOpen(false)}
            onOpen={handleSelectOpen}>
            {sampleComplexValues.map(sample => (
              <MenuItem onClick={() => setComplexValue(sample.value, sample.representation)}>
                {sample.representation}
              </MenuItem>
            ))}
          </Menu>
          <Typography>
            Complex value
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => handleReset()}>Reset</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MandelbrotSetWidget;