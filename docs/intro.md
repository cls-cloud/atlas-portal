---
sidebar_position: 1
---

# 快速开始

## 平台简介
+ 提供了完整的权限系统、多租户支持、RBAC 权限控制、菜单管理等功能，适合快速搭建企业级后台管理系统。
+ 前端项目：基于 [Ruoyi-Plus-Vben5](https://gitee.com/dapppp/ruoyi-plus-vben5.git)
+ 后端项目：基于 [RuoYi-Vue-Plus](https://gitee.com/dromara/RuoYi-Vue-Plus.git) 的功能模型，使用 Go-Zero 重写。

| 模块名称     | REST端口 | RPC端口 | Prometheus |
|----------|--------|-------|------------|
| system   | 8090   | 9091  | 4001       |
| monitor  | 8091   | 9092  | 4002       |
| resource | 8092   | 9093  | 4003       |

## 在线体验
- admin/admin123

演示地址：https://vben5.go-atlas.cn/

## 快速启动（开发环境）
> 后端需安装 Go 1.24+，数据库为 MySQL（推荐 8.0+）

### 检查所需环境
> golang、mysql、redis、etcd

### 安装依赖
```shell
# 克隆后端代码
git clone https://github.com/cls-cloud/atlas-zero.git
cd atlas-zero/app/toolkit && go mod tidy
cd atlas-zero/app/system && go mod tidy
cd atlas-zero/app/monitor && go mod tidy
cd atlas-zero/app/resource && go mod tidy
```

### 服务启动
> 配置文件 项目目录的etc目录下(*.yaml) 
```bash
cd atlas-zero/app/system && go run system.go
cd atlas-zero/app/monitor && go run monitor.go
cd atlas-zero/app/resource && go run resource.go
```

### 网关运行
> 网关使用traefik，下载地址：https://github.com/traefik/traefik/releases
> 下载系统对应版本的traefik，解压后放在bin/app/traefik目录下
```shell
cd atlas-zero/app
./bin/traefik/traefik --configfile=./bin/traefik/traefik.yaml
```

### 前端运行
> 查看ruoyi-plus-vben5文档 https://gitee.com/dapppp/ruoyi-plus-vben5
+ 将env文件中全局加密与sse关闭
```.dotenv
VITE_GLOB_ENABLE_ENCRYPT=false
VITE_GLOB_SSE_ENABLE=false
```