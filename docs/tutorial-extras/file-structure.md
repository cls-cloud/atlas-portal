---
sidebar_position: 3
---

# 文件结构

```text
.
├── Makefile
├── replace.sh
├── bin/
├── app/
│   ├── system
│   ├── resource
│   └── monitor
├── etc/
│   ├── dev
│   └── prod
├── desc/
├── gen/
├── toolkit/
└── go.mod
```
### Makefile

项目的统一构建入口，负责：
+ 初始化运行环境
+ 各模块的编译与打包
+ 常用开发命令的封装

### replace.sh
在执行 make db 时使用的辅助脚本，用于对 GORM 自动生成的 model 代码进行二次处理：
+ 软删除字段处理

### app
业务模块目录，每个子目录代表一个独立的服务或功能模块：
+ app/system
系统模块，提供基础能力与核心服务
+ app/resource
资源模块，负责资源管理相关逻辑
+ app/monitor
监控模块，用于系统运行状态与指标监控

### etc
配置文件目录，按运行环境区分：
+ dev/：开发环境配置
+ prod/：生产环境配置
### desc
接口与协议定义目录，包含：
+ 各模块的 API 描述文件
+ Protobuf (.proto) 文件
用于接口定义与代码生成

### gen
代码生成相关配置目录，主要用于：
+ 数据库 model 的生成配置
+ 代码生成工具的输入文件

### toolkit
通用工具包，存放可被各模块复用的公共组件与工具函数