import React, { useEffect } from 'react';
import * as echarts from 'echarts'

function ScatterChart() {
  useEffect(() => {
    const chartContainer = document.getElementById('scatter-chart');
    const myChart = echarts.init(chartContainer);

    const data = [
      [10, 20, 'Data Point 1'],   // x, y, tooltip
      [15, 35, 'Data Point 2'],
      [20, 45, 'Data Point 3'],
      [30, 60, 'Data Point 4'],
      [35, 70, 'Data Point 5'],
      // 추가 데이터 포인트를 여기에 추가할 수 있습니다.
    ];

    const option = {
      title: {
        text: 'Scatter Chart with Tooltip',
      },
      xAxis: {
        type: 'value',
        name: 'X Axis',
      },
      yAxis: {
        type: 'value',
        name: 'Y Axis',
      },
      series: [
        {
          type: 'scatter',
          data: data,
          tooltip: {
            formatter: function (params) {
              console.log('1111111111');
              // 툴팁 내용을 설정합니다.
              return params.data[2]; // 세 번째 열에 툴팁 내용이 저장되어 있다고 가정합니다.
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="scatter-chart" style={{ width: '100%', height: '400px' }}></div>;
}

export default ScatterChart;