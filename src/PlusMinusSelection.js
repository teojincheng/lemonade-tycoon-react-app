import React from "react";
import "./PlusMinusSelection.css";

class PlusMinusSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  increaseValue = () => {
    this.setState({
      value: this.state.value + 1
    });
    let data = {
      name: this.props.name,
      amount: this.state.value + 1
    };
    this.props.parentCallBack(data);
  };

  decreaseValue = () => {
    if (this.state.value === 0) {
      return;
    }
    this.setState({
      value: this.state.value - 1
    });

    let data = {
      name: this.props.name,
      amount: this.state.value - 1
    };
    this.props.parentCallBack(data);
  };

  render() {
    return (
      <div className="wrapper">
        <div>
          <button onClick={this.decreaseValue}>
            <img
              className="button-img"
              src={process.env.PUBLIC_URL + "/icons/minus-icon.png"}
              alt=""
            />
          </button>
        </div>
        <div>{this.props.displayName}:</div>
        <div>{this.state.value}</div>
        <div>
          <button onClick={this.increaseValue}>
            <img
              className="button-img"
              src={process.env.PUBLIC_URL + "/icons/PlusVector.png"}
              alt=""
            />
          </button>
        </div>
      </div>
    );
  }
}

export default PlusMinusSelection;
