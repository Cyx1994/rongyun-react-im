import { SET_CONVERSATION_LIST, PUSH_CONVERSATION, STICK_CONVERSATION, REMOVE_CONVERSATION } from '../actions/chat';
import { AnyAction } from 'redux'
import { Conversation } from '../interface';

interface State {
    conversationList: Conversation[]
}

const initialState: State = {
    conversationList: [],
}

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_CONVERSATION_LIST: {
            return {
                ...state,
                conversationList: action.data
            };
        }
        case PUSH_CONVERSATION: {
            return {
                ...state,
                conversationList: [...state.conversationList, action.data]
            };
        }
        case STICK_CONVERSATION: {
            const targetIndex = state.conversationList.findIndex(c => c.targetId === action.id);
            if (targetIndex > -1) {
                const temp = state.conversationList.slice();
                temp[targetIndex].isTop = true;
                return {
                    ...state,
                    conversationList: temp
                };
            } else {
                return state;
            }
        }
        case REMOVE_CONVERSATION: {
            const targetIndex = state.conversationList.findIndex(c => c.targetId === action.id);
            if (targetIndex > -1) {
                const temp = state.conversationList.slice();
                temp.splice(targetIndex, 1);
                return {
                    ...state,
                    conversationList: temp
                };
            } else {
                return state;
            }
        }
        default: return state;
    }
}