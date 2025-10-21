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

// 导入Excel文件的函数
const importBusinessFromExcel = async (file: File) => {
  try {
    // 显示加载提示
    const loading = document.createElement('div');
    loading.textContent = '正在导入数据...';
    loading.style.position = 'fixed';
    loading.style.top = '50%';
    loading.style.left = '50%';
    loading.style.transform = 'translate(-50%, -50%)';
    loading.style.padding = '20px';
    loading.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    loading.style.color = 'white';
    loading.style.borderRadius = '8px';
    loading.style.zIndex = '9999';
    document.body.appendChild(loading);
    
    // 创建FormData对象
    const formData = new FormData();
    formData.append('file', file);
    
    // 发送请求到导入API
    const response = await fetch('/api/business?import=excel', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    // 移除加载提示
    document.body.removeChild(loading);
    
    // 显示导入结果
    if (result.success) {
      let message = result.message;
      if (result.errorCount > 0) {
        message += '\n\n错误详情：\n' + result.errors.join('\n');
      }
      alert(message);
      
      // 导入成功后刷新数据
      if (result.successCount > 0) {
        const data = await getBusinessData();
        setBusinessList(data);
      }
    } else {
      alert('导入失败：' + result.error + (result.details ? '\n' + result.details : ''));
    }
  } catch (error) {
    console.error('导入Excel失败:', error);
    alert('导入Excel失败，请稍后重试');
  }
};

// 处理文件选择
const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  
  // 检查文件类型
  if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
    alert('请选择.xlsx或.xls格式的Excel文件');
    return;
  }
  
  // 调用导入函数
  importBusinessFromExcel(file);
  
  // 重置文件输入，允许重复选择同一个文件
  event.target.value = '';
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
      
      {/* 操作按钮区域 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1000
      }}>
        {/* 导出按钮 */}
        <button 
          onClick={exportBusinessToExcel}
          style={{
            backgroundColor: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          导出Excel
        </button>
        
        {/* 导入按钮 - 使用label包裹input，实现美观的文件选择按钮 */}
        <label
          style={{
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'block',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          导入Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            style={{
              display: 'none'
            }}
          />
        </label>
      </div>
    </div>
  );
};
 
export default MapInit;
