import React from 'react';
import { Box } from '@material-ui/core';
import AppBarComponent from './components/AppBarComponent';


const BaseLayout: React.SFC = ({ children }) => {
    return <Box>
        <AppBarComponent />
        <Box>
            {children}
        </Box>
    </Box>
}

export default BaseLayout;