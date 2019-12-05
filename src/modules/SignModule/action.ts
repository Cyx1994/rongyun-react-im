import http from '../../utils/http';
import Api from '../../utils/api';
import { messageActions, conversationActions } from '../ChatModule'

const RongIMClient = RongIMLib.RongIMClient;

const SET_AUTH = Symbol('auth');
const UPDATE_AUTH = Symbol('auth/set');
const CLEAR_AUTH = Symbol('auth/clear');
const SET_STATUS = Symbol('status/set');

class AuthActions {
    setStatus = (status: RongIMLib.ConnectionStatus) => ({ type: SET_STATUS, status })
    signIn(authParams: { username: string, password: string }, cb?: () => void) {
        return (dispatch: any) => {
            http.post(Api.auth.getToken, { ...authParams, userId: authParams.username })
                .then((res: any) => {
                    delete res.code;
                    dispatch({ type: SET_AUTH, data: res });
                    if (cb) {
                        cb();
                    }
                })
        }
    }
    signOut() {
        return (dispatch: any) => {
            RongIMClient.getInstance().logout();
            // RongIMClient.getInstance().disconnect();

            dispatch({ type: CLEAR_AUTH });
            dispatch(messageActions.resetHistory());
            dispatch(conversationActions.setTarget());
            dispatch(conversationActions.resetList());
        }
    }
}

const authActions = new AuthActions();

export default authActions;
export { SET_AUTH, SET_STATUS, UPDATE_AUTH, CLEAR_AUTH };

export interface AuthRequestParams {
    username: string,
    password: string,
    verifyCode?: string,
}