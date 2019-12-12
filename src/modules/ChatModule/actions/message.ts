import { Message, Conversation } from '../interface';
import conversationActions from './conversation';
import { talkToAnyTalkRobot } from '../../../utils/mock';
const SET_CONVERSATION_HISTORY = Symbol('list');
const PUSH_CONVERSATION_HISTORY = Symbol('item/push');
const POP_CONVERSATION_HISTORY = Symbol('item/pop');
const UNSHIFT_CONVERSATION_HISTORY = Symbol('item/unshift');
const CLEAR_CONVERSATION_HISTORY = Symbol('item/clear');
const CLEAR_ALL_CONVERSATION_HISTORY = Symbol('list/clear');
const SET_CONVERSATION_HISTORY_HASMORE = Symbol('list/rest');

const RongIMClient = RongIMLib.RongIMClient;


class MessageActions {
    setHistroy = (id: string, data: Message[]) => ({ type: SET_CONVERSATION_HISTORY, id, data })

    resetHistory = () => ({ type: CLEAR_ALL_CONVERSATION_HISTORY })

    setHasMore = (has: boolean) => ({ type: SET_CONVERSATION_HISTORY_HASMORE, has })

    unshiftHistory = (id: string, data: Message[]) => ({ type: UNSHIFT_CONVERSATION_HISTORY, id, data })

    pushHistory = (id: string, data: Message | Message[]) => {
        return (dispatch: any, getState: any) => {
            const conversationList: Conversation[] = getState().chat.conversationList;
            if (conversationList.find(c => c.targetId === id)) {
                dispatch(conversationActions.stickConversation(id, true));
                dispatch({ type: PUSH_CONVERSATION_HISTORY, id, data });
            } else {
                dispatch(conversationActions.getList());
                dispatch({ type: PUSH_CONVERSATION_HISTORY, id, data });
            }
        }

    }

    getHistory = (id: string, conversationType: RongIMLib.ConversationType = RongIMLib.ConversationType.PRIVATE) => {
        const _this = this;
        return (dispatch: any, getState: any) => {
            try {
                RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, id, null, 10, {
                    onSuccess: function (list, hasMsg) {
                        /*
                            list: 获取的历史消息列表
                            hasMsg: 是否还有历史消息可以获取
                          */
                        dispatch(_this.unshiftHistory(id, list));
                        dispatch({ type: SET_CONVERSATION_HISTORY_HASMORE, has: hasMsg });
                    },
                    onError: function (error) {
                        // 请排查：单群聊消息云存储是否开通
                        console.log('获取历史消息失败', error);
                    }
                });
            } catch (e) {
                console.log('消息服务尚未初始化')
            }
        }
    }

    sendTextMsg = (id: string, content: string, cb?: () => void) => {
        const _this = this;
        return (dispatch: any) => {

            const msg = new RongIMLib.TextMessage({ content: content });
            const conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊, 其他会话选择相应的会话类型即可
            var targetId = id; // 目标 Id
            RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
                onSuccess: function (message) {
                    // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
                    console.log('Send successfully');
                    if (message) {
                        dispatch(_this.pushHistory(id, message));
                        // TODO: 更新会话的lastmsg
                        dispatch(conversationActions.getList());
                        if (cb) {
                            cb();
                        }
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

    talkToRobot = (targetId: string, content: string) => {
        return (dispatch: any) => {

            dispatch(this.sendTextMsg(targetId, content, () => {
                talkToAnyTalkRobot(content).then((answer) => {
                    const returnMsg: any = {
                        ...(new RongIMLib.TextMessage({ content: { content: answer } })),
                        senderUserId: targetId,
                        messageUId: new Date().getTime()
                    };
                    dispatch(this.pushHistory(targetId, returnMsg));
                    // TODO: 更新会话的lastmsg
                    dispatch(conversationActions.getList());
                })
            }))
        }
    }


}

const messageActions = new MessageActions();

export default messageActions;

export {
    SET_CONVERSATION_HISTORY,
    PUSH_CONVERSATION_HISTORY,
    POP_CONVERSATION_HISTORY,
    UNSHIFT_CONVERSATION_HISTORY,
    CLEAR_CONVERSATION_HISTORY,
    CLEAR_ALL_CONVERSATION_HISTORY,
    SET_CONVERSATION_HISTORY_HASMORE
};