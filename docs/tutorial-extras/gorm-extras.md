---
sidebar_position: 3
---

# GORM Plugin
本模块基于 **GORM Plugin** 机制，提供 **多租户数据隔离** 与 **审计字段自动填充** 能力，

### 说明

- 多租户及数据填充插件 **依赖于 auth 中间件**
- 租户 ID（`tenant_id`）、用户 ID（`user_id`）需在 `auth_middleware` 中注入到 `context`
- 具体实现细节请参考 `auth_middleware` 相关代码

## 多租户

+ 多租户数据权限采用租户ID（tenant_id）形式
+ 通过GORM插件形式实现租户数据隔离

### 配置示例
```golang

type Config struct {
	Tenant     TenantConfig
	...
}

type TenantConfig struct {
	Enabled      bool
	IgnoreTables []string
}
```

yaml配置
```yaml
Tenant:
  Enabled: true
  IgnoreTables:
    - sys_tenant
    - sys_tenant_package
    - sys_menu
    - sys_user_role
    - sys_user_post
    - sys_role_menu
    - sys_role_dept
    - sys_client
    - sys_config
```

+ 租户表、本身无租户概念的系统表应加入 IgnoreTables
+ 插件将自动跳过这些表的租户条件注入

### 注册多租户插件
```golang
//注册多租户插件
if err := db.Use(&plugin.TenantPlugin{
    Enabled:      c.Tenant.Enabled,
    IgnoreTables: c.Tenant.IgnoreTables,
}); err != nil {
    panic(err)
}
```
+ Enable 控制租户的是否开启
+ IgnoreTables 控制哪些表不使用该插件


## 数据填充
### 功能说明
用于在 新增 / 更新 数据时，自动填充以下审计字段：
+ create_by
+ update_by
+ create_time
+ update_time 
> 字段值来源于 auth_middleware 中注入的当前用户信息与时间信息。

### 注册插件
```golang
if err = db.Use(&plugin.AuditPlugin{}); err != nil {
    panic(err)
}
```