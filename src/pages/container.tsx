import React, { useEffect } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes, Navigators } from './router';
import { BaseLayout } from '../layout';
import { conversationActions, messageActions } from '../modules/ChatModule';
import { authActions } from '../modules/SignModule'
import * as RongIM from '../libs/RongIM';

interface Props extends RouteComponentProps {
    token: string;
    name: string;
    userId: string;
    status: RongIMLib.ConnectionStatus;
    getConversationList: () => void;
    onStatusChange: (status: RongIMLib.ConnectionStatus) => void;
    onReceivedMessage: (fromId: string, message: RongIMLib.Message) => void;
    signOut: () => void;
}

const CommonContainerComponent: React.FC<Props> = ({ token, status, history, getConversationList, onStatusChange, onReceivedMessage, signOut }) => {
    const defaultRedirectTo: string = Routes[0].path + '' || '/';
    useEffect(() => {
        /* 需全局接受消息,则程序在加载钱需初始化 */
        RongIM.Client
            .init(token.slice(), onReceivedMessage, onStatusChange)
            .then(() => {
                getConversationList();
            })

    }, [token, getConversationList, onReceivedMessage, onStatusChange]);

    useEffect(() => {
        if (!token) {
            history.replace('/sign');
        }
    }, [token, history])

    const handleSignOut = () => {
        signOut();
    }

    return <BaseLayout
        title='X-IM'
        navigators={Navigators.map(item => ({ icon: item.icon, action: () => history.push(item.url) }))}
        actions={{
            signOut: handleSignOut
        }}
        status={status}
    >
        <Switch>
            {
                Routes.map((route, index) => <Route key={index} {...route} />)
            }
            <Redirect to={defaultRedirectTo} />
        </Switch>
    </BaseLayout >
}

const mapStateToProps = (state: any) => ({
    ...state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
    getConversationList: () => dispatch(conversationActions.getList()),
    onReceivedMessage: (fromId: string, message: RongIMLib.Message) => dispatch(messageActions.pushHistory(fromId, message)),
    signOut: () => dispatch(authActions.signOut()),
    onStatusChange: (status: RongIMLib.ConnectionStatus) => dispatch(authActions.setStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonContainerComponent);