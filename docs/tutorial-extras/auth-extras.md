---
sidebar_position: 2
---

# 认证授权

认证与授权相关逻辑统一在中间件中完成，代码位于：

`toolkit/middlewares/auth_middleware.go`

## 认证流程说明

系统通过 HTTP 中间件对请求进行统一认证校验，整体流程如下：

### Authorization Header 校验

- 从请求头中读取 `Authorization`
- 要求格式为：

`Authorization: Bearer <access_token>`

- 若请求头缺失或不符合规范，直接返回 `401 Unauthorized`

### Access Token 解析与校验

- 使用系统配置的 `accessSecret` 对 Token 进行解析
- 校验内容包括：
    - Token 合法性
    - 签名是否正确
    - 用户信息是否完整

解析成功后可获得以下信息：
- 用户 ID（UserId）
- 客户端 ID（ClientId）
- 用户基础信息（UserInfo）

### Token Key 构建策略

系统支持 **单端登录** 与 **多端登录** 两种模式，通过配置 `multipleLoginDevices` 控制。

#### 单端登录模式

- 同一用户在同一客户端仅允许一个有效登录
- Redis Key 结构：

TokenKey = clientId + userId

#### 多端登录模式

- 支持同一账号在多个设备同时登录
- 使用以下信息生成设备唯一标识：
    - 客户端 IP
    - 浏览器名称与版本
    - 操作系统类型
- 将设备信息进行 MD5 计算，作为 Token Key 的一部分：

TokenKeyMd5 = clientId + userId + deviceMd5

### Redis Token 状态校验

- 从 Redis 中校验 Token 是否存在
- 判断 Token 是否已过期（空闲超时）
- 若 Token 不存在或已过期，返回 `401 Unauthorized`


### 租户信息解析（多租户支持）

- 根据当前用户信息，从 Redis 中获取对应的租户 ID（TenantId）
- 用于支持多租户业务场景
- 若租户信息获取失败，则视为非法请求


### 注入认证上下文信息

认证通过后，将以下信息写入请求 Header 与 Context：

#### Header 注入字段
- `UserID`
- `TenantID`
- `ClientID`

#### Context 注入字段
- `UserID`
- `TenantID`
- `ClientID`

后续业务逻辑可直接从 `Context` 或 `Header` 中获取当前登录用户信息，无需重复解析 Token。

## 认证失败场景

在以下任一情况下，请求将被拒绝并返回 `401 Unauthorized`：

- Authorization Header 缺失或格式错误
- Token 解析失败
- Token 校验失败或已过期
- 租户信息解析失败

## 设计说明

- 认证逻辑集中在中间件层，避免业务代码重复实现
- 支持单端 / 多端登录策略切换
- 基于 Redis 管理 Token 状态与失效控制
- 通过 Context 传递用户信息，保持业务 Handler 简洁

> 所有需要认证的接口，均应在路由层统一挂载该中间件。