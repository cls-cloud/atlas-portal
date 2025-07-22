---
sidebar_position: 1
---

# 多租户
> + 多租户数据权限采用租户ID（tenant_id）形式
> + 通过GORM插件形式实现租户数据隔离

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

