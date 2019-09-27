import {
    SET_CONVERSATION_LIST, PUSH_CONVERSATION, STICK_CONVERSATION, REMOVE_CONVERSATION,
    SET_CONVERSATION_TARGET,
    SET_CONVERSATION_HISTORY, PUSH_CONVERSATION_HISTORY, CLEAR_CONVERSATION_HISTORY
} from '../actions/chat';
import { Reducer } from 'redux';
import { Conversation, Message } from '../interface';

interface State {
    conversationList: Conversation[];
    target?: Conversation;
    chatHistory: {
        [key: string]: Message[]
    };
}

const ChatReducer: Reducer<State> = (state = {
    conversationList: [],
    chatHistory: {},
}, action) => {
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
        case SET_CONVERSATION_TARGET: {
            return {
                ...state,
                target: action.data
            }
        }
        case SET_CONVERSATION_HISTORY: {
            if (!action.id) {
                return state;
            }
            let temp = { ...state.chatHistory };
            temp[action.id] = action.data;
            return {
                ...state,
                chatHistory: temp,
            };
        }
        case PUSH_CONVERSATION_HISTORY: {
            if (!action.id) {
                return state;
            }
            let temp = { ...state.chatHistory };
            let history = temp[action.id];
            if (!history) {
                history = [action.data]
            } else {
                history.push(action.data);
            }
            temp[action.id] = history;
            return {
                ...state,
                chatHistory: temp
            };
        }
        case CLEAR_CONVERSATION_HISTORY: {
            if (!action.id || !state.chatHistory[action.id]) {
                return state;
            }
            let temp = { ...state.chatHistory };
            delete temp[action.id];
            return {
                ...state,
                chatHistory: temp,
            };
        }
        default: return state;
    }
}

export default ChatReducer;