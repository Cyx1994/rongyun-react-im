import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, colors } from '@material-ui/core';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sider: {
            width: '100%',
            maxWidth: 380,
            backgroundColor: theme.palette.background.default,
        },
        conversation: {
            flexGrow: 1,
            backgroundColor: colors.blueGrey[100],
        }
    }),
);

interface Porps extends RouteComponentProps {

}

const ChatPage: React.FC<Porps> = () => {
    const classes = useStyles();
    return <Box display="flex" height="100%">
        <Box className={classes.sider} />
        <Box className={classes.conversation} />
    </Box>
}

export default ChatPage;