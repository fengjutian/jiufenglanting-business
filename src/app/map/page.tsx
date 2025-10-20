'use client'

import React, { useEffect, useRef, Fragment, useState } from 'react';
import { Button } from "@/components/ui/button"

// 延迟导入 AMap 组件，确保只在客户端执行
let Map: any;
let APILoader: any;
let ScaleControl: any;
let ToolBarControl: any;
let ControlBarControl: any;
let Geolocation: any;

// 仅在客户端环境中加载 AMap 组件
if (typeof window !== 'undefined') {
  const AMapComponents = require('@uiw/react-amap');
  Map = AMapComponents.Map;
  APILoader = AMapComponents.APILoader;
  ScaleControl = AMapComponents.ScaleControl;
  ToolBarControl = AMapComponents.ToolBarControl;
  ControlBarControl = AMapComponents.ControlBarControl;
  Geolocation = AMapComponents.Geolocation;
}

const JiuFengMap : React.FC = () => {
  const [data, setData] = useState();

  // 确保在客户端环境中渲染地图组件
  if (typeof window === 'undefined') {
    return <div>地图加载中...</div>;
  }

  return (
    <div>
      <Button>Click me</Button>
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

const Position = () => {
  // 确保在客户端环境中渲染 APILoader
  if (typeof window === 'undefined') {
    return <div>地图加载中...</div>;
  }

  return (
    <APILoader version="2.0.5" akey="5131350db8ad49230fd4c7f3cab4f1d8">
      <JiuFengMap />
    </APILoader>
  );
}

export default Position
