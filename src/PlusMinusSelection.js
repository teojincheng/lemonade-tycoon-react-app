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
      <div className="selection-block">
        <button onClick={this.decreaseValue}>
          <img
            className="button-img"
            src={process.env.PUBLIC_URL + "/icons/minus-icon.png"}
            alt=""
          />
        </button>

        <span className="vertical-center">{this.props.name}: </span>
        <span className="empty-space"></span>
        <span className="vertical-center">{this.state.value}</span>
        <div className="vertical-center">
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
