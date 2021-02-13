import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import SimpleBarChart from "../components/SimpleBarChart";
import StackedBarChart from "../components/StackedBarChart";
import CardBarChart from "../components/CardBarChart";

export default class Home extends Component {
  constructor() {
    super();

    this.loadData = this.loadData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      SRH_iv_data: [],
      GBV_iv_data: [],
      dataIsReturned: false,
    };
  }

  async loadData() {
    const response = await fetch("/home");
    const json = await response.json();
    this.setState({
      SRH_iv_data: json.SRH_iv_data,
      GBV_iv_data: json.GBV_iv_data,
      dataIsReturned: false,
    });
  }

  async componentDidMount() {
    await this.loadData();
    this.setState({ dataIsReturned: true });
  }

  render() {
    return (
      <div>
        <div className="main-content">
          {this.state.dataIsReturned ? (
            <Container fluid={true}>
              <Row>
                <Col sm="12">
                  <div className="card intro">
                    This is a feature visualization tool for digital content
                    related to the topics of SRH and GBV. This tool includes
                    data from different digital platforms(social media accounts,
                    groups, pages, facebook, twitter, websites both developed
                    locally and internationally) with a core focus on SRH & GBV.
                    This visualization tool visualizes the features that
                    determine the importance of SRH and GBV content.
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm="12" md="12" lg="6">
                  <strong>SRH Information Value</strong>
                  <div className="card linechart">
                    <SimpleBarChart
                      data={this.state.SRH_iv_data}
                      xAxisDatkey="feature"
                      legendDatakey="iv"
                    />
                  </div>
                </Col>
                <Col sm="12" md="12" lg="6">
                  <strong>GBV Information Value</strong>
                  <div className="card linechart">
                    <SimpleBarChart
                      data={this.state.GBV_iv_data}
                      xAxisDatkey="feature"
                      legendDatakey="iv"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm="12">
                  <div className="card intro">
                    Information Value gives a measure of how the feature
                    sub-topics is good in distinguishing between a good and bad
                    post. The weight of evidence measures the predictive power
                    of an individual features in relation to the dependent
                    variable. Based on the graph equality based contents such as
                    equality, court, justice, society, and our voice are good in
                    distinguish contents. And gender based contents such as
                    gender, girl, women, and female are bad in distinguish
                    contents
                  </div>
                </Col>
              </Row>
            </Container>
          ) : null}
        </div>
      </div>
    );
  }
}
