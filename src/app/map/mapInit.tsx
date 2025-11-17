"use client";
import React, { useEffect, useMemo, useState } from "react";
import { raw as businessRaw } from "../../../scripts/business.ts";
import { useConfigStore } from "@/store/useConfigStore";
import { typeColorMap, typeList as typeListMap } from "@/../type/businessType";
import { LiquidGlassCard } from "./components/docker";
import styled from "styled-components";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const position = [118.881076, 31.960958];
const key = "5131350db8ad49230fd4c7f3cab4f1d8";

const MapInit = () => {
    const [businessList, setBusinessList] = useState<any[]>([]);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selected, setSelected] = useState<any | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(Object.values(typeListMap));

    const typeCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        businessList.forEach((b: any) => {
            const t = (b?.type ?? b?.category ?? "").toString();
            if (!t) return;
            counts[t] = (counts[t] ?? 0) + 1;
        });
        return counts;
    }, [businessList]);

    const filteredBusinesses = useMemo(() => {
        if (!selectedTypes || selectedTypes.length === 0) return [] as any[];
        return businessList.filter((b: any) => {
            const t = (b?.type ?? b?.category ?? "").toString();
            return selectedTypes.includes(t);
        });
    }, [businessList, selectedTypes]);

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
				zoom: 14,
				center: position,
				mapStyle: mapStyleList[7],
			});

			// 优化标记添加逻辑，使用批量添加
      const validMarkers: any[] = [];
      const markerMeta: any[] = [];

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
					
          // 保存标记和信息窗口以便后续处理
          validMarkers.push(marker);
          markerMeta.push({ marker, business });
					console.log(`已准备标记 ${index} - 坐标: [${longitude}, ${latitude}]`);
				} else {
					console.log(`业务 ${index} 缺少有效经纬度信息`);
				}
			});
			
			// 批量添加标记到地图
			if (validMarkers.length > 0) {
				amap.add(validMarkers);
				console.log(`成功批量添加 ${validMarkers.length} 个标记到地图`);
				
        markerMeta.forEach(({ marker, business }, index) => {
          marker.on('click', () => {
            setSelected(business);
            setDetailOpen(true);
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
		const businessList = businessRaw as any[];
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
        };

		loadData();
	}, []);

    useEffect(() => {
        if (filteredBusinesses.length > 0 || businessList.length > 0) {
            initializeMap(filteredBusinesses);
        }
    }, [filteredBusinesses]);

	const LegendScroll = styled.div`
		padding: 12px;
		height: 300px;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		scrollbar-color: rgba(130, 140, 180, 0.6) transparent;
		&::-webkit-scrollbar { width: 8px; }
		&::-webkit-scrollbar-track { background: transparent; }
		&::-webkit-scrollbar-thumb {
			background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.25));
			border-radius: 8px;
			border: 1px solid rgba(255, 255, 255, 0.4);
		}
		&::-webkit-scrollbar-thumb:hover {
			background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.35));
		}
	`;

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
			<div
				style={{
					position: "absolute",
					left: "20px",
					top: "20px",
					zIndex: 1000,
				}}
			>
				<LiquidGlassCard width="180px" height="auto" draggable initial={{ x: 0, y: 0 }} dragMomentum={false}>
					<LegendScroll>
          {Object.entries(typeListMap).map(([cn, key]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 8px",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "30%",
                  background: typeColorMap[key] ?? "#666",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 0 4px rgba(0,0,0,.2)",
                }}
              />
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes(key)}
                            onChange={(e) => {
                                setSelectedTypes((prev) => {
                                    if (e.target.checked) {
                                        return Array.from(new Set([...prev, key]));
                                    }
                                    return prev.filter((t) => t !== key);
                                });
                            }}
                            style={{ marginRight: 6 }}
                        />
                        <div style={{ fontSize: 14 }}>{cn}</div>
                        <div style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>{typeCounts[key] ?? 0}</div>
                    </div>
                ))}
					</LegendScroll>
				</LiquidGlassCard>
			</div>
				<Drawer
					open={detailOpen}
					onClose={() => setDetailOpen(false)}
					direction="right"
					size="420px"
				>
					<div style={{ padding: 16 }}>
						<div style={{ fontSize: 18, fontWeight: 600 }}>{selected?.name ?? "未命名业务"}</div>
						<div style={{ marginTop: 8 }}>地址：{selected?.address ?? "未知地址"}</div>
						<div style={{ marginTop: 8 }}>电话：{selected?.phone ?? selected?.tel ?? "未提供"}</div>
						<div style={{ marginTop: 8 }}>类型：{selected?.type ?? selected?.category ?? "未分类"}</div>
						{selected?.description ? (
							<div style={{ marginTop: 8 }}>描述：{selected?.description}</div>
						) : null}
					</div>
				</Drawer>
			</div>
	);
};

export default MapInit;
