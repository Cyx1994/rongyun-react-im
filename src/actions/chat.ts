import { Dispatch } from 'redux';
import { Conversation, Message } from '../interface';

export const SET_CONVERSATION_LIST = 'CONVERSATION_LIST/SET';
export const PUSH_CONVERSATION = 'CONVERSATION_LIST/PUSH';
export const REMOVE_CONVERSATION = 'CONVERSATION_LIST/REMOVE';
export const STICK_CONVERSATION = 'CONVERSATION_LIST/SITCK';

export const SET_CONVERSATION_TARGET = 'CONVERSATION_TARGET/SET';

export const SET_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/SET';
export const PUSH_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/PUSH';
export const POP_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/POP';
export const CLEAR_CONVERSATION_HISTORY = 'CONVERSATION_HISTORY/CLEAR'

const RongIMClient = RongIMLib.RongIMClient;

class ConversationActions {
    setList = (list: Conversation[]) => ({ type: SET_CONVERSATION_LIST, data: list })
    getList = (count: number = 15) => {
        const _this = this;
        return (dispatch: Dispatch) => {
            // 测试环境频道
            const { PRIVATE } = RongIMLib.ConversationType;
            RongIMClient.getInstance().getConversationList({
                onSuccess: function (list: RongIMLib.Conversation[]) {
                    // list => 会话列表集合
                    console.log('conversationList :', list);
                    dispatch(_this.setList(list));
                },
                onError: function (error) {
                    // do something
                    console.log(error);
                }
            }, [PRIVATE], count, false);
        }
    }
}


class ChatActions {
    setHistroy = (id: string, data: Message[]) => ({ type: SET_CONVERSATION_HISTORY, id, data })
    pusHistory = (id: string, data: Message) => ({ type: PUSH_CONVERSATION_HISTORY, id, data })
    sendTextMsg = (id: string, content: string) => {
        const _this = this;
        return (dispatch: Dispatch) => {
            const msg = new RongIMLib.TextMessage({ content: content, extra: 'test' });
            const conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的会话类型即可
            var targetId = id; // 目标 Id
            RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
                onSuccess: function (message) {
                    // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
                    console.log('Send successfully');
                    if (message) {
                        dispatch(_this.pusHistory(id, message));
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
}


const conversationActions = new ConversationActions();
const chatActions = new ChatActions();
export { conversationActions, chatActions };