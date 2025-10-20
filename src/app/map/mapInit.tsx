import React, { useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
 
const MapInit = () => {
    useEffect(() => {
        AMapLoader.load({
            "key": "5131350db8ad49230fd4c7f3cab4f1d8",   // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": []  //插件列表
        }).then((AMap) => {
            let amap = new AMap.Map('mapContainer', { // mapcontainer为容器的id
                zoom: 15, //初始化地图层级
                center: [118.881121,31.960383] //初始化地图中心点
            });
            // 标记
            let marker = new AMap.Marker({
                position: [118.881121,31.960383] // 基点位置
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
