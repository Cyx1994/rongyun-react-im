import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ConversationList from './list';
import ConversationWindow from './conversation';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sider: {
            width: '20%',
            minWidth: 280,
            marginLeft: 0,
        },
        conversation: {
            flexGrow: 1,
        }
    }),
);

interface Porps extends RouteComponentProps {

}

const ChatPage: React.FC<Porps> = () => {
    const classes = useStyles();
    return <Box display="flex" height="100%">
        <Box className={classes.sider} >
            <ConversationList />
        </Box>

        <Box className={classes.conversation} >
            <ConversationWindow conversation={{ target: { name: 'admin' } }} />
        </Box>
    </Box>
}

export default ChatPage;