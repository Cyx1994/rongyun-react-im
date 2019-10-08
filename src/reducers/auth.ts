import { SET_AUTH, UPDATE_AUTH, CLEAR_AUTH } from '../actions/auth';
import { AnyAction } from 'redux'

type State = {
    token: string,
    userId: string,
    name?: string,
    portraitUri?: string,
}

const initialState: State = {
    token: '',
    userId: '',
}

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_AUTH: {
            return action.data;
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