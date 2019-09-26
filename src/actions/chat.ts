import * as RongIM from '../libs/RongIM';
import { Dispatch } from 'redux';
import { Conversation } from '../interface';

export const SET_CONVERSATION_LIST = 'CONVERSATION_LIST/SET';
export const PUSH_CONVERSATION = 'CONVERSATION_LIST/PUSH';
export const REMOVE_CONVERSATION = 'CONVERSATION_LIST/REMOVE';
export const STICK_CONVERSATION = 'CONVERSATION_LIST/SITCK';

class ConversationActions {
    setList = (list: Conversation[]) => ({ type: SET_CONVERSATION_LIST, data: list })
    getList = (count: number = 15) => {
        return (dispatch: Dispatch) => {
            RongIM.Client.getConversationList(count)
                .then(list => dispatch(this.setList(list)));
        }
    }
}



const conversationActions = new ConversationActions();
export { conversationActions };