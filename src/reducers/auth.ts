import { SET_AUTH, UPDATE_AUTH, CLEAR_AUTH } from '../actions/auth';
import { AnyAction } from 'redux'

const initialState = {
    userInfo: {
        username: ''
    },
}

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_AUTH: {
            return state;
        }
        case UPDATE_AUTH: {
            return state;
        }
        case CLEAR_AUTH: {
            return state;
        }
        default: return state;
    }
}