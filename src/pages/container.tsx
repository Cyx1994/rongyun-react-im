import React, { useEffect } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes, Navigators } from './router';
import { ToastContainer } from 'react-toastify';
import { BaseLayout } from '../layout';

import { conversationActions } from '../actions/chat';
import * as RongIM from '../libs/RongIM';

interface Props extends RouteComponentProps {
    getConversationList: () => void,
}

const CommonContainerComponent: React.FC<Props> = ({ history, getConversationList }) => {
    const defaultRedirectTo: string = Routes[0].path + '' || '/';
    useEffect(() => {
        const token = 'JPaYmg0fYWlhwd3qW/wG5FJsuyCZh/ozFooDY7B1hy8KWxLts1AQU3nbc3YMeXu5MAbAchtOR7sa5rfVWVEhCQ==';
        RongIM.Client.init(token)
            .then(() => {
                getConversationList();
            })
    })
    return <BaseLayout navigators={Navigators.map(item => ({ icon: item.icon, action: () => history.push(item.url) }))}>
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

})

const mapDispatchToProps = (dispatch: any) => ({
    getConversationList: () => dispatch(conversationActions.getList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonContainerComponent);