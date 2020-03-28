import React from "react";
import "./PlusMinusSelection.css";

class PlusMinusSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      recipeValue: 0
    };
  }

  increaseValue = () => {
    let data = {};
    if (this.props.hasCost === "true") {
      data.amount = this.state.value + 1;

      this.setState({
        value: this.state.value + 1
      });
    } else {
      data.amount = this.state.recipeValue + 1;

      this.setState({
        recipeValue: this.state.recipeValue + 1
      });
    }
    data.name = this.props.name;
    this.props.parentCallBack(data);
  };

  decreaseValue = () => {
    let data = {};

    if (this.props.hasCost === "true") {
      if (this.state.value === 0) {
        return;
      }

      data.amount = this.state.value - 1;
      this.setState({
        value: this.state.value - 1
      });
    } else {
      if (this.state.recipeValue === 0) {
        return;
      }

      data.amount = this.state.recipeValue - 1;

      this.setState({
        recipeValue: this.state.recipeValue - 1
      });
    }

    data.name = this.props.name;
    this.props.parentCallBack(data);
  };

  renderDisplayName() {
    if (this.props.name === "lemon") {
      return (
        <span>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/lemonIcon.png"}
            alt="lemon icon"
          />
          {this.props.displayName}
        </span>
      );
    } else if (this.props.name === "sugar") {
      return (
        <span>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/sugarIcon.png"}
            alt="sugar icon"
          />
          {this.props.displayName}
        </span>
      );
    } else if (this.props.name === "ice") {
      return (
        <span>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/iceIcon.png"}
            alt="ice icon"
          />
          {this.props.displayName}
        </span>
      );
    }
  }

  renderIconOnly() {
    if (this.props.name === "lemon") {
      return (
        <img
          className="icon-image"
          src={process.env.PUBLIC_URL + "/icons/lemonIcon.png"}
          alt="lemon icon"
        />
      );
    } else if (this.props.name === "sugar") {
      return (
        <img
          className="icon-image"
          src={process.env.PUBLIC_URL + "/icons/sugarIcon.png"}
          alt="sugar icon"
        />
      );
    } else if (this.props.name === "ice") {
      return (
        <img
          className="icon-image"
          src={process.env.PUBLIC_URL + "/icons/iceIcon.png"}
          alt="ice icon"
        />
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
          {this.props.hasCost === "true"
            ? this.renderDisplayName()
            : this.renderIconOnly()}
        </div>
        <div className="vertical-center">
          {this.props.hasCost === "true"
            ? this.state.value
            : this.state.recipeValue}
        </div>
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
