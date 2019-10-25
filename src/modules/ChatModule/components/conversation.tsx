import React from 'react';
import { AppBar, Toolbar, Container, Typography, CssBaseline, Box } from '@material-ui/core';
import ConversationContent from './conversation-content';
import ConversationEditor from './message-editor';

import { Conversation, Message } from '../interface';


interface WindowProps {
    conversation: Conversation;
    chatHistory?: Message[],
    myId: string,
    onSend: (text: string) => void;
    onLoadHistory: () => void;
}



const ConversationWindow: React.FC<WindowProps> = ({ conversation, onSend, onLoadHistory, chatHistory, myId }) => {

    const { conversationTitle, draft, targetId } = conversation;
    return (
        <Box display="flex" height="100%" style={{ flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="relative" color="secondary">
                <Toolbar>
                    <Typography variant="h6">{conversationTitle || targetId}</Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ flex: 1, overflow: 'hidden' }}>
                <ConversationContent history={chatHistory} myId={myId} onLoad={onLoadHistory} />
            </Container>
            <ConversationEditor draft={draft} onSend={onSend} />
        </Box>
    );
}

export default ConversationWindow;