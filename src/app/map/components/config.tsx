import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styled from "styled-components";
import { useConfigStore } from "@/store/useConfigStore";
import { Box, RadioCards, Text, Flex } from "@radix-ui/themes";

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

	const mapTheme = useConfigStore((state: any) => state.mapTheme?.store);

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

					<Box maxWidth="600px">
						<RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "3" }}>
							{
								mapTheme.map((item: any) => (
									<RadioCards.Item key={item.label} value={item.theme}>
										<Flex direction="column" width="100%">
											<Text weight="bold">{item.name}</Text>
											<Text>{item.description}</Text>
										</Flex>
									</RadioCards.Item>
								))
							}
						</RadioCards.Root>
					</Box>
					
				</DrawerContent>
			</Drawer>
		</div>
	);
};
