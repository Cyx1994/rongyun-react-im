import React from 'react';
import { AppBar, Toolbar, Container, Typography, CssBaseline, Box } from '@material-ui/core';
import ConversationContent from './components/content';
import ConversationEditor from './components/editor';

import { Conversation } from '../../interface';


interface WindowProps {
    conversation: Conversation;
}



const ConversationWindow: React.FC<WindowProps> = ({ conversation }) => {
    const { conversationTitle, draft, history = [] } = conversation;
    return (
        <Box display="flex" height="100%" style={{ flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="relative" color="secondary">
                <Toolbar>
                    <Typography variant="h6">{conversationTitle}</Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ flex: 1, overflow: 'hidden' }}>
                <ConversationContent history={history} />
            </Container>
            <ConversationEditor draft={draft} onSend={(e) => console.log(e)} />
        </Box>
    );
}

export default ConversationWindow;