// 导入XLSX库，用于Excel文件的读取和处理
import * as XLSX from "xlsx";
// 导入path模块，用于处理文件路径
import path from "path";
// 导入fs模块，用于文件系统操作
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next';

// 定义API处理函数，用于处理来自客户端的请求
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // 构建Excel文件的完整路径，使用process.cwd()获取项目根目录
  const filePath = path.join(process.cwd(), "data", "data.xlsx");
  // 同步读取Excel文件内容到缓冲区
  const fileBuffer = fs.readFileSync(filePath);
  // 使用XLSX库解析缓冲区中的Excel文件
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  // 获取工作簿中的第一个工作表名称
  const sheetName = workbook.SheetNames[0];
  // 获取第一个工作表对象
  const sheet = workbook.Sheets[sheetName];
  // 将工作表转换为JSON格式数据
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  // 返回成功状态码和JSON数据给客户端
  res.status(200).json(jsonData);
}
