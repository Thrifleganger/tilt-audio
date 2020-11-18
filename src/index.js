import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import WidgetHome from "./components/widgets/WidgetHome";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {HashRouter} from "react-router-dom";
import "./index.css"

const themeDark = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: '"TwCenMTStd", "Helvetica", "Arial", "sans-serif"',
    fontSize: 16
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeDark}>
      <HashRouter>
        <WidgetHome/>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
