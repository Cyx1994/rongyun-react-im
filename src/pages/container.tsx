import React, { useEffect } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes, Navigators } from './router';
import { ToastContainer } from 'react-toastify';
import { BaseLayout } from '../layout';

import { conversationActions, chatActions } from '../actions/chat';
import { CLEAR_AUTH } from '../actions/auth';
import { SET_CONVERSATION_TARGET } from '../actions/chat';
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
        RongIM.Client
            .init(token, onReceivedMessage)
            .then(() => {
                getConversationList();
            })
    })

    const handleSignOut = () => {
        signOut();
        history.replace('/sign');
    }

    return <BaseLayout
        navigators={Navigators.map(item => ({ icon: item.icon, action: () => history.push(item.url) }))}
        title={name || userId || 'Empty_'}
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
    onReceivedMessage: (fromId: string, message: RongIMLib.Message) => dispatch(chatActions.pusHistory(fromId, message)),
    signOut: () => { dispatch({ type: CLEAR_AUTH }); dispatch({ type: SET_CONVERSATION_TARGET, data: undefined }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonContainerComponent);