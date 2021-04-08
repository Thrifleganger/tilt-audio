import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ToggleButton = ({button}) => {

  const [state, setState] = useState(button.isChecked);
  const callback = useRef(() => {});

  useEffect(() => {
    callback.current = button.buttonCallback;
  }, []);

  const handleButtonClick = () => {
    setState(!state);
    callback.current();
  }

  return (
    <FormControlLabel control={
      <Button variant="contained" color={state ? "primary" : "default"}
              onClick={event => handleButtonClick()}>
        {state ? button.nameSelected : button.nameDeselected}
      </Button>
    }/>
  );
}

ToggleButton.propTypes = {
  button: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nameSelected: PropTypes.string.isRequired,
      nameDeselected: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired,
      buttonCallback: PropTypes.func.isRequired
    }).isRequired
}

export default ToggleButton;
