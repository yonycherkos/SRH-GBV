import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import SimpleBarChart from "../components/SimpleBarChart";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default class Home extends Component {
  constructor() {
    super();

    this.loadData = this.loadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      postData: "",
      iv_data: [],
      woe_data: [],
      dataIsReturned: false,
    };
  }

  async loadData() {
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postData: this.state.postData }),
    });
    const json = await response.json();
    this.setState({
      iv_data: json.iv_data,
      woe_data: json.woe_data,
    });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ postData: event.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.loadData();
    this.setState({ dataIsReturned: true });
  }

  render() {
    return (
      <div>
        <div className="main-content">
          <Container fluid={true}>
            <Row>
              <Col sm="12">
                <div className="card intro">
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="textArea">Post Text</Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="textArea"
                        placeholder="write or paste a text post to analyse"
                        onChange={this.handleChange}
                        style={{ height: 200 }}
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Visualize
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>

            {this.state.dataIsReturned ? (
              <div>
                <Row>
                  <Col sm="12" md="12" lg="6">
                    <strong>Information Value</strong>
                    <div className="card linechart">
                      <SimpleBarChart
                        data={this.state.iv_data}
                        xAxisDatkey="sub_topic_name"
                        legendDatakey="iv"
                      />
                    </div>
                  </Col>

                  <Col sm="12" md="12" lg="6">
                    <strong>Weight of Evidences</strong>
                    <div className="card linechart">
                      <SimpleBarChart
                        data={this.state.woe_data}
                        xAxisDatkey="content"
                        legendDatakey="woe"
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12">
                    <div className="card intro">
                      Information Value gives a measure of how the feature
                      sub-topics is good in distinguishing between a good and
                      bad post. The weight of evidence measures the predictive
                      power of an individual features in relation to the
                      dependent variable. Based on the graph equality based
                      contents such as equality, court, justice, society, and
                      our voice are good in distinguish contents. And gender
                      based contents such as gender, girl, women, and female are
                      bad in distinguish contents
                    </div>
                  </Col>
                </Row>
              </div>
            ) : null}
          </Container>
        </div>
      </div>
    );
  }
}
