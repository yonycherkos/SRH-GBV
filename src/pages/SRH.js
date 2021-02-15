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
    const response = await fetch("https://srh-flask.herokuapp.com/api/SRH");
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
                    <strong>Sexual Reproductive Health</strong>
                  </div>
                </Col>
              </Row>
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
                          Content size is very weak at distinguishing between
                          bad and good posts. A longer post that has greater
                          than 600 characters or 100 words has more likes,
                          comments, and shares than a short post that has less
                          than 300 characters or 50 words.
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
                          Images are suspicious or too good to distinguish
                          between good and bad posts. Based on the data a post
                          that has an image has fewer likes, comments, and
                          shares than a post with no image. This is because
                          based on the scraped data most of the posts with an
                          image have fewer text contents.
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
                          Links have very little information to distinguish
                          between good and bad posts. Based on the data a post
                          with a link has little bit higher likes, comments, and
                          shares than a post with no link.
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
                          Language type which whether the post is in Amharic or
                          English has very little information to distinguish
                          between good and bad posts. Based on the data an
                          English post has a little bit higher likes, comments,
                          and shares than an Amharic post.
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
                          A time at which a post is posted has strong
                          information at distinguishing between good and bad
                          posts. Based on the data posts which have been posted
                          early in the morning and at late night have higher
                          likes, comments, and shares. And posts that have been
                          posted in the morning, in the afternoon, in the
                          evening, and at night have much fewer likes, comments,
                          and shares.
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
