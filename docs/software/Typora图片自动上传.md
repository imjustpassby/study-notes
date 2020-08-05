# Typora+picgo+smms图片自动上传图床

+ 安装picgo

  ```bash
  npm i -g picgo
  # or 
  yarn global add picgo
  ```

+ typora偏好设置

  + 上传服务选择 *Custom Command*
    + 自定义命令 `"[your node path] [your picgo-core path] upload"`，可以使用`which node``which picgo`找到具体路径

  ![typora config](https://i.loli.net/2020/07/26/x1t9BX5AoK3LeQS.png)

+ 配置picgo的config.json

  + 在smms官网创建账号并获取api token
  
  + `picgo set uploader`
    
  + ![picgo config](https://i.loli.net/2020/07/26/9EWJzBtTGP5j4a3.png)
  
  + 填写api token
  
+ 验证图片上传

  ![check](https://i.loli.net/2020/07/26/1NXk857bBlxAtCu.png)
