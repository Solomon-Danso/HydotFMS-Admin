import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { apiServer } from '../../data/Endpoint';

const LineChart = () => {
  const { currentMode } = useStateContext();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [sparkLineData, setSparkLineData] = useState([]);

  useEffect(() => {
    try {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
      setUserInfo(parsedData);
    } catch (error) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "YearlyContinent", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
          // Transform data to match the structure of lineCustomSeries
          const formattedData = data.map(item => ({
            dataSource: item.dataSource.map(point => ({ x: new Date(point.x * 1000), y: point.y })), // Convert timestamp to Date object
            xName: item.xName,
            yName: item.yName,
            name: item.name,
            width: item.width,
            marker: item.marker,
            type: item.type
          }));
          setSparkLineData(formattedData);
        })
        .catch(error => console.error(error));
    }
  }, [userInfo]);

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={{ valueType: 'DateTime', labelFormat: 'y' }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {sparkLineData.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
