import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import LazyLoad from 'react-lazyload';

import {Container, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

const VideoComponent = ({video, apiKey}) => {
  const styles = makeStyles(() => ({
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    cardTitle: {
      marginTop: "0.5em",
      marginBottom: "0.5em"
    },
    link: {
      color: "inherit",
      textDecoration: "none"
    },
    wrappedText: {
      display: "-webkit-box",
      width: "100%",
      WebkitLineClamp: "5",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    linkStyle: {
      textDecoration: "none",
      color: "inherit",
      cursor: "pointer"
    }
  }))

  const videoRef = useRef(null);
  const [videoPlayer, setVideoPlayer] = useState(null);
  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=player&` +
      `id=${video.resourceId.videoId}&maxWidth=${videoRef.current.clientWidth}&key=${apiKey}`)
      .then(result => result.json())
      .then(result => setVideoPlayer(result.items[0].player.embedHtml))
  }, []);

  const classes = styles();
  return (
    <Grid item xs={12} md={4}>
      <Card className={classes.card} ref={videoRef}>
        <Container>
          <Typography className={classes.cardTitle} variant={"h6"}>
            <a href={`https://www.youtube.com/watch?v=${video.resourceId.videoId}`} target={"_blank"} rel={"noreferrer"} className={classes.linkStyle}>
              <b>{video.title.substring(0, video.title.lastIndexOf("-") - 1)}</b>
            </a>
          </Typography>
        </Container>
        <LazyLoad placeholder={PlaceholderComponent} once>
          <div dangerouslySetInnerHTML={{__html: videoPlayer}}/>
        </LazyLoad>
        <Container>
          <p className={classes.wrappedText}>
            {video.description}
          </p>
        </Container>
      </Card>
    </Grid>
  );
}

export const PlaceholderComponent = () => {
  const useStyles = makeStyles((theme) => ({
    blankPaper: {
      height: theme.spacing(50),
    },
  }));
  const classes = useStyles();
  return (
    <Paper className={classes.blankPaper}/>
  )
}

export default VideoComponent;

VideoComponent.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    resourceId: PropTypes.shape({
      videoId: PropTypes.string.isRequired
    })
  }).isRequired,
  apiKey: PropTypes.string.isRequired
};