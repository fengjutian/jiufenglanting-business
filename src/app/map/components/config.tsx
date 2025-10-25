import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styled from "styled-components";

import { useState, useEffect } from "react";

type configType = {
	isOpen: boolean;
	onClose?: () => void;
};

const DrawerContent = styled.div`
	padding: 20px;

`;

export const Config: React.FC<configType> = (props: configType) => {
	const toggleDrawer = () => {
		props.onClose?.();
	};

	return (
		<div>
			<Drawer
				open={props.isOpen}
				onClose={toggleDrawer}
				direction="right"
				className="bla bla bla"
				size="600px"
			>
				<DrawerContent>
					<p>地图主题配置：</p>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
