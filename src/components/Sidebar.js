import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from "@material-ui/icons/Facebook";
import {WidgetContext} from "./widgets/WidgetHome";

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2)
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  description: {
    textAlign: "justify",
    fontFamily: "TwCenMTStd-Light"
  },
  searchBox: {
    marginTop: '2em',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: "1em"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  linkStyle: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer"
  }
}));

const social = [
  {name: 'GitHub', icon: GitHubIcon, url: "https://github.com/Thrifleganger/"},
  {name: 'YouTube', icon: YouTubeIcon, url: "https://www.youtube.com/channel/UCb_NEjjKOXV9pilaSOjlkZA"},
  {name: 'Facebook', icon: FacebookIcon, url: "https://www.facebook.com/akash.murthy.319/"},
  {name: 'Instagram', icon: InstagramIcon, url: "https://www.instagram.com/thrifleganger/"},
]

export default function Sidebar(props) {
  console.log("Rendering sidebar");
  const classes = useStyles();
  const {match} = props;
  const [searchTerm,setSearchTerm] = useState(null);

  const widgets = useContext(WidgetContext);
  const selectedWidget = widgets.find(widget => widget.id === match.params.id)
  const widgetsToDisplay = widgets.filter(widget => {
    if (searchTerm == null) {
      return widget;
    } else if (widget.title.toLowerCase().includes(searchTerm.toLowerCase())
      || widget.category.toLowerCase().includes(searchTerm.toLowerCase())
      || widget.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return widget;
    }
    return null;
  });

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography className={classes.description} dangerouslySetInnerHTML={{__html: selectedWidget.shortDescription}}/>
      </Paper>

      <Paper component="form" className={classes.searchBox}>
        <InputBase
          className={classes.input}
          placeholder="Search widgets"
          inputProps={{'aria-label': 'Search widgets'}}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <SearchIcon />
      </Paper>

      <Paper>
        <List component="nav" aria-label="main mailbox folders">
          {widgetsToDisplay.map(widget => (
              <Link key={widget.id} className={classes.linkStyle} to={widget.route}>
                <ListItem button selected={selectedWidget.id === widget.id}>
                  <ListItemText primary={widget.sidebarTitle}/>
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network) => (
        <a key={network.name} className={classes.linkStyle} href={network.url} target={"_black"}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon/>
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </a>
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  social: PropTypes.array,
  widgets: PropTypes.array,
};