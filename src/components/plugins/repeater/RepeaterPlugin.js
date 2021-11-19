import React, {useContext} from 'react';
import {Container, Grid, Typography} from "@material-ui/core";
import {PluginsContext} from "../PluginHome";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    margin: "2em 2em",
    overflow: "hidden",
    boxShadow: "0 0 50px #000"
  },
}));

const RepeaterPlugin = ({match}) => {
  const classes = styles();
  const matchedPluginId = match.path.substring(match.path.lastIndexOf("/") + 1)
  const plugin = useContext(PluginsContext).myPlugins
    .find(plugin => plugin.id === matchedPluginId);

  return (
    <Container maxWidth={"xl"}>
      <h1>"Hello"</h1>
      <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img className={classes.pluginImage} src={plugin.image} alt={plugin.name}/>
          </Grid>
          <Grid item xs={12} md={6} >
            <Typography className={classes.centerAlign} variant={"h3"}><b>{plugin.name}</b></Typography>
            <Button>Windows</Button>
            <Button>Mac</Button>
          </Grid>
      </Grid>
    </Container>
  );
};

export default RepeaterPlugin;
