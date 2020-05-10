import React, { Component } from "react";
import { Button } from "antd";

export default class DangerButton extends Component {
  render() {
    return (
      <div>
        <Button
          type="danger"
          htmlType="submit"
          className="btn-block"
          onClick = {() => this.props.handleBlock('#ff7875')}
        >
          Click to make Red
        </Button>
      </div>
    );
  }
}
