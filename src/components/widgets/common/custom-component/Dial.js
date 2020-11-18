import React, {useEffect, useRef, useState} from 'react';
import PrecisionInputs from 'precision-inputs/common/precision-inputs.fl-controls';
import "precision-inputs/css/precision-inputs.fl-controls.css";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const Dial = (props) => {

  const tooltipStyles = makeStyles(() => ({
    tooltip: {
      fontSize: "1.3em"
    }
  }));

  const styles = makeStyles(() => ({
    inputMenuButton: {
      marginLeft: "1em",
    },
    inputMenuForm: {
      display: "flex"
    },
    inputTextbox: {
      color: "white"
    }
  }));

  const inputFieldTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#c2f2ff"
      },
    },
  });

  const initialInputMenuState = {
    mouseX: null,
    mouseY: null,
  };

  const dialContainerRef = useRef(null);
  const dialInstance = useRef(null);
  const [text, setText] = useState(`${props.model.defaultValue} ${props.model.prefix}`);
  const [inputMenuState, setInputMenuState] = useState(initialInputMenuState);
  const [customInputValue, setCustomInputValue] = useState(props.model.defaultValue);

  useEffect(() => {
    const {minValue, maxValue, defaultValue, step} = props.model
    dialInstance.current = new PrecisionInputs.FLStandardKnob(dialContainerRef.current, {
      min: minValue,
      max: maxValue,
      initial: defaultValue,
      step: step,
      color: props.color
    });
    dialInstance.current.addEventListener('change', (event) => {
      props.changeCallback(event);
      setText(`${event.target.value} ${props.model.prefix}`);
      setCustomInputValue(event.target.value);
    });
  }, [])

  const handleRightClick = (event) => {
    event.preventDefault();
    setInputMenuState({
      mouseX: event.clientX + 10,
      mouseY: event.clientY + 10,
    });
  };

  const handleInputMenuClose = () => {
    setInputMenuState(initialInputMenuState);
  };

  const enterCustomValue = () => {
    if (customInputValue > props.model.maxValue) {
      dialInstance.current._input.max = customInputValue;
    }
    if (customInputValue < props.model.minValue) {
      dialInstance.current._input.min = customInputValue;
    }
    dialInstance.current.value = customInputValue;
    handleInputMenuClose();
  }

  console.log(`Rendering dial ${props.model.parameter}`);

  const classes = styles();

  return (
    <>
      <Tooltip classes={tooltipStyles()} title={text} placement="top" leaveDelay={400}>
        <div onContextMenu={handleRightClick} style={{cursor: 'context-menu'}}>
          <div ref={dialContainerRef}/>
          { inputMenuState.mouseY !== null ? (
            <Menu
            keepMounted
            open={true}
            onClose={handleInputMenuClose}
            anchorReference="anchorPosition"
            anchorPosition={{top: inputMenuState.mouseY, left: inputMenuState.mouseX}}>
            <MenuItem>
              <form className={classes.inputMenuForm}>
                <ThemeProvider theme={inputFieldTheme}>
                  <TextField
                    label={props.model.parameter}
                    type="number"
                    value={customInputValue}
                    onChange={(event) => setCustomInputValue(event.target.value)}
                    variant="outlined"/>
                </ThemeProvider>
                <Button className={classes.inputMenuButton} type={"submit"} variant="contained"
                        onSubmit={enterCustomValue} onClick={enterCustomValue}>
                  Go
                </Button>
              </form>
            </MenuItem>
          </Menu>
          ) : ""}
        </div>
      </Tooltip>
    </>
  );
}

Dial.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parameter: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    defaultValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired
  }),
  changeCallback: PropTypes.func.isRequired
}

export default Dial;