import React, {createContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Sidebar from '../Sidebar';
import {Route} from "react-router-dom";

import AliasingWidget from './aliasing/AliasingWidget';
import SineWaveWidget from "./sinusoid-properties/SineWaveWidget";
import SineCosineWidget from "./sine-cosine/SineCosineWidget";
import SinusoidalMotion2DWidget from "./sinusoidal-motion-2d/SinusoidalMotion2DWidget";
import SinusoidInterferenceWidget from "./interference/SinusoidInterferenceWidget";
import PhasorIntroductionWidget from "./phasor-introduction/PhasorIntroductionWidget";
import PhasorVariableFrequencyWidget from "./phasor-variable-frequency/PhasorVariableFrequency";
import MandelbrotSetWidget from "./mandelbrot-set/MandelbrotSetWidget";
import JuliaSetWidget from "./julia-set/JuliaSetWidget"
import WidgetsArsenal from "./WidgetsArsenal";

import phasorVariableFrequencyImage from "../../media/widgets/gif/phasor-variable-frequency.gif";
import phasorIntroductionImage from "../../media/widgets/gif/phasor-introduction.gif";
import sinusoidal2DMotionImage from "../../media/widgets/gif/2d-motion.gif";
import alaisingImage from "../../media/widgets/gif/aliasing.gif";
import sineCosineImage from "../../media/widgets/gif/sine-cosine.gif";
import sinusoidPropertiesImage from "../../media/widgets/gif/sinusoid-properties.gif";
import interferenceImage from "../../media/widgets/gif/intereference.gif";
import mandelbrotSetImage from "../../media/widgets/gif/mandelbrot-set.gif";
import juliaSetImage from "../../media/widgets/gif/julia-set.gif";
import JuliaSetDisassembledWidget from "./julia-set-disassembled/JuliaSetDisassembledWidget";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const widgets = [
  {
    id: "sinusoid-properties",
    sidebarTitle: "Sinusoid properties",
    title: "Properties of sinusoids",
    category: "Origins of the sine wave",
    route: "/widgets/sinusoid-properties",
    image: sinusoidPropertiesImage,
    shortDescription: "Dance with your sine wave. Remember the rules, <b>amplitude</b> to swing your arms wide or keep them close to your body, <b>phase</b> to sway from side to side, <b>offset</b> to duck or to jump, and <b>frequency</b>. Well frequency is your party piece. Show them what you got. ",
    component: SineWaveWidget
  }, {
    id: "sine-cosine",
    sidebarTitle: "Sine Cosine Visualized",
    title: "Sine Cosine Visualized",
    category: "Origins of the sine wave",
    route: "/widgets/sine-cosine",
    image: sineCosineImage,
    shortDescription: "Whip out your magic pens. Attach them to the circumference of a unit circle. Put a sheet of paper underneath your circle and start rotating the circle. Now, start pulling the paper away from the circle. What you get is a sine wave (green). Now start pulling the paper perpendicularly, and you get another sine wave ofcourse, only this time, offset by a little. The offset is exactly 2π radian, and hence a cosine wave (pink). <b>Freqeuncy</b> to turn the circle faster, and <b>amplitude</b> to change the size of the circle. ",
    component: SineCosineWidget
  }, {
    id: "sinusoidal-motion-2d",
    sidebarTitle: "2 Dimensional Sinusoidal Motion",
    title: "2 Dimensional Sinusoidal Motion",
    category: "Origins of the sine wave",
    route: "/widgets/sinusoidal-motion-2d",
    image: sinusoidal2DMotionImage,
    shortDescription: "Whip out your magic pens. Attach them to the circumference of a unit circle. Put a sheet of paper underneath your circle and start rotating the circle. Now, start pulling the paper away from the circle. What you get is a sine wave (green). Now start pulling the paper perpendicularly, and you get another sine wave ofcourse, only this time, offset by a little. The offset is exactly 2π radian, and hence a cosine wave (pink). <b>Freqeuncy</b> to turn the circle faster, and <b>amplitude</b> to change the size of the circle. ",
    component: SinusoidalMotion2DWidget
  }, {
    id: "sinusoidal-interference",
    sidebarTitle: "Constructive and Destructive Interference",
    title: "Constructive and Destructive Interference",
    category: "Origins of the sine wave",
    route: "/widgets/sinusoidal-interference",
    image: interferenceImage,
    shortDescription: "Whip out your magic pens. Attach them to the circumference of a unit circle. Put a sheet of paper underneath your circle and start rotating the circle. Now, start pulling the paper away from the circle. What you get is a sine wave (green). Now start pulling the paper perpendicularly, and you get another sine wave ofcourse, only this time, offset by a little. The offset is exactly 2π radian, and hence a cosine wave (pink). <b>Freqeuncy</b> to turn the circle faster, and <b>amplitude</b> to change the size of the circle. ",
    component: SinusoidInterferenceWidget
  }, {
    id: "phasor-introduction",
    sidebarTitle: "Phasors: An Introduction",
    title: "Phasors: An Introduction",
    category: "Origins of the sine wave",
    route: "/widgets/phasor-introduction",
    image: phasorIntroductionImage,
    shortDescription: "Phase + Vector = Phasor<br/><br/>\n" +
      "It's much more though. A phasor can encapsulate a bunch of information. Consider a unit circle with it's arm as the radius. The arm has a certain length (<b>amplitude</b>), a certain angle that it makes with the x-axis (<b>initial phase</b>), and when rotating, a certain <b>angular frequency</b> that it possesses. The rotating arm <b>is</b> a phasor.<br/><br/>\n" +
      "A phasor looks awfully familiar to a sinusoid. Well it is. It's just a complex number representation of a sinusoid. Graphically, this gives us an incredible tool to visualize the interactions between 2 or more sinusoids. One of the common operations we can do is phasor addition.<br/><br/>\n" +
      "Here we have a phasor (blue) with a fixed amplitude and phase, and we another phasor (pink) whose phase and amplitude you can vary. Adding these phasors is equivalent to vector addition, as illustrated here.",
    component: PhasorIntroductionWidget
  }, {
    id: "phasor-variable-frequency",
    sidebarTitle: "Phasors: Variable Frequency",
    title: "Phasors: Variable Frequency",
    category: "Origins of the sine wave",
    route: "/widgets/phasor-variable-frequency",
    image: phasorVariableFrequencyImage,
    shortDescription: "Phase + Vector = Phasor<br/><br/>\n" +
      "It's so much easier to visualize adding phasors when compared to adding sinusoidal functions. Especially when the sinusoids have different frequencies. In <a style='color: white' href=\"#/widgets/phasor-introduction\">Phasors: An Introduction</a>, we varied the phase while keeping the frequency constant. Here we'll vary the frequency instead.<br/><br/>\n" +
      "Adding sinusoids of different frequencies dramatically alters the resulting sinusoid, often in unintuitive ways. But by visualizing phasor addition, the process is demystified and laid bare. You can see exactly why the resulting sinusoid is formed as it is by reducing the Animation Speed.<br/><br/>\n" +
      "Moreover, the visualizations result in unique and distinct patterns when tracing the added phasor, patterns that seem to evolve and grow over time, but are entirely reproducible, and follow a static pattern for whole number ratios, and a more erratic and evolving pattern when not. The base wave (blue) is 6Hz in frequency. ",
    component: PhasorVariableFrequencyWidget
  }, {
    id: "aliasing",
    sidebarTitle: "Aliasing",
    title: "Aliasing",
    category: "Digital Audio Fundamentals",
    route: "/widgets/aliasing",
    image: alaisingImage,
    shortDescription: "An aliased signal is an imposter. An unexpected and unwanted intruder in your digital signal. Changing the <b>frequency</b> or <b>sampling interval</b> changes how many samples are captured. If there are less than 3 samples per cycle of the sine wave, you've lost the ability to recreate the sine wave for that frequency. Instead what you get is a signal interpreted with a different frequency.",
    component: AliasingWidget
  }, {
    id: "mandelbrot-set",
    sidebarTitle: "Mandelbrot Set",
    title: "Mandelbrot Set",
    category: "Miscalleneous Mathematics",
    route: "/widgets/mandelbrot-set",
    image: mandelbrotSetImage,
    shortDescription: "This is the infamously infinite Mandelbrot set. You've probably already seen visualizations of the Mandelbrot set as a video dragging you down into a never ending spiral of self similar shapes, or through someone trying to explain what infinity means and the inherent beauty of mathematics or your stoner friend suggesting that we live in a fractal hologram. Whatever the case may be, the generation of the Mandelbrot set, and the mathematics behind it is fairly simple. <br/><br/>\n" +
      "All real numbers can be expressed on a one dimensional number line. We know this. We also have a set of hypothetical numbers, called the imaginary numbers that can also be expressed on a one dimensional imaginary number line. Combine the 2 together orthogonally, and we get a 2 dimensional complex plane, made of a combination of real and imaginary numbers where <i>Z = a + bi</i>, where <i>a</i> is real and <i>bi</i> is imaginary. For our illustration, we can consider the canvas we are drawing on as a complex plane. For every point on the canvas, we calculate a function <i>f(z) = z<sup>2</sup> + c</i>, where is <i>c</i> is the point in consideration, and we recursively iterate over the function where <i>z</i> starts from 0, and the result is fed back into the function over and over again. If the function over many iterations results in a number which leaves the canvas, we consider this as unstable and ignore it. But if, for a certain value of <i>c</i>, the function manages to produce a number which stays within the bounds of the canvas even when iterated endlessly, we consider this as a complex number which is part of the Mandelbrot set (coloured in black). In this canvas, there are infinitely many numbers which are unstable, and infinitely many numbers which are stable and part of the Mandelbrot set. But the really interesting bit is the boundary between these 2 sets of numbers. The boundary forms a fractal patterns that evolves and grows and falls back on to itself when zoom in and recalculate with finer accuracy.<br/><br/>\n" +
      "Because of Javascript's limited floating point accuracy however, the resolution is lost at a certain zoom level. It is possible to use much higher precision with custom data types, but calculations tend to be incredibly slow and the interactivity would be lost. The current implementation is a compromise to reduce precision to achieve lower wait time while recalculating the image.",
    component: MandelbrotSetWidget
  }, {
    id: "julia-set",
    sidebarTitle: "Julia Set",
    title: "Julia Set",
    category: "Miscalleneous Mathematics",
    route: "/widgets/julia-set",
    image: juliaSetImage,
    shortDescription: "The Julia set and the Mandelbrot set are quite similar to each other. Infact, the core equation is the same for both. When iterating this function <i>f(z) = z<sup>2</sup> + c</i> endlessly, if the magnitude of the complex number is finite, the complex number <i>z</i> is said to be stable. If the value blows up and keep increasing, the number is said to unstable. In both Julia set and Mandelbrot set, we are interested in the numbers that are stable, and these numbers are part of the respective sets. The main differentiator between the 2 sets is the complex number <i>c</i> in the equation.<br/><br/>\n" +
      "In the <a style='color: white' href=\"#/widgets/mandelbrot-set\">Mandelbrot Set</a> widget, we took each pixel in the canvas, and calculated the equation by setting <i>z=0</i> and <i>c</i> as the pixel value, and iterated it several times to calculate if the number would blow up or not. In this widget, we set <i>z</i> as the pixel value, and set <i>c</i> as a constant value for all pixels. Doing this changes the dynamics of how the function behaves over iteration and gives rise to a unique set of numbers which are stable, and represent the Julia set. Changing the constant complex number <i>c</i> gives rise to a different, yet unique set of stable values. Overlayed in the background is the Mandelbrot set and the coordinates of the complex number added to the function in each iteration. To change the complex number <i>c</i>, use the Complex value selection below, or switch to the Mandelbrot set view by clicking on the overlayed image, and then play around with the complex number coordinate.",
    component: JuliaSetWidget
  }, {
    id: "julia-set-disassembled",
    sidebarTitle: "Julia Set Disassembled",
    title: "Julia Set Disassembled",
    category: "Miscalleneous Mathematics",
    route: "/widgets/julia-set-disassembled",
    image: juliaSetImage,
    shortDescription: "This widget is inspired by a Numberphile video called <a style='color: white' href=\"https://www.youtube.com/watch?v=FFftmWSzgmk&ab_channel=Numberphile\" target=\"_blank\">What's so special about the Mandelbrot Set?</a> Check it out to understand the behaviour of the Mandelbrot and Julia set better, and to get a hold of how to use this widget better.",
    component: JuliaSetDisassembledWidget
  }
]

export const WidgetContext = createContext(widgets);

export default function WidgetHome() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg">
          <WidgetContext.Provider value={widgets}>
            <Grid container spacing={5} className={classes.mainGrid}>
              {widgets.map(widget => (
                <Route key={widget.id} path={widget.route} component={widget.component}/>
              ))}
              <Route path={"/widgets/:id"} component={Sidebar}/>
              <Route path={"/widgets"} exact={true} component={WidgetsArsenal}/>
              <Route path={"/"} exact={true} component={WidgetsArsenal}/>
            </Grid>
          </WidgetContext.Provider>
      </Container>
    </>
  );
}