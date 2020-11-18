import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {BrowserView, MobileView} from 'react-device-detect';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarMobile: {
    display: "flex",
    justifyContent: "space-between"
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarLink: {
    padding: theme.spacing(2),
    flexShrink: 0,
    color: "inherit",
    textDecoration: "none"
  },
  light: {
    fontFamily: "TwCenMTStd-Light"
  },
  bold: {
    fontFamily: "TwCenMTStd-ExtraBold"
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const {sections} = props;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleDrawer = (value) => {
    setMenuOpen(value);
  }

  return (
    <React.Fragment>
      <BrowserView>
        <Toolbar className={classes.toolbar}>
          <Typography component="h2" variant="h3" color="inherit" noWrap className={classes.toolbarTitle}>
            <b className={classes.bold}>tilt</b><span className={classes.light}>audio</span>
          </Typography>
          {sections.map((section) => (
            <Link key={section.title} to={section.route} className={classes.toolbarLink}>
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </BrowserView>
      <MobileView>
        <Toolbar className={`${classes.toolbar} ${classes.toolbarMobile}`}>
          <Typography component="h2" variant="h3" color="inherit" noWrap className={classes.toolbarTitle}>
            <b className={classes.bold}>tilt</b><span className={classes.light}>audio</span>
          </Typography>
          <IconButton color="inherit"  edge="end" onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Drawer anchor={"right"} open={menuOpen} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
          {sections.map((section) => (
            <Link key={section.title} to={section.route} className={classes.toolbarLink}>
              {section.title}
            </Link>
          ))}
        </Drawer>
      </MobileView>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array
};