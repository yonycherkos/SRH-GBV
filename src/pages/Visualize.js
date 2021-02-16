import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import SimpleBarChart from "../components/SimpleBarChart";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default class Home extends Component {
  constructor() {
    super();

    this.loadData = this.loadData.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      text: "",
      image: "no_image",
      link: "no_link",
      language: "en",
      time: "Late Night",
      SRH_iv_data: null,
      SRH_woe_data: null,
      GBV_iv_data: null,
      GBV_woe_data: null,
    };
  }

  async loadData() {
    const response = await fetch("https://srh-flask.herokuapp.com/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.text,
        image: this.state.image,
        link: this.state.link,
        language: this.state.language,
        time: this.state.time,
      }),
    });
    const json = await response.json();
    this.setState({
      SRH_iv_data: json.SRH_iv_data,
      SRH_woe_data: json.SRH_woe_data,
      GBV_iv_data: json.GBV_iv_data,
      GBV_woe_data: json.GBV_woe_data,
    });
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleImageChange(event) {
    this.setState({ image: event.target.value });
  }

  handleLinkChange(event) {
    this.setState({ link: event.target.value });
  }

  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
  }

  handleTimeChange(event) {
    this.setState({ time: event.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.loadData();
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
                    <FormGroup row>
                      <Label for="textArea">Post Text</Label>

                      <Input
                        type="textarea"
                        name="text"
                        id="textArea"
                        placeholder="write or paste a text post to analyse"
                        onChange={this.handleTextChange}
                        style={{ height: 200 }}
                      />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={2}>
                        Image
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="select"
                          name="image"
                          id="image"
                          onChange={this.handleImageChange}
                        >
                          <option>no_image</option>
                          <option>has_image</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={2}>
                        Link
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="select"
                          name="link"
                          id="link"
                          onChange={this.handleLinkChange}
                        >
                          <option>no_link</option>
                          <option>has_link</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={2}>
                        Language
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="select"
                          name="language"
                          id="language"
                          onChange={this.handleLanguageChange}
                        >
                          <option>en</option>
                          <option>am</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={2}>
                        Time
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="select"
                          name="time"
                          id="time"
                          onChange={this.handleTimeChange}
                        >
                          <option>Late Night</option>
                          <option>Early Morning</option>
                          <option>Morning</option>
                          <option>Noon</option>
                          <option>Eve</option>
                          <option>Night</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Visualize
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>

            {this.state.SRH_iv_data != null ? (
              <div>
                <strong>SRH</strong>
                <Row>
                  <Col sm="12" md="12" lg="6">
                    <strong>Information Value</strong>
                    <div className="card linechart">
                      <SimpleBarChart
                        data={this.state.SRH_iv_data}
                        xAxisDatkey="feature"
                        legendDatakey="iv"
                      />
                    </div>
                  </Col>

                  <Col sm="12" md="12" lg="6">
                    <strong>Weight of Evidences</strong>
                    <div className="card linechart">
                      <SimpleBarChart
                        data={this.state.SRH_woe_data}
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

            {this.state.GBV_iv_data != null ? (
              <div>
                <strong>GBV</strong>
                <Row>
                  <Col sm="12" md="12" lg="6">
                    <strong>Information Value</strong>
                    <div className="card linechart">
                      <SimpleBarChart
                        data={this.state.GBV_iv_data}
                        xAxisDatkey="feature"
                        legendDatakey="iv"
                      />
                    </div>
                  </Col>

                  <Col sm="12" md="12" lg="6">
                    <strong>Weight of Evidences</strong>
                    <div className="card linechart">
                      <SimpleBarChart
                        data={this.state.GBV_woe_data}
                        xAxisDatkey="content"
                        legendDatakey="woe"
                      />
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
