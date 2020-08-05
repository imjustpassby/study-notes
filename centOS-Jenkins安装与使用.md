# centos-jenkins教程

## 安装

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
sudo rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
sudo yum install jenkins --nogpgcheck
yum install docker.x86_64 //安装docker
yum -y install java-1.8.0-openjdk* // 安装java环境
yum -y install node //安装node环境
yum -y install git //安装git
```

## 使用

1. 阿里云服务器需要在实例-更多-网络与安全组-安全组配置-配置规则-手动添加8080（默认）端口开放

2. 
   ```bash
   systemctl enable jenkins # 开机启动
   systemctl start jenkins # 启动jenkins
   ```
   
3. 浏览器访问 ip:8080

   ![jenkins](https://i.loli.net/2020/07/21/LBDM2pgmGC5lIEZ.png)

4. 修改默认jenkins插件源与连接检测位置(先确定default.json的路径)

   ```bash
   $ sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' /var/lib/jenkins/updates/default.json
   $ sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' /var/lib/jenkins/updates/default.json
   ```
   
5. 解锁jenkins，输入密码，安装推荐插件

   ![jenkins plugins](https://i.loli.net/2020/07/21/CEji6xl1G2t3PoX.png)

6. 创建管理员账号

## jenkins配置

1. jenkins-系统管理-插件管理 安装NodeJS Plugin

   ![NODEJS PLUGIN](https://i.loli.net/2020/07/21/hGk8Ijx4smtgn7K.png)

2. jenkins-系统管理-全局工具配置

   ![global git](C:\Users\26080\Pictures\winsnap截图\sshot-20200721-235923.png)

   ![global node](http://ww1.sinaimg.cn/large/826d6e88gy1ggzhmmvz9hj21ig0ra0ue.jpg)
   
3. github-setting-developer setting-personal access tokens-Generate new token

   ![generate token](https://i.loli.net/2020/07/22/I1DyjPHpMqh8Kvg.png)
   生成token后保存起来
   
4. Jenkins-系统管理-系统配置-github-添加github服务器

   - 名称是github账户名称

   - 添加凭据，类型选择secret text，secret是刚刚生成的token，id是凭据的别名

     ![](https://i.loli.net/2020/07/22/IwBS4xMDpNhlJiu.png)

   - 选择刚刚的凭据，连接测试，勾上管理hook，测试成功后保存

     ![connect test](https://i.loli.net/2020/07/22/sZu3lMX7B8NQ9Pv.png)

5. jenkins-新建任务

   + 配置

   ![new task1](https://i.loli.net/2020/07/22/L8k9BdlPDbjHWEf.png)

   ![new task2](http://ww1.sinaimg.cn/large/826d6e88gy1ggzj9g965oj21ig0ra75u.jpg)

   ![git url](https://i.loli.net/2020/07/22/Sto914RzZn3yAeW.png)

   + 添加github账户为credentials

   ![add github account](https://i.loli.net/2020/07/22/IbUzQow3riABXv7.png)

   ![environment](https://i.loli.net/2020/07/22/6cvWkwuf2r1RIjD.png)

   ![shell](https://i.loli.net/2020/07/22/zJTSFqe7EY5VOIU.png)

   + github 项目添加 webhook

   ![webhook](http://ww1.sinaimg.cn/large/826d6e88gy1ghg0bpax5oj21ig0rawgg.jpg)

6. 更新远程仓库会后自动构建

   ![output1](http://ww1.sinaimg.cn/large/826d6e88gy1ggzkcjq59fj21ig0raju3.jpg)

   ![output2](http://ww1.sinaimg.cn/large/826d6e88gy1ggzkdkj9eaj21ig0rajt9.jpg)
