import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Divider, Typography} from "@material-ui/core";
import VideoComponent from "./VideoComponent";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const VideoPlaylistComponent = (props) => {

  const useStyles = makeStyles((theme) => ({
    linkStyle: {
      textDecoration: "none",
      color: "inherit",
      cursor: "pointer"
    }
  }));
  const classes = useStyles();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,id&` +
      `id=${props.playlistId}&key=${props.apiKey}`)
      .then(result => result.json())
      .then(result => setPlaylist(result.items[0]));

    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,id&maxResults=50&` +
      `playlistId=${props.playlistId}&key=${props.apiKey}`)
      .then(result => result.json())
      .then(result => setVideos(result.items));
  }, [])

  if (playlist) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={"h4"}>
            <a href={`https://www.youtube.com/playlist?list=${playlist.id}`} target={"_blank"} rel={"noreferrer"} className={classes.linkStyle}>
              {playlist.snippet.title}
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {playlist.snippet.description}
          </Typography>
        </Grid>
        {videos.map(video => (
          <VideoComponent key={video.id} video={video.snippet} apiKey={props.apiKey}/>
        ))}
        <Grid item xs={12}>
          <Divider variant={"middle"}/>
        </Grid>
      </Grid>
    );
  } else {
    return (<> </>);
  }
}

export default VideoPlaylistComponent;

VideoPlaylistComponent.propTypes = {
  playlistId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired
};