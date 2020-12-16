# Vue项目打包并部署

## axios设置好后端api路径

```javascript
import axios from 'axios'
// 开发环境用于webpack-devServer的proxy，/api开头
const DEV_BASE_URL = 'http://localhost:9111/api'
// 生产环境后端真实地址
const Production_BASE_URL = 'http://localhost:3888'
const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? Production_BASE_URL : DEV_BASE_URL
})
```

## 设置应用部署的相对路径

```javascript
// vue.config.js
// 部署应用包时的基本 URL 为相对路径,即上线访问路径xxx.com/yourPath，
publicPath: process.env.NODE_ENV === 'production' ? '/yourPath' : './',
```

## 上传打包后的dist到服务器，并配置nginx

```nginx
# 根路径的情况下
location / {
    root   /usr/yourProject/dist;
    index  index.html;
}
# 非根路径的情况下
location /yourPath {
    # 必须配置alias，即上传到服务器的路径
    alias /usr/yourProject/dist;
    index index.html;
}
```

