import React, {useContext} from 'react';
import {WidgetContext} from "./WidgetHome";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardContent, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Container from "@material-ui/core/Container";

const WidgetsArsenal = (props) => {

  const styles = makeStyles(() => ({
    categoryTitle: {
      textAlign: "right"
    }
  }))
  const widgets = useContext(WidgetContext)

  const widgetsGroupedByCategory = widgets.reduce((prev, current) => {
    prev.get(current.category) == null ? prev.set(current.category, new Array(current)) :
      prev.set(current.category, [...prev.get(current.category), current]);
    return prev
  }, new Map());

  const classes = styles();
  return (
    <Container >
      {Array.from(widgetsGroupedByCategory).map(([category, list]) => (
        <Grid container spacing={2} key={category}>
          <Grid item xs={12}>
            <Typography className={classes.categoryTitle} variant={"h5"}>
              {category}
            </Typography>
          </Grid>
          {list.map(widget => (<WidgetArsenalComponent key={widget.id} widget={widget}/>))}
          <Grid item xs={12}>
            <Divider variant={"middle"}/>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
}

export const WidgetArsenalComponent = ({widget}) => {
  const styles = makeStyles(() => ({
    card: {
      display: "flex",
      justifyContent: "space-between"
    },
    link: {
      color: "inherit",
      textDecoration: "none"
    }
  }))

  const classes = styles();

  return (
    <Grid item xs={12} md={4}>
      <Link className={classes.link} to={widget.route}>
        <Card className={classes.card}>
          <CardContent>
            <Typography>
              {widget.title}
            </Typography>
          </CardContent>
          <img
            src={widget.image}
            alt={widget.title}
          />
        </Card>
      </Link>
    </Grid>
  );
}

export default WidgetsArsenal;