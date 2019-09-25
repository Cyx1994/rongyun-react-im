import React from 'react';
import { Box } from '@material-ui/core';
import AppBarComponent from './components/AppBarComponent';

type Navigate = {
    action: () => void,
    icon: React.ReactNode
}

type Props = {
    navigators?: Navigate[]
}

const BaseLayout: React.SFC<Props> = ({ children, navigators = [] }) => {
    return <Box height="100%">
        <AppBarComponent navigators={navigators} />
        {children}
    </Box>
}

export default BaseLayout;