# 使用 SSH通过密钥登录远程服务器

1. 用某用户登录服务器

2. `ssh-keygen`，连续按三次enter

3. 输入以下命令
```bash
   cd ~/.ssh
   cat id_rsa.pub >> authorized_keys
   chmod 600 authorized_keys
   chmod 700 ~/.ssh
```

4. 编辑sshd_conig文件`vim /etc/ssh/sshd_config`

```
# 禁用root账户登录，非必要，但为了安全性，请配置
PermitRootLogin no

# 是否让 sshd 去检查用户家目录或相关档案的权限数据，这是为了担心使用者将某些重要档案的权限设错，可能会导致一些问题所致。例如使用者的 ~/.ssh/ 权限设错时，某些特殊情况下会不许用户登入
StrictModes no

# 以下两条是关键！是否允许用户自行使用成对的密钥系统进行登入行为，仅针对 version 2。至于自制的公钥数据就放置于用户家目录下的 .ssh/authorized_keys 内
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# 是否禁用密码登录
# PasswordAuthentication no
```

5. `service sshd restart`

6. 将密钥下载到本地电脑上

   `sz ./id_rsa`

7. 在你的远程登录工具（FinalShell、Xshell...）上选择ssh公钥登录

   + Xshell示例

   ![Xsheel](http://ww1.sinaimg.cn/large/826d6e88gy1ghib8odqi7j20j40hqjsf.jpg)

   + FinalShell示例，可能会提示格式不对，按照提示1的命令转化即可

   ![FinalShell](http://ww1.sinaimg.cn/large/826d6e88gy1ghibbkip4yj20jg08e3yo.jpg)

