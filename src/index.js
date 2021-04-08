import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import WidgetHome from "./components/widgets/WidgetHome";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {HashRouter, Route} from "react-router-dom";
import "./index.css"
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VideoHome from "./components/videos/VideoHome";

const themeDark = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: '"TwCenMTStd", "Helvetica", "Arial", "sans-serif"',
    fontSize: 16
  }
});

const sections = [
  {title: 'Articles', route: '#'},
  {title: 'Widgets', route: '/widgets'},
  {title: 'Videos', route: '/videos'},
  {title: 'Plugins', route: '#'}
];

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeDark}>
      <HashRouter>
        <CssBaseline/>
        <Container maxWidth="lg">
          <Header sections={sections}/>
        </Container>
        <Route path={"/videos"} component={VideoHome}/>
        <Route path={"/widgets"} component={WidgetHome}/>
        <Route path={"/"} exact={true} component={WidgetHome}/>
        <Footer/>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
