import React, { useEffect } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes, Navigators } from './router';
import { ToastContainer } from 'react-toastify';
import { BaseLayout } from '../layout';

import { conversationActions, messageActions } from '../modules/ChatModule';
import { authActions } from '../modules/SignModule'
import * as RongIM from '../libs/RongIM';

interface Props extends RouteComponentProps {
    token: string;
    name: string;
    userId: string;
    getConversationList: () => void;
    onReceivedMessage: (fromId: string, message: RongIMLib.Message) => void;
    signOut: () => void;
}

const CommonContainerComponent: React.FC<Props> = ({ token, name, userId, history, getConversationList, onReceivedMessage, signOut }) => {
    const defaultRedirectTo: string = Routes[0].path + '' || '/';

    useEffect(() => {
        if (!token) {
            history.replace('/sign');
        }
        /* 需全局接受消息,则程序在加载钱需初始化 */
        RongIM.Client
            .init(token, onReceivedMessage)
            .then(() => {
                getConversationList();
            })
    });

    const handleSignOut = () => {
        signOut();
        history.replace('/sign');
    }

    return <BaseLayout
        title={name || userId || 'Empty_'}
        navigators={Navigators.map(item => ({ icon: item.icon, action: () => history.push(item.url) }))}
        actions={{
            signOut: handleSignOut
        }}
    >
        <Switch>
            {
                Routes.map((route, index) => <Route key={index} {...route} />)
            }
            <Redirect to={defaultRedirectTo} />
        </Switch>

        <ToastContainer
            position="top-right"
            autoClose={2000}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable={false}
            pauseOnHover
        />
    </BaseLayout >
}

const mapStateToProps = (state: any) => ({
    ...state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
    getConversationList: () => dispatch(conversationActions.getList()),
    onReceivedMessage: (fromId: string, message: RongIMLib.Message) => dispatch(messageActions.pushHistory(fromId, message)),
    signOut: () => { dispatch(authActions.signOut); dispatch(conversationActions.setTarget()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonContainerComponent);