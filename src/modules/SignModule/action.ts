import http from '../../utils/http';
import Api from '../../utils/api';

export const SET_AUTH = 'AUTH/SET';
export const UPDATE_AUTH = 'AUTH/UPDATE';
export const CLEAR_AUTH = 'AUTH/CLEAR';

export interface Auth {
    token: string,
    userId: string,
    name?: string,
    portraitUri?: string,
}

export interface AuthRequestParams {
    username: string,
    password: string,
    verifyCode?: string,
}

class AuthActions {
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
            
        }
    }
}

const authActions = new AuthActions();

export { authActions };