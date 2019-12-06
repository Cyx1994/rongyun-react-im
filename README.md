## 使用方法

可进入[](https://www.shunongs.shop)

### 注册融云服务

进入 [RongCloudService](https://developer.rongcloud.cn/app/appService) 注册你自己的应用,
获取appKey, 替换项目内的config.ts内的appkey与scret,


### 登录

任意账号，密码与账号相同。

### 模拟聊天

点击聊天窗口的创建会话,在窗口内会显示聊天内容。

发送：编辑文字并发送，RongCloudService 会收到信息。<br>
接受：通过 [融云API调试工具](https://developer.rongcloud.cn/apitool/) - 消息服务 - 发送单聊消息 , 填写 fromUserId = [任意角色] , toUserId = [你的登录名], 编辑content内容, 页面可接收到该消息。

### Doing

使用聊天机器人模拟通讯录成员，完善创建会话过程。
 