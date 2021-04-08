import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import VideoPlaylistComponent from "./VideoPlaylistComponent";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const playlists = [
  "PLbqhA-NKGP6DxFIF7K5AhBY9kawUOOM0H",
  "PLbqhA-NKGP6B6V_AiS-jbvSzdd7nbwwCw",
  "PLbqhA-NKGP6DAkB4eYDsnNMQh9a9nvQh9"
];

const apiKey = "AIzaSyBsuGb5Wy6zkOL_hjN-sNWBLHvtkmbVJBs";

const VideoHome = (props) => {

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={5} className={classes.mainGrid}>
          <Container>
            {playlists.map(playlist => (
              <VideoPlaylistComponent playlistId={playlist} apiKey={apiKey} key={playlist}/>
            ))}
          </Container>
        </Grid>
      </Container>
    </>
  );
}


export default VideoHome;
