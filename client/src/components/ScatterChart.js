import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts'
import axios from 'axios';

function ScatterChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios.get('/api/scatterData')
      .then(response => {
        // 데이터 수신 후 상태에 저장
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // 데이터가 업데이트될 때마다 Scatter 그래프 그리기
    const chartContainer = document.getElementById('scatter-chart');
    const myChart = echarts.init(chartContainer);

    const option = {
      title: {
        text: 'API Response',
      },
      xAxis: {
        type: 'time',
        //type: 'value',
        name: 'req 시간',
      },
      yAxis: {
        type: 'value',
        name: '응답 시간(ms)',
      },
      series: [
        {
          type: 'scatter',
          data: data, // 서버에서 받은 데이터를 사용
          symbolSize: 10, // 데이터 포인트 크기 설정 (선택 사항)
          /* 
          툴팁 작동이 안된다 ㅠㅠ
          tooltip: {
            formatter: function (params) {
              // 툴팁 내용을 설정합니다.
              return '11'; // 세 번째 열에 툴팁 내용이 저장되어 있다고 가정합니다.
            },
          },
           */
        },
      ],
    };

    myChart.setOption(option);
  }, [data]);

  return <div id="scatter-chart" style={{ width: '100%', height: '400px' }}></div>;
}

export default ScatterChart;