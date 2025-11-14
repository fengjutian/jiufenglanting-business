"use client";

import React, { useEffect, useRef, Fragment, useState } from "react";
import Dock from "@/components/Dock";
import dynamic from "next/dynamic";
const MapInit = dynamic(() => import("./mapInit"), { ssr: false });
import "react-modern-drawer/dist/index.css";
const Config = dynamic(() => import("./components/config").then(m => m.Config), { ssr: false });

const JiuFengMap: React.FC = () => {
	const [data, setData] = useState();

	const [isOpen, setIsOpen] = React.useState(false);
	const toggleDrawer = () => {
		console.log(11123, isOpen);
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
			<MapInit />

			<Dock
				items={items}
				panelHeight={68}
				baseItemSize={50}
				magnification={70}
			/>

			<Config isOpen={isOpen} onClose={toggleDrawer} />
		</div>
	);
};

const Position = () => {
    

	return <JiuFengMap />;
};

export default Position;
