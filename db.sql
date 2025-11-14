CREATE DATABASE IF NOT EXISTS shop_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE shop_db;

CREATE TABLE IF NOT EXISTS shops (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '店铺ID',
    name VARCHAR(100) NOT NULL COMMENT '店铺名称',
    owner VARCHAR(100) NOT NULL COMMENT '店主名称',
    phone VARCHAR(20) COMMENT '联系电话',
    address VARCHAR(255) COMMENT '店铺地址',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1=营业中，0=停业',

    image_base64 MEDIUMTEXT COMMENT '店铺图片（Base64）',

    rating DECIMAL(2,1) DEFAULT 0.0 COMMENT '店铺评分（0~5）',
    review TEXT COMMENT '店铺评价内容',

    latitude DECIMAL(10,6) COMMENT '纬度',
    longitude DECIMAL(10,6) COMMENT '经度',

    shop_type VARCHAR(50) COMMENT '店铺类型，例如：electronics, food, flower, fashion, pet, book 等',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    description TEXT COMMENT '店铺简介'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO shops
(name, owner, phone, address, status, image_base64, rating, review, latitude, longitude, shop_type, description)
VALUES
('小米之家', '张三', '13800138000', '北京市海淀区中关村大街1号', 1, 'BASE64_SAMPLE_1', 4.5, '服务好，产品齐全', 39.983424, 116.322987, 'electronics', '主营电子产品'),

('华为体验店', '李四', '13900139000', '深圳市南山区科技园路2号', 1, 'BASE64_SAMPLE_2', 4.8, '店面现代化体验出色', 22.540123, 113.945678, 'electronics', '华为手机及生态产品'),

('苹果授权店', '王五', '13700137000', '上海市浦东新区世纪大道88号', 1, 'BASE64_SAMPLE_3', 4.9, '苹果官方体验非常不错', 31.230416, 121.473701, 'electronics', 'Apple 官方授权'),

('快活美食店', '赵六', '13600136000', '广州市天河区体育西路10号', 1, 'BASE64_SAMPLE_4', 4.2, '菜品好吃，价格实惠', 23.129110, 113.264381, 'food', '中式快餐'),

('鲜花小铺', '小芳', '13500135000', '杭州市西湖区龙井路77号', 1, 'BASE64_SAMPLE_5', 4.6, '花朵新鲜漂亮', 30.259246, 120.130808, 'flower', '高品质鲜花'),

('便利蜂便利店', '刘老板', '13400134000', '天津市和平区南京路100号', 1, 'BASE64_SAMPLE_6', 4.0, '24小时便利', 39.125595, 117.190186, 'convenience', '便利店连锁'),

('书香门第书店', '老陈', '13300133000', '成都市武侯区人民南路三段20号',
