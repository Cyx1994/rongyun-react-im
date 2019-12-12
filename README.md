## 使用方法

可在[这里](http://www.shunong.shop/x-im)使用demo;

### 注册融云服务

1. 进入 [RongCloudService](https://developer.rongcloud.cn/app/appService) 注册你自己的应用,
2. 获取appKey, 替换项目内的config.ts内的appkey与scret,


### 登录

* 任意账号,密码与账号相同。
* 推荐admin,包含历史记录。

### 模拟聊天

* 发送：编辑文字并发送，RongCloudService 会收到信息。<br>
* 接受：通过 [融云API调试工具](https://developer.rongcloud.cn/apitool/) - 消息服务 - 发送单聊消息,<br>
填写 fromUserId = [任意角色] , toUserId = [你的登录名], 编辑content内容, 页面可接收到该消息。

### 图灵机器人

* 打开联系人界面-选择哈利波特或叶奈法-任务信息卡片左下角点聊天，编辑信息发送即可交流。<br>
**演示功能不便部署，该功能仅限本地使用，不会计入融云聊天记录**

### TodoList

* ~~图灵机器人~~
* UI美化，主题控制。
 