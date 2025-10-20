import React, { useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

const position = [118.881076,31.960958]
const key = '5131350db8ad49230fd4c7f3cab4f1d8'

const mapStyleList = [
  'amap://styles/normal',
  'amap://styles/dark',
  'amap://styles/light',
  'amap://styles/whitesmoke',
  'amap://styles/fresh',
  'amap://styles/grey',
  'amap://styles/graffiti',
  'amap://styles/macaron',
  'amap://styles/blue',
  'amap://styles/darkblue',
  'amap://styles/wine',
]

const initializeMap = async (): Promise<void> => {
  try {
    const AMap = await AMapLoader.load({
      "key": key,   // 申请好的Web端开发者Key
      "version": "2.0",   // 指定要加载的 JSAPI 的版本
      "plugins": []  //插件列表
    });
    
    // 创建地图实例
    const amap = new AMap.Map('mapContainer', {
      zoom: 15, //初始化地图层级
      center: position,
      mapStyle: mapStyleList[0],
    });
    
    // 创建标记
    const marker = new AMap.Marker({
      position: position // 基点位置
    });
    amap.add(marker);
  } catch (error) {
    console.error('地图初始化失败:', error);
  }
};

const getBusinessData = async () => {
  const res = await fetch('/api/excel');
  const list = await res.json();

  console.log(list);

}
 
const MapInit = () => {
  useEffect(() => {
    getBusinessData();
    initializeMap();
  }, []);

  return (
    <div id="mapContainer" style={{ width: '100vw', height: '100vh' }}></div>
  );
};
 
export default MapInit;
