import React from 'react';
import { AppBar, Toolbar, Container, Typography, CssBaseline, Box } from '@material-ui/core';
import ConversationContent from './components/content';
import ConversationEditor from './components/editor';

import { Conversation, Message } from '../../interface';


interface WindowProps {
    conversation: Conversation;
    chatHistory: Message[],
    onSend: (text: string) => void;
}



const ConversationWindow: React.FC<WindowProps> = ({ conversation, onSend, chatHistory }) => {
    const { conversationTitle, draft } = conversation;
    return (
        <Box display="flex" height="100%" style={{ flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="relative" color="secondary">
                <Toolbar>
                    <Typography variant="h6">{conversationTitle}</Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ flex: 1, overflow: 'hidden' }}>
                <ConversationContent history={chatHistory} />
            </Container>
            <ConversationEditor draft={draft} onSend={onSend} />
        </Box>
    );
}

export default ConversationWindow;