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

export default class SimpleBarChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={730} height={250} data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sub_topic_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="iv" fill="#4562ec" />
          {/* <Bar type="monotone" dataKey="pv" fill="#a6b4bf" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
