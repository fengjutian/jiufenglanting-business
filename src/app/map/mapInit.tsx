import React, { useEffect, useState } from 'react';
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

  const businessRes = await fetch('/api/business');
  const businessList = await businessRes.json();

  console.log(12, businessList);
  return businessList;
};

// 导出业务数据为Excel的函数
const exportBusinessToExcel = async () => {
  try {
    // 创建一个隐藏的链接元素
    const link = document.createElement('a');
    
    // 设置链接指向导出API，带上export=excel参数
    link.href = '/api/business?export=excel';
    
    // 设置下载属性，这样浏览器会触发下载而不是导航
    link.setAttribute('download', `business_export_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    // 将链接添加到文档中
    document.body.appendChild(link);
    
    // 模拟点击链接触发下载
    link.click();
    
    // 下载完成后移除链接
    document.body.removeChild(link);
    
    console.log('Excel文件导出成功');
  } catch (error) {
    console.error('导出Excel失败:', error);
    alert('导出Excel失败，请稍后重试');
  }
};
 
const MapInit = () => {
  const [businessList, setBusinessList] = useState<any[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await getBusinessData();
      setBusinessList(data);
    };
    
    loadData();
    initializeMap();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div id="mapContainer" style={{ width: '100%', height: '100%' }}></div>
      
      {/* 导出按钮 - 固定在地图右上角 */}
      <button 
        onClick={exportBusinessToExcel}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: '#1677ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        导出Excel
      </button>
    </div>
  );
};
 
export default MapInit;
