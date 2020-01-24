import React from "react";
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        onClick={this.props.onClickFunction}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
