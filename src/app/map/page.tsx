'use client'

import React, { useEffect, useRef, Fragment, useState } from 'react';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation } from '@uiw/react-amap';

const JiuFengMap : React.FC = () => {
  const [data, setData] = useState();

  return (
    <div>
      <Map style={{ height: '100vh' }}>
      <ScaleControl offset={[16, 30]} position="LB" />
      <ToolBarControl offset={[16, 10]} position="RB" />
      <ControlBarControl offset={[16, 180]} position="RB" />
      <Geolocation
          maximumAge={100000}
          borderRadius="5px"
          position="RB"
          offset={[16, 80]}
          zoomToAccuracy={true}
          showCircle={true}
          onComplete={(data: any) => {
              console.log('返回数据：', data);
              setData(data);
          }}
      />
      </Map>
    </div>
  );
}

const Position = () => (
  <APILoader version="2.0.5" akey="5131350db8ad49230fd4c7f3cab4f1d8">
    <JiuFengMap />
  </APILoader>
)
export default Position
