import { Conversation } from '../interface';
import { toast } from 'react-toastify';
const SET_CONVERSATION_LIST = 'CONVERSATION_LIST/SET';
const PUSH_CONVERSATION = 'CONVERSATION_LIST/PUSH';
const REMOVE_CONVERSATION = 'CONVERSATION_LIST/REMOVE';
const CLEAR_CONVERSATION = 'CONVERSATION_LIST/CLEAR';
const STICK_CONVERSATION = 'CONVERSATION_LIST/SITCK';
const SET_CONVERSATION_TARGET = 'CONVERSATION_TARGET/SET';

const RongIMClient = RongIMLib.RongIMClient;

class ConversationActions {
    setList = (list: Conversation[]) => ({ type: SET_CONVERSATION_LIST, data: list })
    getList = (count: number = 15) => {
        const _this = this;
        return (dispatch: any) => {
            // 测试环境频道
            const { PRIVATE } = RongIMLib.ConversationType;
            RongIMClient.getInstance().getConversationList({
                onSuccess: function (list: RongIMLib.Conversation[]) {
                    // list => 会话列表集合
                    console.log('conversationList :', list);
                    dispatch(_this.setList(list));
                },
                onError: function (error) {
                    toast.error('获取会话列表失败 ' + error);
                }
            }, [PRIVATE], count, false);
        }
    }
    set = (targetId: string, data: RongIMLib.Conversation, conversationType: RongIMLib.ConversationType = RongIMLib.ConversationType.PRIVATE) => {
        const _this = this;
        return (dispatch: any) => {
            RongIMClient.getInstance().getConversation(conversationType, targetId, {
                onSuccess: (con) => {
                    if (con) {
                        const temp: any = { ...con, ...data };
                        RongIMLib.RongIMClient.getInstance().updateConversation(temp);
                        _this.getList();
                        console.log('updateConversation Success!');
                    }
                },
                onError: (error) => {
                    toast.error('修改会话失败 ' + error);
                }
            })
        }
    }
    delete = (targetId: string, conversationType: RongIMLib.ConversationType = RongIMLib.ConversationType.PRIVATE) => {
        return (dispatch: any) => {
            RongIMClient.getInstance().removeConversation(conversationType, targetId, {
                onSuccess: function (bool) {
                    // 删除会话成功
                    if (bool) {
                        dispatch({ type: REMOVE_CONVERSATION, id: targetId })
                    }
                },
                onError: function (error) {
                    // error => 删除会话的错误码
                    console.log('发生错误: ', error);
                }
            });
        }
    }
    clear = () => {
        return (dispatch: any) => {
            RongIMClient.getInstance().clearConversations({
                onSuccess: function () {
                    dispatch({ type: CLEAR_CONVERSATION })
                },
                onError: function (error) {
                    // error => 清除会话错误码
                }
            })
        }
    }
    setTarget = (target?: Conversation) => ({ type: SET_CONVERSATION_TARGET, data: target })
}

const conversationActions = new ConversationActions();

export { conversationActions, SET_CONVERSATION_LIST, PUSH_CONVERSATION, REMOVE_CONVERSATION, STICK_CONVERSATION, SET_CONVERSATION_TARGET, CLEAR_CONVERSATION };