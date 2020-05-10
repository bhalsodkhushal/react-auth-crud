import React, { Component } from "react";
import { Button } from "antd";

export default class PrimaryButton extends Component {
  render() {
    return (
      <div>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-block"
          onClick={() => this.props.handleBlock("#1890ff")}
        >
          Click to make Blue
        </Button>
      </div>
    );
  }
}
