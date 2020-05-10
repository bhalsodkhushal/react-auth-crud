import React, { Component } from "react";
import { Card, Row, Col } from "antd";

import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";

export default class SwapColor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      blockBGColor: "white",
    };

    this.handleBlock = this.handleBlock.bind(this)
  }

  handleBlock(color) {
    this.setState({
      blockBGColor: color
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <Row gutter={[20, 30]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12, offset: 6 }}
            md={{ span: 10, offset: 7 }}
            lg={{ span: 8, offset: 8 }}
          >
            <Card className="color-block" style={{backgroundColor:this.state.blockBGColor}}>
              <p className="text-center">Change my color using below buttons</p>
            </Card>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12, offset: 6 }}
            md={{ span: 10, offset: 7 }}
            lg={{ span: 8, offset: 8 }}
          >
            <PrimaryButton handleBlock={this.handleBlock} />
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12, offset: 6 }}
            md={{ span: 10, offset: 7 }}
            lg={{ span: 8, offset: 8 }}
          >
            <DangerButton handleBlock={this.handleBlock} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
