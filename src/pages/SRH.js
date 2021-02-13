import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import SimpleBarChart from "../components/SimpleBarChart";
import CardBarChart from "../components/CardBarChart";
import StackedBarChart from "../components/StackedBarChart";

export default class SRH extends Component {
  constructor() {
    super();

    this.loadData = this.loadData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      SRH_iv_data: [],
      SRH_woe_data: [],
      dataIsReturned: false,
    };
  }

  async loadData() {
    const response = await fetch("/SRH");
    const json = await response.json();
    this.setState({
      SRH_iv_data: json.SRH_iv_data,
      SRH_woe_data: json.SRH_woe_data,
      SRH_woe_extreme_data: json.SRH_woe_extreme_data,
      dataIsReturned: false,
    });
  }

  async componentDidMount() {
    await this.loadData();
    this.setState({ dataIsReturned: true });
    console.log(this.state.SRH_woe_extreme_data);
  }

  render() {
    return (
      <div>
        <div className="main-content">
          {this.state.dataIsReturned ? (
            <Container fluid={true}>
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
                  <strong>Weight of Evidence</strong>
                  <div className="card linechart">
                    <StackedBarChart
                      data={this.state.SRH_woe_extreme_data}
                      xAxisDatkey="feature"
                      legendDatakey="woe"
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

              {/* display content size, image, and link rows */}
              <Row>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.SRH_woe_data[0]["feature"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.SRH_woe_data[0]["contents"]}
                        />
                        <div className="card">
                          A longer post which have more than 600 characters or
                          more than 100 words is more likely to have more likes,
                          comments, and shares. A post smaller than 300
                          characters or less than 50 words less recommended.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.SRH_woe_data[1]["feature"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.SRH_woe_data[1]["contents"]}
                        />
                        <div className="card">
                          GBV contents are suspicious at distinguishing between
                          good and bad. Words such as rape, sexual harassment
                          and sexual violence have positive relationship. and
                          words such as gender-based violence and child sexual
                          abuse have negative relation.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.SRH_woe_data[2]["feature"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.SRH_woe_data[2]["contents"]}
                        />
                        <div className="card">
                          A longer post which have more than 600 characters or
                          more than 100 words is more likely to have more likes,
                          comments, and shares. A post smaller than 300
                          characters or less than 50 words less recommended.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* display language and time rows */}
              <Row>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.SRH_woe_data[3]["feature"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.SRH_woe_data[3]["contents"]}
                        />
                        <div className="card">
                          GBV contents are suspicious at distinguishing between
                          good and bad. Words such as rape, sexual harassment
                          and sexual violence have positive relationship. and
                          words such as gender-based violence and child sexual
                          abuse have negative relation.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.SRH_woe_data[4]["feature"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.SRH_woe_data[4]["contents"]}
                        />
                        <div className="card">
                          A longer post which have more than 600 characters or
                          more than 100 words is more likely to have more likes,
                          comments, and shares. A post smaller than 300
                          characters or less than 50 words less recommended.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          ) : null}
        </div>
      </div>
    );
  }
}
