import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

// 定义 Business 数据类型
interface BusinessData {
  name: string;
  email: string;
  address: string;
  type: string;
  contact: string;
  rating?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  otherInfo?: string | null;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const idParam = url.searchParams.get('id');
    const exportParam = url.searchParams.get('export');
    
    if (idParam) {
      // 获取单个业务
      const businessId = parseInt(idParam);
      if (isNaN(businessId)) {
        return NextResponse.json(
          { error: 'Invalid ID format' },
          { status: 400 }
        );
      }
      
      const business = await prisma.business.findUnique({
        where: { id: businessId }
      });
      
      if (!business) {
        return NextResponse.json(
          { error: 'Business not found' },
          { status: 404 }
        );
      }
      
      // 如果请求导出单个业务
      if (exportParam === 'excel') {
        // 创建工作簿和工作表
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([business]);
        
        // 设置列宽（根据实际内容调整）
        const colWidths = [
          { wch: 10 }, // id
          { wch: 25 }, // name
          { wch: 30 }, // email
          { wch: 40 }, // address
          { wch: 15 }, // type
          { wch: 20 }, // contact
          { wch: 10 }, // rating
          { wch: 15 }, // latitude
          { wch: 15 }, // longitude
          { wch: 50 }  // otherInfo
        ];
        ws['!cols'] = colWidths;
        
        // 添加工作表到工作簿
        XLSX.utils.book_append_sheet(wb, ws, 'Business Details');
        
        // 生成Excel文件的Buffer
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        
        // 创建Blob
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // 返回Excel文件
        return new Response(blob, {
          status: 200,
          headers: {
            'Content-Disposition': `attachment; filename="business_${businessId}.xlsx"`,
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }
        });
      }
      
      return NextResponse.json(business, { status: 200 });
    } else if (exportParam === 'excel') {
      // 导出所有业务为Excel
      const businesses = await prisma.business.findMany();
      
      // 创建工作簿和工作表
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(businesses);
      
      // 设置列宽
      const colWidths = [
        { wch: 10 }, // id
        { wch: 25 }, // name
        { wch: 30 }, // email
        { wch: 40 }, // address
        { wch: 15 }, // type
        { wch: 20 }, // contact
        { wch: 10 }, // rating
        { wch: 15 }, // latitude
        { wch: 15 }, // longitude
        { wch: 50 }  // otherInfo
      ];
      ws['!cols'] = colWidths;
      
      // 添加工作表到工作簿
      XLSX.utils.book_append_sheet(wb, ws, 'All Businesses');
      
      // 生成Excel文件的Buffer
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      
      // 创建Blob
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // 返回Excel文件
      return new Response(blob, {
        status: 200,
        headers: {
          'Content-Disposition': `attachment; filename="business_export_${new Date().toISOString().split('T')[0]}.xlsx"`,
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }
      });
    } else {
      // 获取所有业务（默认返回JSON）
      const businesses = await prisma.business.findMany();
      return NextResponse.json(businesses, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching business data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// 创建业务的 POST 方法
export async function POST(request: Request) {
  try {
    const data: BusinessData = await request.json();
    
    // 验证必填字段
    if (!data.name || !data.email || !data.address || !data.type || !data.contact) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, address, type, contact)' },
        { status: 400 }
      );
    }
    
    // 创建新业务
    const newBusiness = await prisma.business.create({
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        type: data.type,
        contact: data.contact,
        rating: data.rating,
        latitude: data.latitude,
        longitude: data.longitude,
        otherInfo: data.otherInfo
      }
    });
    
    return NextResponse.json(newBusiness, { status: 201 });
  } catch (error) {
    console.error('Error creating business:', error);
    
    // 检查是否是邮箱唯一性错误
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create business', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// 更新业务的 PUT 方法
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const businessId = data.id;
    
    // 验证 ID
    if (!businessId || isNaN(Number(businessId))) {
      return NextResponse.json(
        { error: 'Invalid or missing business ID' },
        { status: 400 }
      );
    }
    
    // 检查业务是否存在
    const existingBusiness = await prisma.business.findUnique({
      where: { id: Number(businessId) }
    });
    
    if (!existingBusiness) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // 准备更新数据，排除 id 字段
    const updateData: Partial<BusinessData> = { ...data };
    delete updateData.id;
    
    // 更新业务
    const updatedBusiness = await prisma.business.update({
      where: { id: Number(businessId) },
      data: updateData
    });
    
    return NextResponse.json(updatedBusiness, { status: 200 });
  } catch (error) {
    console.error('Error updating business:', error);
    
    // 检查是否是邮箱唯一性错误
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update business', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// 删除业务的 DELETE 方法
export async function DELETE(request: Request) {
  try {
    // 从 URL 中提取 id 参数
    const url = new URL(request.url);
    const idParam = url.searchParams.get('id');
    
    if (!idParam || isNaN(Number(idParam))) {
      return NextResponse.json(
        { error: 'Invalid or missing business ID' },
        { status: 400 }
      );
    }
    
    const businessId = Number(idParam);
    
    // 检查业务是否存在
    const existingBusiness = await prisma.business.findUnique({
      where: { id: businessId }
    });
    
    if (!existingBusiness) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // 删除业务
    await prisma.business.delete({
      where: { id: businessId }
    });
    
    return NextResponse.json(
      { message: 'Business deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting business:', error);
    return NextResponse.json(
      { error: 'Failed to delete business', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
