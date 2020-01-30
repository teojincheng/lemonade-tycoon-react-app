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

  renderDisplayName() {
    if (this.props.name === "lemon") {
      return (
        <div>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/lemonIcon.png"}
            alt="lemon icon"
          />
          {this.props.displayName}
        </div>
      );
    } else if (this.props.name === "sugar") {
      return (
        <div>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/sugarIcon.png"}
            alt="sugar icon"
          />
          {this.props.displayName}
        </div>
      );
    } else if (this.props.name === "ice") {
      return (
        <div>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/iceIcon.png"}
            alt="ice icon"
          />
          {this.props.displayName}
        </div>
      );
    }
  }

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
        <div>
          {this.props.hasIcon === "true"
            ? this.renderDisplayName()
            : this.props.displayName}
        </div>
        <div className="vertical-center">{this.state.value}</div>
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
