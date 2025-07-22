---
sidebar_position: 3
---

# MySQL 安装

## Windows 安装

1. 前往官网下载页面：  
   https://dev.mysql.com/downloads/installer/

2. 推荐选择：
    - `mysql-installer-web-community`（轻量，安装时在线下载组件）
    - 或 `mysql-installer-community`（完整版）

3. 下载后运行 `.msi` 文件，选择默认安装方式（Developer Default），点击下一步。

4. 设置 root 密码、添加用户（可选）。

5. 安装完成后使用以下命令进入 MySQL：
   ```bash
   mysql -u root -p

## Linux 安装
> 基于 RPM 手动安装 MySQL 8.0.42（适用于 RHEL / CentOS / Rocky 9）

### 安装依赖

```bash
sudo yum -y install openssl-devel net-tools
```

### 下载并解压 RPM 包
```bash
wget https://cdn.mysql.com/Downloads/MySQL-8.0/mysql-8.0.42-1.el9.x86_64.rpm-bundle.tar
tar -xf mysql-8.0.42-1.el9.x86_64.rpm-bundle.tar
cd mysql-8.0.42-1.el9.x86_64.rpm-bundle/
```
### 卸载系统默认的 MariaDB（如有）
```bash
yum list installed | grep mariadb
yum -y remove mariadb-libs.x86_64
```
### 安装 MySQL RPM 包（顺序不可乱）
```bash
rpm -ivh mysql-community-common-8.0.42-1.el9.x86_64.rpm
rpm -ivh mysql-community-client-plugins-8.0.42-1.el9.x86_64.rpm
rpm -ivh mysql-community-libs-8.0.42-1.el9.x86_64.rpm
rpm -ivh mysql-community-devel-8.0.42-1.el9.x86_64.rpm
rpm -ivh mysql-community-client-8.0.42-1.el9.x86_64.rpm
rpm -ivh mysql-community-icu-data-files-8.0.42-1.el9.x86_64.rpm
rpm -ivh mysql-community-server-8.0.42-1.el9.x86_64.rpm
```
> 可选包：如果需要兼容老软件链接库：
> ```bash 
> rpm -ivh mysql-community-libs-compat-8.0.42-1.el9.x86_64.rpm
> ```
### 初始化数据库
```bash
mysqld --initialize --user=mysql

```
> 初始化完成后，会在日志中生成 root 初始密码：
> ```bash
> grep "password" /var/log/mysqld.log
> ```

### 启动 MySQL 服务
```bash
sudo systemctl start mysqld
sudo systemctl enable mysqld
```
### 登录并修改 root 密码
```bash
mysql -u root -p
```
首次登录后执行以下 SQL：
```sql
-- 替换为你自己的安全密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwer1234';
FLUSH PRIVILEGES;
```
### 开启远程访问权限（可选）
```sql
USE mysql;
UPDATE user SET host='%' WHERE user='root';
FLUSH PRIVILEGES;
```
修改配置文件支持远程连接：
```bash
sudo vi /etc/my.cnf
```
添加或修改以下内容：
```ini
[mysqld]
bind-address = 0.0.0.0
```
重启服务：
```bash
sudo systemctl restart mysqld
```


