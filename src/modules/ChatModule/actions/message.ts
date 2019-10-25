import { Message } from '../interface';


const SET_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/SET';
const PUSH_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/PUSH';
const POP_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/POP';
const CLEAR_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/CLEAR';
const CLEAR_ALL_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/CLEAR_ALL';

const RongIMClient = RongIMLib.RongIMClient;


class MessageActions {
    setHistroy = (id: string, data: Message[]) => ({ type: SET_CONVERSATION_HISTORY, id, data })
    resetHistory = () => ({ type: CLEAR_ALL_CONVERSATION_HISTORY })
    pushHistory = (id: string, data: Message | Message[]) => ({ type: PUSH_CONVERSATION_HISTORY, id, data })
    sendTextMsg = (id: string, content: string) => {
        const _this = this;
        return (dispatch: any) => {
            const msg = new RongIMLib.TextMessage({ content: content, extra: 'test' });
            const conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的会话类型即可
            var targetId = id; // 目标 Id
            RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
                onSuccess: function (message) {
                    // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
                    console.log('Send successfully');
                    if (message) {
                        dispatch(_this.pushHistory(id, message));
                    }
                },
                onError: function (errorCode, message) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                    }
                    console.log('发送失败: ' + info + errorCode);
                }
            }
            );
        }
    }
    getHistory = (id: string, conversationType: RongIMLib.ConversationType = RongIMLib.ConversationType.PRIVATE) => {
        const _this = this;
        return (dispatch: any) => {
            RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, id, 0, 20, {
                onSuccess: function (list, hasMsg) {
                    /*
                        list: 获取的历史消息列表
                        hasMsg: 是否还有历史消息可以获取
                      */
                    _this.pushHistory(id, list);
                },
                onError: function (error) {
                    // 请排查：单群聊消息云存储是否开通
                    console.log('获取历史消息失败', error);
                }
            });
        }
    }
}

const messageActions = new MessageActions();

export { messageActions, SET_CONVERSATION_HISTORY, PUSH_CONVERSATION_HISTORY, POP_CONVERSATION_HISTORY, CLEAR_CONVERSATION_HISTORY, CLEAR_ALL_CONVERSATION_HISTORY };