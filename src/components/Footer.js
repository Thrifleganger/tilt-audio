import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};