import React, {useContext} from 'react';
import {WidgetContext} from "../WidgetHome";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  headingSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headingTitle: {
    fontSize: "2em",
    fontWeight: "bold",
    margin: "0 0.5em 0.5em  0.5em",
  },
  headingCategory: {
    fontSize: "1.5em",
    margin: "0 0 0.5em 0.5em",
  }
}));

const WidgetHeading = ({match}) => {
  const classes = useStyles();
  const matchedWidgetId = match.path.substring(match.path.lastIndexOf("/") + 1)
  const widget = useContext(WidgetContext)
    .find(widget => widget.id === matchedWidgetId);

  return (
    <div className={classes.headingSection}>
      <p className={classes.headingTitle}>{widget.title}</p>
      <p className={classes.headingCategory}>{widget.category}</p>
    </div>
  )
}

export default WidgetHeading;