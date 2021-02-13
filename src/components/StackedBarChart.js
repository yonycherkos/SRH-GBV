import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  Bar,
} from "recharts";

export default class StackedBarChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={730} height={250} data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="min_woe" fill="#0336FF" stackId="stack" />
          <Bar dataKey="max_woe" fill="#0336FF" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
