import React from "react";
import "./NumberInput.css";

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ""
    };
  }

  updateInput = event => {
    this.setState({
      inputVal: event.target.value
    });
  };

  render() {
    return <input type="number" value="0" />;
  }
}

export default NumberInput;
