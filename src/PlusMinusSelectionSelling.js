import React from "react";
import "./PlusMinusSelectionSelling.css";

class PlusMinusSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1.0
    };
  }

  increaseValue = () => {
    this.setState({
      value: parseFloat((this.state.value + 0.1).toFixed(2))
    });
    /*
    let data = {
      amount: parseFloat((this.state.value + 0.1).toFixed(2))
    };
    //this.props.parentCallBack(data);
    */
  };

  decreaseValue = () => {
    if (this.state.value === 0) {
      return;
    }
    this.setState({
      value: parseFloat((this.state.value - 0.1).toFixed(2))
    });

    /*
    let data = {
      amount: parseFloat((this.state.value - 0.1).toFixed(2))
    };
    //this.props.parentCallBack(data);
    */
  };

  sendSellingPriceToGameScreen = () => {
    this.props.parentCallBack(this.state.value);
  };

  render() {
    return (
      <div>
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
          <div>Selling price per cup: </div>
          <div>${this.state.value}</div>
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
        <button onClick={this.sendSellingPriceToGameScreen}>Set price</button>
      </div>
    );
  }
}

export default PlusMinusSelection;
