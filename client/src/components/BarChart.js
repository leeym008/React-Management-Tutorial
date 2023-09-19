import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 15 },
  { x: 4, y: 7 },
];

function SimpleScatterChart() {
  return (
    <ScatterChart
      width={400}
      height={400}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <CartesianGrid />
      <XAxis dataKey="x" type="number" />
      <YAxis dataKey="y" type="number" />
      <Scatter data={data} fill="#8884d8" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    </ScatterChart>
  );
}

export default SimpleScatterChart;