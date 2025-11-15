"use client";
import React, { useEffect, useState } from "react";
import { raw as businessRaw } from "../../../scripts/business.ts";
import { useConfigStore } from "@/store/useConfigStore";
import { typeColorMap } from "@/../type/businessType";

	const position = [118.881076, 31.960958];
	const key = "5131350db8ad49230fd4c7f3cab4f1d8";

const MapInit = () => {
	const [businessList, setBusinessList] = useState<any[]>([]);

	const mapTheme = useConfigStore((state: any) => state.mapTheme?.store);
	const mapThemeByName = useConfigStore((state: any) => state.mapTheme?.mapThemeByName);

	console.log(mapTheme);
	console.log(mapThemeByName);

	const mapStyleList = mapTheme.map((item: any) => item.theme);

	const initializeMap = async (businessData: any[] = []): Promise<void> => {
    try {
      const { default: AMapLoader } = await import("@amap/amap-jsapi-loader");
      const AMap = await AMapLoader.load({
          key: key, // 申请好的Web端开发者Key
          version: "2.0", // 指定要加载的 JSAPI 的版本
          plugins: [], //插件列表
      });

			// 创建地图实例
			const amap = new AMap.Map("mapContainer", {
				zoom: 15, //初始化地图层级
				center: position,
				mapStyle: mapStyleList[0],
			});

			// 优化标记添加逻辑，使用批量添加
			const validMarkers: any[] = [];
			const markerInfoWindows: any[] = [];

			businessData.forEach((business, index) => {
				console.log(`业务数据 ${index}:`, business);
				// 尝试多种可能的经纬度字段名
				let lng = null;
				let lat = null;
				
				// 检查各种可能的经纬度字段名
				if (business.longitude && business.latitude) {
					lng = business.longitude;
					lat = business.latitude;
				} else if (business.lng && business.lat) {
					lng = business.lng;
					lat = business.lat;
				} else if (business.Lng && business.Lat) {
					lng = business.Lng;
					lat = business.Lat;
				} else if (business.LONGITUDE && business.LATITUDE) {
					lng = business.LONGITUDE;
					lat = business.LATITUDE;
				}
				
				// 转换为数字
				const longitude = parseFloat(lng);
				const latitude = parseFloat(lat);
				
				console.log(`业务 ${index} 经纬度:`, longitude, latitude);
				
				// 检查经纬度是否有效 - 高德地图使用 [longitude, latitude] 顺序
				if (!isNaN(longitude) && !isNaN(latitude) && longitude !== null && latitude !== null && 
				    longitude >= -180 && longitude <= 180 && latitude >= -90 && latitude <= 90) {
					const color = typeColorMap[(business.type ?? '').toString()] ?? '#666';
					const marker = new AMap.Marker({
						position: [longitude, latitude],
						title: business.name || `业务点 ${index}`,
						content: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 4px rgba(0,0,0,.3)"></div>`,
						offset: new AMap.Pixel(-10, -10)
					});
					
					// 创建信息窗口
					const infoWindow = new AMap.InfoWindow({
						content: `
							<div style="padding: 10px;">
								<h3>${business.name || business.title || '未命名业务'}</h3>
								<p>地址: ${business.address || business.location || '未知地址'}</p>
								<p>电话: ${business.phone || business.tel || '未提供'}</p>
								<p>类型: ${business.type || business.category || '未分类'}</p>
							</div>
						`,
						offset: new AMap.Pixel(0, -30),
					});
					
					// 保存标记和信息窗口以便后续处理
					validMarkers.push(marker);
					markerInfoWindows.push({ marker, infoWindow });
					console.log(`已准备标记 ${index} - 坐标: [${longitude}, ${latitude}]`);
				} else {
					console.log(`业务 ${index} 缺少有效经纬度信息`);
				}
			});
			
			// 批量添加标记到地图
			if (validMarkers.length > 0) {
				amap.add(validMarkers);
				console.log(`成功批量添加 ${validMarkers.length} 个标记到地图`);
				
				// 为每个标记绑定点击事件
				markerInfoWindows.forEach(({ marker, infoWindow }, index) => {
					marker.on('click', () => {
						try {
							infoWindow.open(amap, marker.getPosition());
							console.log(`打开标记 ${index} 的信息窗口`);
						} catch (err) {
							console.error(`打开信息窗口失败 ${index}:`, err);
						}
					});
				});
			} else {
				console.log('没有有效的标记可以添加到地图');
			}
		} catch (error) {
				console.error("地图初始化失败:", error);
			} finally {
				console.log(`地图初始化完成，共处理 ${businessData.length} 条业务数据`);
			}
	};

	const getBusinessData = async () => {
		const res = await fetch("/api/excel");
		const list = await res.json();

		console.log(list);

		const businessList = businessRaw as any[];

		console.log(12, businessList);
		return businessList;
	};

	// 导出业务数据为Excel的函数
	const exportBusinessToExcel = async () => {
		try {
			// 创建一个隐藏的链接元素
			const link = document.createElement("a");

			// 设置链接指向导出API，带上export=excel参数
			link.href = "/api/business?export=excel";

			// 设置下载属性，这样浏览器会触发下载而不是导航
			link.setAttribute(
				"download",
				`business_export_${new Date().toISOString().split("T")[0]}.xlsx`,
			);

			// 将链接添加到文档中
			document.body.appendChild(link);

			// 模拟点击链接触发下载
			link.click();

			// 下载完成后移除链接
			document.body.removeChild(link);

			console.log("Excel文件导出成功");
		} catch (error) {
			console.error("导出Excel失败:", error);
			alert("导出Excel失败，请稍后重试");
		}
	};

// 导入Excel文件的函数
const importBusinessFromExcel = async (file: File) => {
	try {
		// 显示加载提示
		const loading = document.createElement("div");
		loading.textContent = "正在导入数据...";
		loading.style.position = "fixed";
		loading.style.top = "50%";
		loading.style.left = "50%";
		loading.style.transform = "translate(-50%, -50%)";
		loading.style.padding = "20px";
		loading.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		loading.style.color = "white";
		loading.style.borderRadius = "8px";
		loading.style.zIndex = "9999";
		document.body.appendChild(loading);

		// 创建FormData对象
		const formData = new FormData();
		formData.append("file", file);

		// 发送请求到导入API
		const response = await fetch("/api/business?import=excel", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();

		// 移除加载提示
		document.body.removeChild(loading);

		// 显示导入结果
		if (result.success) {
			let message = result.message;
			if (result.errorCount > 0) {
				message += "\n\n错误详情：\n" + result.errors.join("\n");
			}
			alert(message);

			// 导入成功后刷新数据
			if (result.successCount > 0) {
				const data = await getBusinessData();
				setBusinessList(data);
			}
		} else {
			alert(
				"导入失败：" +
					result.error +
					(result.details ? "\n" + result.details : ""),
			);
		}
	} catch (error) {
		console.error("导入Excel失败:", error);
		alert("导入Excel失败，请稍后重试");
	}
};

// 处理文件选择
const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
	const file = event.target.files?.[0];
	if (!file) return;

	// 检查文件类型
	if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
		alert("请选择.xlsx或.xls格式的Excel文件");
		return;
	}

	// 调用导入函数
	importBusinessFromExcel(file);

	// 重置文件输入，允许重复选择同一个文件
	event.target.value = "";
};

	useEffect(() => {
		const loadData = async () => {
			const data = await getBusinessData();
			setBusinessList(data);
			// 数据加载完成后初始化地图并显示业务点
			initializeMap(data);
		};

		loadData();
	}, []);

	// 当业务数据变化时重新渲染地图标记
	useEffect(() => {
		if (businessList.length > 0) {
			initializeMap(businessList);
		}
	}, [businessList]);

	return (
		<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
			<div id="mapContainer" style={{ width: "100%", height: "100%" }}></div>
			<div
				style={{
					position: "absolute",
					top: "20px",
					right: "20px",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					zIndex: 1000,
				}}
			>
				{/* 导出按钮 */}
				{/* <button
					onClick={exportBusinessToExcel}
					style={{
						backgroundColor: "#1677ff",
						color: "white",
						border: "none",
						borderRadius: "4px",
						padding: "8px 16px",
						fontSize: "14px",
						cursor: "pointer",
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
					}}
				>
					导出Excel
				</button> */}

				{/* 导入按钮 - 使用label包裹input，实现美观的文件选择按钮 */}
				{/* <label
					style={{
						backgroundColor: "#52c41a",
						color: "white",
						border: "none",
						borderRadius: "4px",
						padding: "8px 16px",
						fontSize: "14px",
						cursor: "pointer",
						textAlign: "center",
						display: "block",
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
					}}
				>
					导入Excel
					<input
						type="file"
						accept=".xlsx,.xls"
						onChange={handleFileSelect}
						style={{
							display: "none",
						}}
					/>
				</label> */}
			</div>
		</div>
	);
};

export default MapInit;
