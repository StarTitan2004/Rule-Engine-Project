import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

const Graph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/logs.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const getTotalPacketsPerAction = () => {
    return data.reduce((acc, packet) => {
      // Extract 'action' from the message string
      const action = packet.message.match(/action: (\w+)/)?.[1];
      if (action) {
        acc[action] = (acc[action] || 0) + 1;
      }
      return acc;
    }, {});
  };

  return (
    <div>
      <h2>Network Packet Analytics</h2>
      {/* Uncomment these lines once charts are set up */}
      <BarChart data={getTotalPacketsPerAction()} title="Total Packets by Action" />
      <LineChart data={data} title="Packets Over Time" />
      <PieChart data={getTotalPacketsPerAction()} title="Action Distribution" />
    </div>
  );
};

export default Graph;
