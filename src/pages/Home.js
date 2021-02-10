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
      iv_data: [],
      woe_data: [],
      woe_data_extreme: [],
      dataIsReturned: false,
    };
  }

  async loadData() {
    const response = await fetch("/data");
    const json = await response.json();
    this.setState({
      iv_data: json.iv_data,
      woe_data: json.woe_data,
      woe_extreme_data: json.woe_extreme_data,
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
                    <StackedBarChart data={this.state.woe_extreme_data} />
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

              <Row>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.woe_data[0]["sub_topic_name"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.woe_data[0]["contents"]}
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
                  <strong>{this.state.woe_data[1]["sub_topic_name"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.woe_data[1]["contents"]}
                        />
                        <div className="card">
                          A gender based contents have a meduim strength at
                          distinguishing between good and bad posts. Inspite of
                          that words such as girl, female, and gender have
                          positive relation with likability of a post. And a
                          words such as women have negative relation.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.woe_data[2]["sub_topic_name"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.woe_data[2]["contents"]}
                        />
                        <div className="card">
                          An age based contents have a meduim strength at
                          distinguishing between good and bad posts. Words such
                          as Adolescent have positive relation, and words such
                          as child, and youth have negative and neutral
                          relation.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.woe_data[3]["sub_topic_name"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.woe_data[3]["contents"]}
                        />
                        <div className="card">
                          A equality based contents are suspicious at
                          distinguishing between good and bad. Words such as
                          equality and justic have positive relationship. and
                          words such as court have negative relation.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12" md="6" lg="4">
                  <strong>{this.state.woe_data[4]["sub_topic_name"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.woe_data[4]["contents"]}
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
                  <strong>{this.state.woe_data[5]["sub_topic_name"]}</strong>
                  <Row>
                    <Col sm="12">
                      <div className="card">
                        <CardBarChart
                          data={this.state.woe_data[5]["contents"]}
                        />
                        <div className="card">
                          SRH contents have a meduim strength at distinguishing
                          between good and bad posts.. Words such as
                          Reproductive health have negative relationship. and
                          words such as Abortion, HIV/AIDS, condom, and pregnant
                          have a neutral relation.
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
