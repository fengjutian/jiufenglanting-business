import React, { useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

const position = [118.881076,31.960958]
const key = '5131350db8ad49230fd4c7f3cab4f1d8'
 
const MapInit = () => {
  useEffect(() => {
    AMapLoader.load({
      "key": key,   // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": []  //插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
      let amap = new AMap.Map('mapContainer', { // mapcontainer为容器的id
        zoom: 15, //初始化地图层级
        center: position //初始化地图中心点
      });
      // 标记
      let marker = new AMap.Marker({
        position: position // 基点位置
      });
      // 地图添加标记
      amap.add(marker);
    }).catch(e => {
        console.log(e);
    })
  }, []);

  return (
    <div id="mapContainer" style={{ width: '100vw', height: '100vh' }}></div>
  );
};
 
export default MapInit;
