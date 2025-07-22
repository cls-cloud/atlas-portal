---
sidebar_position: 2
---

# ETCD 安装

[etcd](https://github.com/etcd-io/etcd) 是一个分布式键值存储系统，常用于服务注册与发现。本页将介绍如何在 macOS、Windows、Linux 上安装并启动 etcd 服务。

---

## 下载地址

请前往 GitHub 官方页面选择你需要的版本：

https://github.com/etcd-io/etcd/releases/

推荐使用稳定版本，例如 `v3.5.x` 或 `v3.6.x`。

---

## macOS 安装

最简单的方式是使用 Homebrew：

```bash
brew install etcd
```

安装完成后，使用以下命令确认版本：
```bash
etcd --version
etcdctl version
```
## Windows 安装
1. 打开 etcd Releases 页面
2. 下载对应版本，例如：etcd-v3.6.2-windows-amd64.zip
3. 解压并将 etcd.exe 和 etcdctl.exe 放入某个目录，例如 C:\etcd
4. 将该目录添加到系统环境变量 PATH 中
验证命令：
```bash
etcd --version
etcdctl version
```

## Linux 安装
以版本 v3.6.2 为例：
> 若下载超时，可本地下载然后上传 执行解压命令
```bash
ETCD_VER="v3.6.2"
DOWNLOAD_URL="https://github.com/etcd-io/etcd/releases/download"
TMP_DIR="/tmp/etcd-download"

mkdir -p "${TMP_DIR}" && cd "${TMP_DIR}"
curl -L "${DOWNLOAD_URL}/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz" -o etcd.tar.gz
tar xzvf etcd.tar.gz

sudo mv etcd-${ETCD_VER}-linux-amd64/etcd* /usr/local/bin/
```

### 使用 systemd 管理 etcd 服务（Linux）
+ 新建 systemd 服务文件
    `sudo vim /etc/systemd/system/etcd.service`
+ 内容如下
```ini
[Unit]
Description=etcd key-value store
Documentation=https://github.com/etcd-io/etcd
After=network.target

[Service]
Type=notify
ExecStart=/usr/local/bin/etcd \
--name default \
--data-dir /var/lib/etcd \
--listen-client-urls http://0.0.0.0:2379 \
--advertise-client-urls http://localhost:2379

Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```
+ 启动并启用服务
```bash
sudo systemctl daemon-reload
sudo systemctl start etcd
sudo systemctl enable etcd
```
## 使用 etcdctl 验证
```bash
etcdctl --endpoints=http://localhost:2379 put foo "hello etcd"
etcdctl --endpoints=http://localhost:2379 get foo
```