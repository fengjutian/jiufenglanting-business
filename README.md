# 九峰兰亭商业地图系统

这是一个基于Next.js开发的商业地图管理系统，提供商业数据的可视化展示、导入导出、增删改查等功能。

## 功能特性

### 核心功能
- **商业数据管理**：支持对商业数据的增删改查操作
- **Excel导入导出**：支持通过Excel文件批量导入和导出商业数据
- **地图可视化**：在地图上展示商业数据的地理位置分布
- **响应式设计**：适配不同设备的屏幕尺寸

### API端点
- `GET /api/business` - 获取所有商业数据或导出为Excel
- `GET /api/business?id=123` - 获取单个商业数据详情
- `POST /api/business` - 创建新的商业数据
- `POST /api/business?import=excel` - 通过Excel导入商业数据
- `PUT /api/business` - 更新商业数据
- `DELETE /api/business?id=123` - 删除商业数据

## 技术栈

### 前端技术
- **Next.js 15**：React框架，支持服务端渲染和静态站点生成
- **React**：用于构建用户界面的JavaScript库
- **TypeScript**：提供类型安全的JavaScript超集
- **Tailwind CSS**：实用优先的CSS框架（根据项目结构推断）
- **XLSX.js**：用于处理Excel文件的JavaScript库

### 后端技术
- **Node.js**：JavaScript运行时环境
- **Next.js API Routes**：处理API请求
- **Prisma v6**：现代化的ORM，用于数据库操作
- **SQLite**：轻量级数据库，用于开发环境

## 安装步骤

### 前置要求
- Node.js (v18或更高版本)
- npm、yarn、pnpm或bun包管理器
- Git

### 安装依赖

```bash
# 使用npm
npm install

# 或使用yarn
yarn install

# 或使用pnpm
pnpm install

# 或使用bun
bun install
```

### 数据库配置

1. 确保数据库已初始化：

```bash
npx prisma migrate dev
```

2. 生成Prisma客户端：

```bash
npx prisma generate
```

## 开发运行

启动开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看应用。

## 项目结构

```
├── prisma/           # Prisma ORM配置和数据库模型
├── public/           # 静态资源文件
├── src/              # 源代码目录
│   ├── app/          # Next.js应用路由
│   │   ├── api/      # API端点
│   │   └── map/      # 地图相关页面
│   ├── components/   # React组件
│   ├── lib/          # 工具函数和数据库连接
│   ├── model/        # 数据模型
│   └── store/        # 状态管理
└── next.config.ts    # Next.js配置
```

## Excel数据格式

导入和导出的Excel文件需包含以下列：
- **name**：商业名称（必填）
- **email**：邮箱地址（必填）
- **address**：地址（必填）
- **type**：商业类型（必填）
- **contact**：联系方式（必填）
- **rating**：评分（可选）
- **latitude**：纬度（可选）
- **longitude**：经度（可选）
- **otherInfo**：其他信息（可选）

## 部署

### 使用Vercel部署

1. 在GitHub上创建项目仓库
2. 推送代码到GitHub
3. 在[Vercel](https://vercel.com)上导入项目
4. 配置环境变量（如需要）
5. 部署并访问应用

### 手动部署

1. 构建生产版本：

```bash
npm run build
# 或
yarn build
# 或
pnpm build
# 或
bun build
```

2. 启动生产服务器：

```bash
npm start
# 或
yarn start
# 或
pnpm start
# 或
bun start
```

## 注意事项

1. **数据验证**：系统会验证必填字段，缺少必填字段的数据行将被标记为错误
2. **邮箱唯一性**：每个商业记录的邮箱必须唯一，重复的邮箱将被拒绝
3. **文件格式**：仅支持`.xlsx`和`.xls`格式的Excel文件
4. **数据库连接**：确保开发环境中正确配置了数据库连接

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)

## 开发团队

九峰兰亭开发团队
