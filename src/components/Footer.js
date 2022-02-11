import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';
import Grid from "@material-ui/core/Grid";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Tilt Audio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const social = [
  {name: 'Webpage', icon: HomeIcon, url: "https://www.akashmurthy.com"},
  {name: 'GitHub', icon: GitHubIcon, url: "https://github.com/Thrifleganger/"},
  {name: 'YouTube', icon: YouTubeIcon, url: "https://www.youtube.com/channel/UCb_NEjjKOXV9pilaSOjlkZA"},
  {name: 'Facebook', icon: FacebookIcon, url: "https://www.facebook.com/akash.murthy.319/"},
  {name: 'Instagram', icon: InstagramIcon, url: "https://www.instagram.com/thrifleganger/"},
  {name: 'LinkedIn', icon: LinkedInIcon, url: "https://www.linkedin.com/in/akash-murthy-566324100/"},
]

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
    marginTop: "3em"
  },
  light: {
    fontFamily: "TwCenMTStd-Light"
  },
  bold: {
    fontFamily: "TwCenMTStd-ExtraBold"
  },
  iconButton: {
    padding: 10,
  },
  linkStyle: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    marginTop: "20px",
    padding: 5
  }
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography component="h2" variant="h4" align={"center"} color="inherit" noWrap className={classes.toolbarTitle}>
          <b className={classes.bold}>tilt</b><span className={classes.light}>audio</span>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Talk to me. I don't bite.
        </Typography>
        <Copyright />
        <Grid container direction="row" justify={"center"} alignItems={"center"}>
          {social.map((network) => (
            <a key={network.name} className={classes.linkStyle} href={network.url} target={"_blank"} rel={"noreferrer"}>
              <Grid item>
                <network.icon/>
              </Grid>
            </a>
          ))}
        </Grid>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};