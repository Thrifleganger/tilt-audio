import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {WidgetContext} from "./WidgetHome";

const WidgetDefaultRedirect = (props) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const widgets = useContext(WidgetContext)
  const randomWidgetRoute = widgets[getRandomInt(widgets.length)].route;

  return (
    <Redirect to={randomWidgetRoute}/>
  )
};

export default WidgetDefaultRedirect;