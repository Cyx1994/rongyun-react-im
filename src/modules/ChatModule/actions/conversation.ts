import { Conversation } from '../interface';

const SET_CONVERSATION_LIST = 'CONVERSATION_LIST/SET';
const PUSH_CONVERSATION = 'CONVERSATION_LIST/PUSH';
const REMOVE_CONVERSATION = 'CONVERSATION_LIST/REMOVE';
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
                    // do something
                    console.log(error);
                }
            }, [PRIVATE], count, false);
        }
    }
    setTarget = (target?: Conversation) => ({ type: SET_CONVERSATION_TARGET, data: target })
}

const conversationActions = new ConversationActions();

export { conversationActions, SET_CONVERSATION_LIST, PUSH_CONVERSATION, REMOVE_CONVERSATION, STICK_CONVERSATION, SET_CONVERSATION_TARGET };