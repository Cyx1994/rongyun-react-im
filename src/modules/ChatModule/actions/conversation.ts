import { Conversation } from '../interface';
import { toast } from 'react-toastify';
const SET_CONVERSATION_LIST = Symbol('list');
const PUSH_CONVERSATION = Symbol('item/push');
const REMOVE_CONVERSATION = Symbol('item/remove');
const CLEAR_CONVERSATION = Symbol('list/clear');
const STICK_CONVERSATION = Symbol('item/stick');
const SET_CONVERSATION_TARGET = Symbol('item/target');

const RongIMClient = RongIMLib.RongIMClient;

class ConversationActions {
    setList = (list: Conversation[]) => ({ type: SET_CONVERSATION_LIST, data: list })
    resetList = () => ({ type: SET_CONVERSATION_LIST, data: [] })
    getList = (count: number = 15) => {
        const _this = this;
        return (dispatch: any) => {
            // 测试环境频道
            const { PRIVATE } = RongIMLib.ConversationType;
            RongIMClient.getInstance().getConversationList({
                onSuccess: function (list: RongIMLib.Conversation[]) {
                    // list => 会话列表集合
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
    setTarget = (target?: Conversation) => {
        return (dispatch: any) => {
            // read message
            if (target) {
                this.clearUnReadCound(target);
            }
            dispatch({ type: SET_CONVERSATION_TARGET, data: target });
        }
    }
    clearUnReadCound = (target: Conversation) => {
        const { conversationType, targetId } = target;
        RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
            onSuccess: function () {
                // 清除未读消息成功
            },
            onError: function (error) {
                // error => 清除未读消息数错误码
            }
        });
    }
}

const conversationActions = new ConversationActions();

export default conversationActions;
export { SET_CONVERSATION_LIST, PUSH_CONVERSATION, REMOVE_CONVERSATION, STICK_CONVERSATION, SET_CONVERSATION_TARGET, CLEAR_CONVERSATION };