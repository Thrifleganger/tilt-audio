import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarLink: {
    padding: theme.spacing(2),
    flexShrink: 0,
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const {sections} = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography component="h2" variant="h3" color="inherit" noWrap className={classes.toolbarTitle}>
          <b>tilt</b> audio
        </Typography>
        {sections.map((section) => (
          <Link color="inherit" noWrap key={section.title} href={section.route} className={classes.toolbarLink}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array
};