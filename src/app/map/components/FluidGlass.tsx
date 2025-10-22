/* eslint-disable react/no-unknown-property */
// 引入 Three.js 核心库
import * as THREE from "three";
// 引入 React 核心 hooks
import { useRef, useState, useEffect, memo, ReactNode } from "react";
// 引入 React Three Fiber 核心组件和 hooks
import {
	Canvas,
	createPortal,
	useFrame,
	useThree,
	ThreeElements,
} from "@react-three/fiber";
// 引入 React Three Drei 扩展组件和 hooks
import {
	useFBO, // 帧缓冲对象钩子，用于离屏渲染
	useGLTF, // GLTF 模型加载钩子
	useScroll, // 滚动控制钩子
	Image, // 3D 图像组件
	Scroll, // 滚动容器组件
	Preload, // 资源预加载组件
	ScrollControls, // 滚动控制器组件
	MeshTransmissionMaterial, // 透射材质组件，用于创建玻璃效果
	Text, // 3D 文本组件
} from "@react-three/drei";
// 引入缓动函数库
import { easing } from "maath";

// 定义流体玻璃效果的模式类型
type Mode = "lens" | "bar" | "cube";

// 导航项接口定义
interface NavItem {
	label: string; // 导航标签文本
	link: string; // 导航链接
}

// 模式属性类型定义
type ModeProps = Record<string, unknown>;

// 流体玻璃组件的属性接口
interface FluidGlassProps {
	mode?: Mode; // 渲染模式：lens（透镜）、bar（条形）或 cube（立方体）
	lensProps?: ModeProps; // 透镜模式的自定义属性
	barProps?: ModeProps; // 条形模式的自定义属性
	cubeProps?: ModeProps; // 立方体模式的自定义属性
}

// 流体玻璃效果主组件
export default function FluidGlass({
	mode = "lens",
	lensProps = {},
	barProps = {},
	cubeProps = {},
}: FluidGlassProps) {
	// 根据模式选择对应的包装组件
	const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
	// 根据模式选择对应的属性配置
	const rawOverrides =
		mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;

	// 从配置中提取导航项和其他模式属性
	const {
		navItems = [
			{ label: "Home", link: "" },
			{ label: "About", link: "" },
			{ label: "Contact", link: "" },
		],
		...modeProps
	} = rawOverrides;

	return (
		// 创建 Three.js 画布，设置相机位置和视野，启用透明背景
		<Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
			{/* 滚动控制器，设置阻尼、页面数量和滚动距离 */}
			<ScrollControls damping={0.2} pages={3} distance={0.4}>
				{/* 仅在 bar 模式下显示导航项 */}
				{mode === "bar" && <NavItems items={navItems as NavItem[]} />}
				{/* 渲染选中的包装组件，并传递模式属性 */}
				<Wrapper modeProps={modeProps}></Wrapper>
			</ScrollControls>
		</Canvas>
	);
}

// 网格属性类型定义
type MeshProps = ThreeElements["mesh"];

// 模式包装器组件的属性接口
interface ModeWrapperProps extends MeshProps {
	children?: ReactNode; // 子组件
	glb: string; // GLB 模型文件路径
	geometryKey: string; // 要使用的几何体在模型中的键名
	lockToBottom?: boolean; // 是否锁定到底部
	followPointer?: boolean; // 是否跟随鼠标指针
	modeProps?: ModeProps; // 模式特定的属性
}

// 扩展材质接口，添加缩放属性
interface ZoomMaterial extends THREE.Material {
	zoom: number; // 缩放因子
}

// 缩放网格接口定义
interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}

// 缩放组类型定义，包含缩放网格子元素
type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

// 模式包装器组件，使用 memo 优化渲染性能
const ModeWrapper = memo(function ModeWrapper({
	children,
	glb,
	geometryKey,
	lockToBottom = false,
	followPointer = true,
	modeProps = {},
	...props
}: ModeWrapperProps) {
	// 网格引用
	const ref = useRef<THREE.Mesh>(null!);
	// 加载 GLTF 模型，解构 nodes 对象
	const { nodes } = useGLTF(glb);
	// 创建帧缓冲对象，用于离屏渲染
	const buffer = useFBO();
	// 获取视口信息
	const { viewport: vp } = useThree();

	// 使用单个场景实例，避免重复创建导致的 ReactDOMClient.createRoot() 错误
	const sceneRef = useRef<THREE.Scene>();
	if (!sceneRef.current) {
		sceneRef.current = new THREE.Scene();
	}

	// 几何体宽度引用
	const geoWidthRef = useRef<number>(1);

	// 计算几何体宽度并存储
	useEffect(() => {
		const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
		// 计算几何体的边界框
		geo.computeBoundingBox();
		// 计算并存储几何体宽度
		geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
	}, [nodes, geometryKey]);

	// 每帧更新函数，处理动画和渲染逻辑
	useFrame((state, delta) => {
		const { gl, viewport, pointer, camera } = state;
		// 获取当前视口信息
		const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

		// 计算目标 X 位置（根据鼠标指针或保持中心）
		const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
		// 计算目标 Y 位置（根据是否锁定到底部或跟随鼠标指针）
		const destY = lockToBottom
			? -v.height / 2 + 0.2
			: followPointer
				? (pointer.y * v.height) / 2
				: 0;
		// 使用缓动函数平滑移动到目标位置
		easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

		// 如果未指定缩放，则根据视口和几何体宽度自动计算缩放
		if ((modeProps as { scale?: number }).scale == null) {
			const maxWorld = v.width * 0.9;
			const desired = maxWorld / geoWidthRef.current;
			ref.current.scale.setScalar(Math.min(0.15, desired));
		}

		// 离屏渲染到帧缓冲对象
		gl.setRenderTarget(buffer);
		gl.render(sceneRef.current, camera);
		gl.setRenderTarget(null);
		// 设置清除颜色（背景色）
		gl.setClearColor(0x5227ff, 1);
	});

	// 从模式属性中提取材质相关配置
	const {
		scale, // 缩放因子
		ior, // 折射率（控制玻璃效果）
		thickness, // 厚度（控制透射效果）
		anisotropy, // 各向异性（控制光线散射方向）
		chromaticAberration, // 色差（控制颜色分离效果）
		...extraMat // 其他材质属性
	} = modeProps as {
		scale?: number;
		ior?: number;
		thickness?: number;
		anisotropy?: number;
		chromaticAberration?: number;
		[key: string]: unknown;
	};

	return (
		<>
			{/* 将子组件渲染到离屏场景 */}
			{createPortal(children, sceneRef.current)}

			{/* 渲染离屏场景的内容到全屏平面 */}
			<mesh scale={[vp.width, vp.height, 1]}>
				<planeGeometry />
				<meshBasicMaterial map={buffer.texture} transparent />
			</mesh>

			{/* 渲染玻璃效果的网格 */}
			<mesh
				ref={ref}
				scale={scale ?? 0.15} // 设置缩放，默认为 0.15
				rotation-x={Math.PI / 2} // 绕 X 轴旋转 90 度（平放）
				geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry} // 使用加载的几何体
				{...props} // 传递其他网格属性
			>
				{/* 应用透射材质创建玻璃效果 */}
				<MeshTransmissionMaterial
					buffer={buffer.texture} // 使用离屏渲染的纹理
					ior={ior ?? 1.15} // 折射率，默认 1.15（稍大于空气）
					thickness={thickness ?? 5} // 厚度，默认 5
					anisotropy={anisotropy ?? 0.01} // 各向异性，默认 0.01
					chromaticAberration={chromaticAberration ?? 0.1} // 色差，默认 0.1
					{...(typeof extraMat === "object" && extraMat !== null
						? extraMat
						: {})} // 其他材质属性
				/>
			</mesh>
		</>
	);
});

// 透镜模式组件 - 使用 ModeWrapper 渲染透镜形状的玻璃效果
function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
	// 渲染透镜模式，指定 GLB 模型路径、几何体键名，并启用鼠标跟随功能
	return (
		<ModeWrapper
			glb="/assets/3d/lens.glb"
			geometryKey="Cylinder"
			followPointer
			modeProps={modeProps}
			{...p}
		/>
	);
}

// 立方体模式组件 - 使用 ModeWrapper 渲染立方体形状的玻璃效果
function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
	// 渲染立方体模式，指定 GLB 模型路径、几何体键名，并启用鼠标跟随功能
	return (
		<ModeWrapper
			glb="/assets/3d/cube.glb"
			geometryKey="Cube"
			followPointer
			modeProps={modeProps}
			{...p}
		/>
	);
}

// 条形模式组件 - 使用 ModeWrapper 渲染条形形状的玻璃效果，通常用于导航栏
function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {
	// 定义条形模式的默认材质属性
	const defaultMat = {
		transmission: 1, // 完全透明（透射）
		roughness: 0, // 无粗糙度（完全光滑）
		thickness: 10, // 材质厚度，影响透射效果
		ior: 1.15, // 折射率，控制光的弯曲程度
		color: "#ffffff", // 基础颜色
		attenuationColor: "#ffffff", // 光衰减颜色
		attenuationDistance: 0.25, // 光衰减距离
	};

	return (
		// 渲染条形模式，指定 GLB 模型路径、几何体键名，锁定到底部，禁用鼠标跟随
		<ModeWrapper
			glb="/assets/3d/bar.glb"
			geometryKey="Cube"
			lockToBottom // 锁定在视口底部
			followPointer={false} // 不跟随鼠标指针移动
			modeProps={{ ...defaultMat, ...modeProps }} // 合并默认材质属性和自定义属性
			{...p} // 传递其他属性
		/>
	);
}

// 导航项组件 - 渲染 3D 文本导航菜单，根据设备类型自适应调整大小和间距
function NavItems({ items }: { items: NavItem[] }) {
	// 组引用，用于控制导航项的位置
	const group = useRef<THREE.Group>(null!);
	// 获取视口和相机信息
	const { viewport, camera } = useThree();

	// 设备类型配置，包含不同设备的最大宽度、导航项间距和字体大小
	const DEVICE = {
		mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
		tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
		desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 },
	};

	// 根据窗口宽度确定当前设备类型
	const getDevice = () => {
		const w = window.innerWidth;
		return w <= DEVICE.mobile.max
			? "mobile"
			: w <= DEVICE.tablet.max
				? "tablet"
				: "desktop";
	};

	// 状态，存储当前设备类型
	const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

	// 监听窗口大小变化，更新设备类型
	useEffect(() => {
		const onResize = () => setDevice(getDevice());
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	// 获取当前设备类型的间距和字体大小配置
	const { spacing, fontSize } = DEVICE[device];

	// 每帧更新函数，处理导航项的位置
	useFrame(() => {
		if (!group.current) return;
		// 获取当前视口信息
		const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
		// 设置导航组的位置，固定在底部上方
		group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

		// 根据导航项索引计算每个导航项的水平位置，确保居中对齐
		group.current.children.forEach((child, i) => {
			child.position.x = (i - (items.length - 1) / 2) * spacing;
		});
	});

	// 处理导航点击事件
	const handleNavigate = (link: string) => {
		if (!link) return;
		// 根据链接类型执行不同的导航操作
		link.startsWith("#")
			? (window.location.hash = link)
			: (window.location.href = link);
	};

	// 渲染导航项文本
	return (
		<group ref={group} renderOrder={10}>
			{items.map(({ label, link }) => (
				<Text
					key={label}
					fontSize={fontSize}
					color="white"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0}
					outlineBlur="20%"
					outlineColor="#000"
					outlineOpacity={0.5}
					renderOrder={10}
					onClick={(e) => {
						e.stopPropagation();
						handleNavigate(link);
					}}
					onPointerOver={() => (document.body.style.cursor = "pointer")}
					onPointerOut={() => (document.body.style.cursor = "auto")}
				>
					{label}
				</Text>
			))}
		</group>
	);
}

function Images() {
	const group = useRef<ZoomGroup>(null!);
	const data = useScroll();
	const { height } = useThree((s) => s.viewport);

	useFrame(() => {
		group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
		group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
		group.current.children[2].material.zoom =
			1 + data.range(1.15 / 3, 1 / 3) / 2;
		group.current.children[3].material.zoom =
			1 + data.range(1.15 / 3, 1 / 3) / 2;
		group.current.children[4].material.zoom =
			1 + data.range(1.15 / 3, 1 / 3) / 2;
	});

	return (
		<group ref={group}>
			<Image
				position={[-2, 0, 0]}
				scale={[3, height / 1.1]}
				url="/assets/demo/cs1.webp"
			/>
			<Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />
			<Image
				position={[-2.05, -height, 6]}
				scale={[1, 3]}
				url="/assets/demo/cs3.webp"
			/>
			<Image
				position={[-0.6, -height, 9]}
				scale={[1, 2]}
				url="/assets/demo/cs1.webp"
			/>
			<Image
				position={[0.75, -height, 10.5]}
				scale={1.5}
				url="/assets/demo/cs2.webp"
			/>
		</group>
	);
}

function Typography() {
	const DEVICE = {
		mobile: { fontSize: 0.2 },
		tablet: { fontSize: 0.4 },
		desktop: { fontSize: 0.6 },
	};
	const getDevice = () => {
		const w = window.innerWidth;
		return w <= 639 ? "mobile" : w <= 1023 ? "tablet" : "desktop";
	};

	const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

	useEffect(() => {
		const onResize = () => setDevice(getDevice());
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	const { fontSize } = DEVICE[device];

	return (
		<Text
			position={[0, 0, 12]}
			fontSize={fontSize}
			letterSpacing={-0.05}
			outlineWidth={0}
			outlineBlur="20%"
			outlineColor="#000"
			outlineOpacity={0.5}
			color="white"
			anchorX="center"
			anchorY="middle"
		>
			React Bits
		</Text>
	);
}
