"use client";

import React, { useEffect, useRef, Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";
import Dock from "@/components/Dock";
import MapInit from "./mapInit";
import FluidGlass from "./components/FluidGlass";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Config } from "./components/config";

const JiuFengMap: React.FC = () => {
	const [data, setData] = useState();

	// 确保在客户端环境中渲染地图组件
	if (typeof window === "undefined") {
		return;
	}

	const [isOpen, setIsOpen] = React.useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const items = [
		{
			icon: <span style={{ fontSize: "18px" }}>🏠</span>,
			label: "Home",
			onClick: () => alert("Home!"),
		},
		{
			icon: <span style={{ fontSize: "18px" }}>🗃️</span>,
			label: "Archive",
			onClick: () => alert("Archive!"),
		},
		{
			icon: <span style={{ fontSize: "18px" }}>👤</span>,
			label: "Profile",
			onClick: () => alert("Profile!"),
		},
		{
			icon: <span style={{ fontSize: "18px" }}>⚙️</span>,
			label: "Settings",
			onClick: () => toggleDrawer(),
		},
	];

	return (
		<div>
			{/* <div style={{ height: '600px', position: 'relative' }}>
        <FluidGlass 
          mode="lens" // or "bar", "cube"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01  
          }}
        />
      </div> */}

			<MapInit />

			<Dock
				items={items}
				panelHeight={68}
				baseItemSize={50}
				magnification={70}
			/>

			<Config isOpen={isOpen} />
		</div>
	);
};

const Position = () => {
	// 确保在客户端环境中渲染 APILoader
	if (typeof window === "undefined") {
		return;
	}

	return <JiuFengMap />;
};

export default Position;
