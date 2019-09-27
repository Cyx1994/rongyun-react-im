This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 使用方法

项目能够启动后，你还得：

### 注册融云服务

进入 [RongCloudService](https://developer.rongcloud.cn/app/appService) 注册你自己的应用,
获取appKey, 替换项目内的appkey,
并用 [融云API调试工具](https://developer.rongcloud.cn/apitool/) 获取虚拟用户的token (虚拟用户userId 为 admin), 替换 Container.tsx 文件内的token。（登录还未做，暂时这么用）<br>

### 模拟聊天

选择左侧的模拟会话,在窗口内会显示聊天内容。

发送：编辑文字并发送，RongCloudService 会收到信息。<br>
接受：通过 [融云API调试工具](https://developer.rongcloud.cn/apitool/) - 消息服务 - 发送单聊消息 , 填写 fromUserId = empty_ , toUserId = admin, 编辑content内容, 页面可接收到该消息。
