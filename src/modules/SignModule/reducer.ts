import { SET_AUTH, CLEAR_AUTH, SET_STATUS } from './action';
import { AnyAction } from 'redux'

export interface Auth {
    token: string,
    userId: string,
    name?: string,
    portraitUri?: string,
    status: RongIMLib.ConnectionStatus
}

const initialState: Auth = {
    token: '',
    userId: '',
    status: RongIMLib.ConnectionStatus.DISCONNECTED
}

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_AUTH: {
            return action.data;
        }
        case CLEAR_AUTH: {
            return initialState;
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default: return state;
    }
}