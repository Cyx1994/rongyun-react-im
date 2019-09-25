import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Routes, Navigators } from './router';
import { ToastContainer } from 'react-toastify';
import { BaseLayout } from '../layout';

interface Props extends RouteComponentProps {

}

const CommonContainerComponent: React.FC<Props> = ({ history }) => {
    const defaultRedirectTo: string = Routes[0].path + '' || '/';

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
            // hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable={false}
            pauseOnHover
        />
    </BaseLayout >
}

export default CommonContainerComponent;