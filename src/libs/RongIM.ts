import Config from '../config';
const RongIMClient = RongIMLib.RongIMClient;

export class Client {
    static init(token: string, onReceived: any, params?: any): Promise<void> {
        RongIMClient.init(Config.appKey);
        this.listenConnectStatus();
        this.listenMessage(onReceived);
        return this.connect(token);
        // 更多参考: http://www.rongcloud.cn/docs/web_api_demo.html
    }

    static listenConnectStatus(): void {
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status: any) {
                // status 标识当前连接状态
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }
        });
    }

    static listenMessage(onReceived: (id: string, msg: RongIMLib.Message) => void): void {
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message: RongIMLib.Message) {
                console.log('receieved a message:', message)
                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        // message.content.content => 文字内容
                        onReceived(message.senderUserId, message);
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // message.content.content => 格式为 AMR 的音频 base64
                        onReceived(message.senderUserId, message);
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // message.content.content => 图片缩略图 base64
                        // message.content.imageUri => 原图 URL
                        onReceived(message.senderUserId, message);
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // message.content.latiude => 纬度
                        // message.content.longitude => 经度
                        // message.content.content => 位置图片 base64
                        onReceived(message.senderUserId, message);
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // message.content.content => 文本消息内容
                        // message.content.imageUri => 图片 base64
                        // message.content.url => 原图 URL
                        onReceived(message.senderUserId, message);
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something
                        break;
                    default:
                    // do something
                }
            }
        });
    }

    static connect(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            RongIMClient.connect(token, {
                onSuccess: function (userId) {
                    console.log('Connect successfully. ' + userId);
                    resolve();
                },
                onTokenIncorrect: function () {
                    console.log('token 无效');
                    reject();
                },
                onError: function (errorCode) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ConnectionState.UNACCEPTABLE_PROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                    }
                    console.log(info);
                    reject(info);
                }
            });
        })
    }

    static reconnect(): void {
        var callback = {
            onSuccess: function (userId: string | number) {
                console.log('Reconnect successfully. ' + userId);
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode: number) {
                console.log(errorCode);
            }
        };
        var config = {
            // 默认 false, true 启用自动重连，启用则为必选参数
            auto: true,
            // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
            url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
            // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
            rate: [100, 1000, 3000, 6000, 10000]
        };
        RongIMClient.reconnect(callback, config);
    }
}
