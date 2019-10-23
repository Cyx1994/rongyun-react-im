import { SET_AUTH, CLEAR_AUTH } from './action';
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
        case CLEAR_AUTH: {
            return {
                token: '',
                userId: '',
            };
        }
        default: return state;
    }
}