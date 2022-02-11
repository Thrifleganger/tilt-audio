import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {PluginsContext} from "./PluginHome";

const styles = makeStyles(() => ({
  mainTitle: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    textAlign: "center"
  },
  centerAlign: {
    textAlign: "center"
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  },
  pluginImage: {
    width: "100%",
    height: "100%",
    display: "block"
  },
  imageContainer: {
    borderRadius: "30px",
    margin: "2em 0.5em",
    overflow: "hidden",
    boxShadow: "0 0 50px #000"
  },
}));

const PluginThumbDisplay = (props) => {
  const classes = styles();
  const plugins = useContext(PluginsContext)
  return (
    <Container maxWidth={"xl"}>
      {/*<Typography className={classes.mainTitle} variant={"h1"}>
        Free plugins for everyone
      </Typography>
      <Grid container spacing={4}>
        {plugins.myPlugins.map(plugin => (
          <Grid key={plugin.id} item xs={12} md={6}>
            <Link className={classes.link} to={plugin.route}>
              <Typography className={classes.centerAlign} variant={"h3"}><b>{plugin.name}</b></Typography>
            </Link>
            <Typography className={classes.centerAlign} variant={"h6"}>{plugin.description}</Typography>
            <Link className={classes.link} to={plugin.route}>
              <div className={classes.imageContainer}>
                <img className={classes.pluginImage} src={plugin.image}/>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>*/}

      <Typography className={classes.mainTitle} variant={"h2"}>
        Plugins I've worked on
      </Typography>
      <Grid container spacing={4}>
        {plugins.clientPlugins.map(plugin => (
          <Grid key={plugin.id} item xs={12} md={6}>
            <a className={classes.link} href={plugin.route} target="_blank">
              <Typography className={classes.centerAlign} variant={"h4"}><b>{plugin.name}</b></Typography>
            </a>
            <Typography className={classes.centerAlign} variant={"h6"}>{plugin.description}</Typography>
            <a className={classes.link} href={plugin.route} target="_blank">
              <div className={classes.imageContainer}>
                <img className={classes.pluginImage} src={plugin.image}/>
              </div>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default PluginThumbDisplay;