import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

// 定义API处理函数，用于处理来自客户端的请求（Next.js 13+ Route Handler）
export async function GET() {
  try {
    // 构建Excel文件的完整路径 - 根据目录结构，文件位于public文件夹中
    const filePath = path.join(process.cwd(), "public", "data.xlsx");
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "Excel file not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // 同步读取Excel文件内容到缓冲区
    const fileBuffer = fs.readFileSync(filePath);
    // 使用XLSX库解析缓冲区中的Excel文件
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    // 获取工作簿中的第一个工作表名称
    const sheetName = workbook.SheetNames[0];
    // 检查是否存在工作表
    if (!sheetName) {
      return new Response(JSON.stringify({ error: "No sheets found in Excel file" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // 获取第一个工作表对象
    const sheet = workbook.Sheets[sheetName];
    // 将工作表转换为JSON格式数据
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // 返回成功状态码和JSON数据给客户端（使用Next.js 13+的Response对象）
    return new Response(JSON.stringify(jsonData), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    // 添加错误处理
    console.error("Error processing Excel file:", error);
    return new Response(JSON.stringify({ error: "Failed to process Excel file", details: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
