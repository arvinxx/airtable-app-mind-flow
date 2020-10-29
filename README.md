# AirTable App Template

[AirTable](https://airtable.com) App 开发模板

## 初始化

### 安装 `block` CLI

```
npm i -g @airtable/blocks-cli
```

### 使用 `block init`




```shell script
# 将命令行中的 `blockId` 和 `baseId` 替换成对应值
# 将最末尾的 your_paths 改成目标路径

block init blockId/baseId  --template=https://github.com/arvinxx/airtable-app-template your_paths
```

这个指令将直接初始化项目并自动安装依赖

### 手动初始化
如果不想使用 `block init` 也可以采用手动的方式初始化脚手架

先克隆项目

```shell script
git clone https://github.com/arvinxx/airtable-app-template  your_paths
```

然后打开 `.block/remote.json`, 修改 `blockId` 和 `baseId`

举例:

```json
{
  "blockId": "appwfwENHN3Daxd6w",
  "baseId": "blkNL28deUVyBeaB3"
}
```
然后正常安装依赖进行开发即可

## 指南

### 开发

```shell script
npm start
```

### 发版

```shell script
npm release
```
PS: 不可以删掉 `package-lock.json`, 否则不能发版


## License

[MIT](./LICENSE) ® Arvin Xu
