import React, {createContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import AliasingWidget from './aliasing/AliasingWidget';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import SineWaveWidget from "./sinusoid-properties/SineWaveWidget";
import {Route} from "react-router-dom";
import SineCosineWidget from "./sine-cosine/SineCosineWidget";
import WidgetDefaultRedirect from "./WidgetDefaultRedirect";
import SinusoidalMotion2DWidget from "./sinusoidal-motion-2d/SinusoidalMotion2DWidget";
import SinusoidInterferenceWidget from "./interference/SinusoidInterferenceWidget";
import PhasorIntroductionWidget from "./phasor-introduction/PhasorIntroductionWidget";
import PhasorVariableFrequency from "./phasor-variable-frequency/PhasorVariableFrequency";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  {title: 'Articles', route: '#'},
  {title: 'Widgets', route: '/widgets'},
  {title: 'Videos', route: '#'},
  {title: 'Plugins', route: '#'}
];

const widgets = [
  {
    id: "aliasing",
    sidebarTitle: "Aliasing",
    title: "Aliasing",
    category: "Digital Audio Fundamentals",
    route: "/widgets/aliasing",
    shortDescription: "An aliased signal is an imposter. An unexpected and unwanted intruder in your digital signal. Changing the <b>frequency</b> or <b>sampling interval</b> changes how many samples are captured. If there are less than 3 samples per cycle of the sine wave, you've lost the ability to recreate the sine wave for that frequency. Instead what you get is a signal interpreted with a different frequency.",
    component: AliasingWidget
  }, {
    id: "sinusoid-properties",
    sidebarTitle: "Sinusoid properties",
    title: "Properties of sinusoids",
    category: "Origins of the sine wave",
    route: "/widgets/sinusoid-properties",
    shortDescription: "Dance with your sine wave. Remember the rules, <b>amplitude</b> to swing your arms wide or keep them close to your body, <b>phase</b> to sway from side to side, <b>offset</b> to duck or to jump, and <b>frequency</b>. Well frequency is your party piece. Show them what you got. ",
    component: SineWaveWidget
  }, {
    id: "sine-cosine",
    sidebarTitle: "Sine Cosine Visualized",
    title: "Sine Cosine Visualized",
    category: "Origins of the sine wave",
    route: "/widgets/sine-cosine",
    shortDescription: "Whip out your magic pens. Attach them to the circumference of a unit circle. Put a sheet of paper underneath your circle and start rotating the circle. Now, start pulling the paper away from the circle. What you get is a sine wave (green). Now start pulling the paper perpendicularly, and you get another sine wave ofcourse, only this time, offset by a little. The offset is exactly 2π radian, and hence a cosine wave (pink). <b>Freqeuncy</b> to turn the circle faster, and <b>amplitude</b> to change the size of the circle. ",
    component: SineCosineWidget
  }, {
    id: "sinusoidal-motion-2d",
    sidebarTitle: "2 Dimensional Sinusoidal Motion",
    title: "2 Dimensional Sinusoidal Motion",
    category: "Origins of the sine wave",
    route: "/widgets/sinusoidal-motion-2d",
    shortDescription: "Whip out your magic pens. Attach them to the circumference of a unit circle. Put a sheet of paper underneath your circle and start rotating the circle. Now, start pulling the paper away from the circle. What you get is a sine wave (green). Now start pulling the paper perpendicularly, and you get another sine wave ofcourse, only this time, offset by a little. The offset is exactly 2π radian, and hence a cosine wave (pink). <b>Freqeuncy</b> to turn the circle faster, and <b>amplitude</b> to change the size of the circle. ",
    component: SinusoidalMotion2DWidget
  }, {
    id: "sinusoidal-interference",
    sidebarTitle: "Constructive and Destructive Interference",
    title: "Constructive and Destructive Interference",
    category: "Origins of the sine wave",
    route: "/widgets/sinusoidal-interference",
    shortDescription: "Whip out your magic pens. Attach them to the circumference of a unit circle. Put a sheet of paper underneath your circle and start rotating the circle. Now, start pulling the paper away from the circle. What you get is a sine wave (green). Now start pulling the paper perpendicularly, and you get another sine wave ofcourse, only this time, offset by a little. The offset is exactly 2π radian, and hence a cosine wave (pink). <b>Freqeuncy</b> to turn the circle faster, and <b>amplitude</b> to change the size of the circle. ",
    component: SinusoidInterferenceWidget
  }, {
    id: "phasor-introduction",
    sidebarTitle: "Phasors: An Introduction",
    title: "Phasors: An Introduction",
    category: "Origins of the sine wave",
    route: "/widgets/phasor-introduction",
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
    shortDescription: "Phase + Vector = Phasor<br/><br/>\n" +
      "It's so much easier to visualize adding phasors when compared to adding sinusoidal functions. Especially when the sinusoids have different frequencies. In <a style='color: white' href=\"#/widgets/phasor-introduction\">Phasors: An Introduction</a>, we varied the phase while keeping the frequency constant. Here we'll vary the frequency instead.<br/><br/>\n" +
      "Adding sinusoids of different frequencies dramatically alters the resulting sinusoid, often in unintuitive ways. But by visualizing phasor addition, the process is demystified and laid bare. You can see exactly why the resulting sinusoid is formed as it is by reducing the Animation Speed.<br/><br/>\n" +
      "Moreover, the visualizations result in unique and distinct patterns when tracing the added phasor, patterns that seem to evolve and grow over time, but are entirely reproducible, and follow a static pattern for whole number ratios, and a more erratic and evolving pattern when not. The base wave (blue) is 6Hz in frequency. ",
    component: PhasorVariableFrequency
  }
]

export const WidgetContext = createContext(widgets);

export default function WidgetHome() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Header sections={sections}/>
        <main>
          <WidgetContext.Provider value={widgets}>
            <Grid container spacing={5} className={classes.mainGrid}>
              {widgets.map(widget => (
                <Route key={widget.id} path={widget.route} component={widget.component}/>
              ))}
              <Route path={"/widgets/:id"} component={Sidebar}/>
              <Route path={"/widgets"} exact={true} component={WidgetDefaultRedirect}/>
              <Route path={"/"} exact={true} component={WidgetDefaultRedirect}/>
            </Grid>
          </WidgetContext.Provider>
        </main>
      </Container>
      <Footer/>
    </>
  );
}