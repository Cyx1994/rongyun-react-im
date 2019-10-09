import React from 'react';
import { Box } from '@material-ui/core';
import AppBarComponent from './components/AppBarComponent';

type Navigate = {
    action: () => void,
    icon: React.ReactNode
}

type Props = {
    navigators?: Navigate[],
    title: string,
    actions: {
        [props: string]: any
    }
}

const BaseLayout: React.SFC<Props> = ({ children, navigators = [], title, actions }) => {
    return <Box height="100%">
        <AppBarComponent navigators={navigators} title={title} actions={actions} />
        {children}
    </Box>
}


export default BaseLayout;