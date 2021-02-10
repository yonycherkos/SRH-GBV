import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export default class SimpleBarChart extends React.Component {
  render() {
    console.log(this.props);
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={730} height={250} data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={this.props.xAxisDatkey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            type="monotone"
            dataKey={this.props.legendDatakey}
            fill="#0336FF"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
