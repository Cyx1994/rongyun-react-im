import React from 'react';
import { Box } from '@material-ui/core';
import AppBarComponent from './components/AppBarComponent';
import StatusBar from './components/StatuBar';

type Navigate = {
    action: () => void,
    icon: React.ReactNode
}

type Props = {
    navigators?: Navigate[],
    title: string,
    actions: {
        [props: string]: any
    },
    status: RongIMLib.ConnectionStatus
}

const BaseLayout: React.SFC<Props> = ({ children, navigators = [], title, actions, status }) => {
    return <Box height="100%">
        <AppBarComponent navigators={navigators} title={title} actions={actions} />
        {status !== RongIMLib.ConnectionStatus.CONNECTED && <StatusBar status={status} />}
        {children}
    </Box>
}


export default BaseLayout;