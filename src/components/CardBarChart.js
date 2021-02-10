import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

export default class CardBarChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={730} height={250} data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="content" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="woe" fill="#0336FF" />
          {/* <Bar type="monotone" dataKey="woe" fill="#49e8c2" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
