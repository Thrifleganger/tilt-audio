import React, {createContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import AliasingWidget from './aliasing/AliasingWidget';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import SineWaveWidget from "./sinewave/SineWaveWidget";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SineCosineWidget from "./sine-cosine/SineCosineWidget";
import WidgetDefaultRedirect from "./WidgetDefaultRedirect";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  {title: 'Articles', url: '/articles'},
  {title: 'Widgets', route: '/widgets'},
  {title: 'Videos', url: '/videos'},
  {title: 'Plugins', url: '/plugins'}
];

const widgets = [
  {
    id: "aliasing",
    sidebarTitle: "Aliasing",
    title: "Aliasing",
    category: "Digital Audio Fundamentals",
    route: "/widgets/aliasing",
    shortDescription: "Exploring aliasing with this widget",
    component: AliasingWidget
  }, {
    id: "sinusoid-properties",
    sidebarTitle: "Sinusoid properties",
    title: "Properties of sinusoids",
    category: "Origins of the sine wave",
    route: "/widgets/sinusoid-properties",
    shortDescription: "Exploring sine waves with this widget",
    component: SineWaveWidget
  }, {
    id: "sine-cosine",
    sidebarTitle: "Sine Cosine Visualized",
    title: "Sine Cosine Visualized",
    category: "Origins of the sine wave",
    route: "/widgets/sine-cosine",
    shortDescription: "Exploring sine function with this widget",
    component: SineCosineWidget
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
            <Router>

              <Grid container spacing={5} className={classes.mainGrid}>
                {widgets.map(widget => (
                  <Route key={widget.id} path={widget.route} component={widget.component}/>
                ))}
                <Route path={"/widgets/:id"} component={Sidebar}/>
                <Route path={"/widgets"} exact={true} component={WidgetDefaultRedirect}/>
                <Route path={"/"} exact={true} component={WidgetDefaultRedirect}/>
              </Grid>
            </Router>
          </WidgetContext.Provider>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!"/>
    </>
  );
}