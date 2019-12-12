import React from 'react';
import { AppBar, Toolbar, Container, Typography, CssBaseline, Box, Hidden } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ConversationContent from './conversation-content';
import ConversationEditor from './message-editor';

import { Conversation, Message } from '../interface';


interface WindowProps {
    conversation: Conversation;
    chatHistory?: Message[],
    myId: string,
    onSend: (text: string) => void;
    onLoadHistory: () => void;
    hasMore: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            background: theme.palette.secondary.light
        },
        container: {
            flex: 1,
            overflow: 'hidden',
            padding: 0,
            maxWidth: 1920,
            backgroundColor: theme.palette.background.default
        }
    }),
);

const ConversationWindow: React.FC<WindowProps> = ({ conversation, onSend, onLoadHistory, chatHistory, myId, hasMore }) => {
    const { conversationTitle, draft, targetId } = conversation;
    const classes = useStyles();

    return (
        <Box display="flex" height="100%" style={{ flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="relative" className={classes.header}>
                <Toolbar>
                    <Typography variant="h6">{conversationTitle || targetId}</Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.container} >
                <ConversationContent history={chatHistory} targetId={targetId} myId={myId} onLoad={onLoadHistory} hasMore={hasMore} />
            </Container>
            <Hidden smUp>
                <ConversationEditor size="small" draft={draft} onSend={onSend} />
            </Hidden>
            <Hidden xsDown>
                <ConversationEditor size="large" draft={draft} onSend={onSend} />
            </Hidden>

        </Box>
    );
}

export default ConversationWindow;