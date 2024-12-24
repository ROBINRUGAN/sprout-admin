# 新苗Sprout——你的大学生活助手

![screencapture-sprout-mewtopia-cn-2024-12-24-15_27_54](https://mewww.w2fzu.com/mew/202412241528298.png)

![](https://mewww.w2fzu.com/mew/202412241529530.gif)

## 一、项目文档汇总

### 1. 团队展示

- [Sprout新苗——团队展示](https://bbs.csdn.net/topics/619332655)

### 2. 需求分析

- [Sprout新苗——需求分析](https://bbs.csdn.net/topics/619350143)

### 3. 系统设计与数据库设计

- [新苗Sprout——项目系统设计与数据库设计](https://bbs.csdn.net/topics/619380349)

### 4. Alpha 阶段

#### 4.1 代码规范、冲刺任务与计划

- [代码规范、冲刺任务与计划](https://bbs.csdn.net/topics/619401476)

#### 4.2 冲刺随笔

- [Alpha 冲刺 Day1](https://bbs.csdn.net/topics/619401477)
- [Alpha 冲刺 Day2](https://bbs.csdn.net/topics/619402538)
- [Alpha 冲刺 Day3](https://bbs.csdn.net/topics/619405043)
- [Alpha 冲刺 Day4](https://bbs.csdn.net/topics/619407474)
- [Alpha 冲刺 Day5](https://bbs.csdn.net/topics/619409661)
- [Alpha 冲刺 Day6](https://bbs.csdn.net/topics/619412028)
- [Alpha 冲刺 Day7](https://bbs.csdn.net/topics/619414266)
- [Alpha 冲刺 Day8](https://bbs.csdn.net/topics/619415472)
- [Alpha 冲刺 Day9](https://bbs.csdn.net/topics/619416472)
- [Alpha 冲刺 Day10](https://bbs.csdn.net/topics/619419004)

#### 4.3 测试与总结

- [测试随笔](https://bbs.csdn.net/topics/619421190)
- [测试用例文档](https://bbs.csdn.net/topics/619421391)
- [冲刺总结随笔](https://bbs.csdn.net/topics/619421623)

### 5. Beta 阶段

#### 5.1 换组与规划

- [换组交接博客](https://bbs.csdn.net/topics/619430928)
- [凡事预则立](https://bbs.csdn.net/topics/619431015)
- [Alpha 阶段问题总结](https://bbs.csdn.net/topics/619431014)

#### 5.2 冲刺与代码规范

- [代码规范](https://bbs.csdn.net/topics/619449433)
- [Beta 冲刺 Day1](https://bbs.csdn.net/topics/619435714)
- [Beta 冲刺 Day2](https://bbs.csdn.net/topics/619437690)
- [Beta 冲刺 Day3](https://bbs.csdn.net/topics/619440189)
- [Beta 冲刺 Day4](https://bbs.csdn.net/topics/619442406)
- [Beta 冲刺 Day5](https://bbs.csdn.net/topics/619443624)
- [Beta 冲刺 Day6](https://bbs.csdn.net/topics/619445134)
- [Beta 冲刺 Day7](https://bbs.csdn.net/topics/619446932)

#### 5.3 总结与用户调研

- [用户使用调查报告](https://bbs.csdn.net/topics/619449438)
- [Beta 冲刺总结随笔](https://bbs.csdn.net/topics/619449284)
- [Beta 答辩 PPT 下载](https://mewww.w2fzu.com/upmew/[final]Sprout新苗Beta答辩PPT.pptx)

### 6. 项目相关资源

#### 6.1 官方网站

- **官方网站介绍页**：[https://sprout.mewtopia.cn](https://sprout.mewtopia.cn/)

#### 6.2 管理端在线网址

- **管理端在线网址**：https://sprout.mewtopia.cn/login

#### 6.3 学生端下载地址

- **新苗同学2.0.apk**：[下载链接](https://mewww.w2fzu.com/upmew/Sprout.Apk)

## 二、系统架构设计

《新苗同学》的系统架构采用模块化设计，保证系统的可维护性、可扩展性和灵活性。系统由以下几个主要模块组成：

### 2.1 AI

- **人脸识别**：采用DeepFace模型，DeepFace采用9层深度神经网络，包含局部连接层和全连接层，专门设计以优化面部特征提取，实现高精度面部识别。
- **姿态识别**：使用OpenPose模型，其架构主要基于卷积神经网络（CNN），并采用了Part Affinity Fields（PAFs）来预测人体各部位及其肢体之间的关系。
- **OCR文字识别**：使用CRNN模型，CRNN是一种用于序列识别任务的深度学习模型，它结合了卷积神经网络（CNN）和循环神经网络（RNN）的优势。

具体结构如下：

![image-20241022232752897](https://mewww.w2fzu.com/mew/202412241513237.png)

### 2.2 后端

后端采用Spring Boot框架进行开发，提供快速、高效的服务。主要组成部分包括：

- **数据库操作**：使用MyBatis-Plus实现数据库交互。
- **容器化部署**：通过Docker保证环境一致性。
- **缓存机制**：利用Redis提升系统的响应速度。
- **服务管理**：使用Spring Cloud Gateway进行请求路由与负载均衡，Nacos进行服务注册与配置管理。
- **消息处理**：RocketMQ负责处理异步消息。
- **定时任务调度**：XXL-JOB用于管理定时任务。

这种架构设计使得后端系统可以高效可靠地实现大规模用户的访问支持。

具体结构如下：

![img](https://mewww.w2fzu.com/mew/202412241513325.png)

### 2.3 客户端

客户端采用MVVM（模型-视图-视图模型）架构，负责用户交互和界面展示。主要组件包括：

- **Activity/Fragment**：负责用户界面的显示与交互。
- **ViewModel**：提供数据给UI组件。
- **Repository**：统一管理数据访问，协调从本地数据库（Room）和远程服务（Retrofit）获取数据。

这种设计兼顾了客户端在数据获取和用户界面更新上的灵活性。

具体结构如下：

![img](https://mewww.w2fzu.com/mew/202412241513377.png)

### 2.4 管理端

管理端使用Vue.js构建用户界面，采用组件化设计，便于代码重用和维护。主要特性包括：

- **状态管理**：使用Pinia管理应用状态，实现各组件间的数据同步。
- **HTTP请求处理**：通过Axios与后端API进行通信。
- **UI组件库**：利用Element Plus提供一致的用户界面风格。
- **样式预处理**：使用Sass增强样式管理。

此设计实现了管理端应用的高性能和良好的用户体验。

具体结构如下：

![img](https://mewww.w2fzu.com/mew/202412241513458.png)

### 2.5 数据库

系统使用MySQL作为主要数据库，负责持久化存储用户数据和应用状态。同时，利用Redis作为缓存，提高数据访问的效率。

## 三、项目情况

✅代表**功能已编写并成功上线**，👌代表**通过完备的鲁棒性测试，⚠️**代表**尚未对接**，❌代表**尚未实现**

### 3.1 APP

开屏页✅👌、首页Banner广告✅👌、用户认证✅👌、活动大厅查看支线任务✅👌、活动大厅订阅支线任务✅👌、校园地图✅👌、积分排行榜✅👌、校园通知✅👌、校历查询✅👌、宿舍报修✅👌、森林展示✅👌、种植树苗✅👌、给树苗浇水✅👌、森林收获✅👌、我的任务✅👌、摄像头扫码任务✅👌、定位打卡任务✅👌、答题任务✅👌、浏览网页任务✅👌、物品识别任务✅👌、姿势识别任务✅👌、人脸识别任务✅👌、修改密码✅👌、修改头像✅👌、修改昵称✅👌、绑定微信✅👌、微信登录✅👌、退出登录✅👌、通知推送✅👌、通知列表✅👌、积分投放✅👌、商城✅👌、任务搜索✅👌

### 3.2 管理端

官网和下载页✅👌、登录✅👌、日活统计✅👌、热门任务统计✅👌、学生学院统计✅👌、学生注册数统计✅👌、学生学院统计✅👌、学生注册省份统计✅👌、消息中心✅👌、工具箱✅👌、查询学生信息和任务及库产详情✅👌、各位置广告访问统计✅👌、发布主线任务功能✅👌、发布支线任务功能✅👌、发布父任务✅👌、发布子任务✅👌、发布单项任务✅👌、发布摄像头扫码任务✅👌、发布定位打卡任务✅👌、发布答题任务✅👌、发布浏览网页任务✅👌、发布物品识别任务✅👌、发布姿势识别任务✅👌、发布人脸识别任务✅👌、批量Excel导入学生✅👌、查询往期已发布父任务✅👌、子任务✅👌、单项任务✅👌、查询任务参与者✅👌、审核任务✅👌、发布开屏页广告✅👌、发布轮播图广告✅👌、发布首页弹窗广告✅👌、查询已发布广告内容✅👌

### 3.3 AI

ocr文本识别✅👌、姿势识别✅👌、人脸识别✅👌、物品识别✅👌、人脸识别摄像头✅👌、二维码扫描摄像头✅👌

### 3.4 服务端

- 管理端：管理员登录✅👌、日活统计✅👌、热门任务统计✅👌、学生学院统计✅👌、学生注册数统计✅👌、学生学院统计✅👌、学生注册省份统计✅👌、消息中心✅👌、查询学生信息和任务及养成详情✅👌、发布任务✅👌、批量Excel导入学生✅👌、查询往期已发布任务✅👌、广告投放✅👌、广告查询✅👌
- APP：用户认证✅、广告展示✅👌、用户登录✅👌、修改密码✅👌、修改头像✅、修改昵称✅👌、绑定微信✅👌、微信登录✅👌、用户信息查询✅👌、用户任务查询✅👌、搜索任务✅👌、查看可接受支线任务✅👌、接受支线任务✅👌、提交任务✅👌、森林展示✅👌、种植树苗✅👌、给树苗浇水✅👌、森林收获✅👌、通知推送✅👌、通知列表✅👌、二维码打卡✅👌、积分排行榜✅👌、商城✅👌、积分投放✅👌

## 4. 运行实况

### 4.1 学生端

#### 4.1.1 用户登录与认证

![img](https://mewww.w2fzu.com/mew/202412241518527.gif)

#### 4.1.2 主支线任务列表

<img src="https://mewww.w2fzu.com/mew/202412241518666.gif" width="" alt="img" />

#### 4.1.3 订阅活动大厅支线任务

![img](https://mewww.w2fzu.com/mew/202412241518707.png)

#### 4.1.4 图片识别任务

![img](https://mewww.w2fzu.com/mew/202412241518965.gif)

#### 4.1.5 扫码签到任务

![img](https://mewww.w2fzu.com/mew/202412241518896.gif)

#### 4.1.6 定位打卡任务

![img](https://mewww.w2fzu.com/mew/202412241518261.gif)

#### 4.1.7 浏览网页任务

![img](https://mewww.w2fzu.com/mew/202412241518214.gif)

#### 4.1.8 问卷答题任务

![img](https://mewww.w2fzu.com/mew/202412241518381.png)

![img](https://mewww.w2fzu.com/mew/202412241518636.png)

#### 4.1.9 任务评论与评论点赞

![img](https://mewww.w2fzu.com/mew/202412241518773.gif)

#### 4.1.10 广告展示（开屏、弹屏与Banner）

![img](https://mewww.w2fzu.com/mew/202412241518903.jpeg)

![img](https://mewww.w2fzu.com/mew/202412241518979.gif)

#### 4.1.11 种树

![img](https://mewww.w2fzu.com/mew/202412241518112.gif)

#### 4.1.12 浇水

![img](https://mewww.w2fzu.com/mew/202412241518143.gif)

#### 4.1.13 收获

![img](https://mewww.w2fzu.com/mew/202412241518327.gif)

#### 4.1.14 绑定微信与微信登录

![img](https://mewww.w2fzu.com/mew/202412241518092.gif)

#### 4.1.15 查看App内系统通知

![img](https://mewww.w2fzu.com/mew/202412241518190.gif)

#### 4.1.16 通知栏离线通知

![img](https://mewww.w2fzu.com/mew/202412241518323.jpeg)

#### 4.1.17 商城兑换

![img](https://mewww.w2fzu.com/mew/202412241518319.gif)

#### 4.1.18 查看校园地图、校历、校园通知、报修

![img](https://mewww.w2fzu.com/mew/202412241518906.gif)

#### 4.1.19 修改个人信息

![img](https://mewww.w2fzu.com/mew/202412241518887.gif)

### 4.2 管理端

#### 4.2.1 登录

![img](https://mewww.w2fzu.com/mew/202412241518915.gif)

#### 4.2.2 仪表盘可视化数据

![img](https://mewww.w2fzu.com/mew/202412241518642.gif)

#### 4.2.3 学生导入

![img](https://mewww.w2fzu.com/mew/202412241518442.gif)

#### 4.2.4 发布任务

![img](https://mewww.w2fzu.com/mew/202412241523373.gif)

#### 4.2.5 任务审核

![img](https://mewww.w2fzu.com/mew/202412241520142.gif)

#### 4.2.6 往期任务

![img](https://mewww.w2fzu.com/mew/202412241518939.gif)

#### 4.2.7 发布广告

![img](https://mewww.w2fzu.com/mew/202412241523856.gif)

#### 4.2.8 管理广告

![](https://mewww.w2fzu.com/upmew/20241127000056287.gif)

#### 4.2.9 管理商品

![img](https://mewww.w2fzu.com/mew/202412241519658.gif)

#### 4.2.10 查询用户

![img](https://mewww.w2fzu.com/mew/202412241519455.gif)

### 4.3 官网

#### 4.3.1 电脑官网

![](https://mewww.w2fzu.com/mew/202412241522156.gif)

#### 4.3.2 手机官网

![img](https://mewww.w2fzu.com/mew/202412241519416.gif)
