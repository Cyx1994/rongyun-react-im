import React from 'react';
import { AppBar, Toolbar, Container, Typography, CssBaseline, Box } from '@material-ui/core';
import ConversationContent from './components/content';
import ConversationEditor from './components/editor';

import { ConversationT1 } from '../../interface';


interface WindowProps {
    conversation: ConversationT1;
}



const ConversationWindow: React.FC<WindowProps> = ({ conversation }) => {
    const { target, editing, history = [] } = conversation;
    return (
        <Box display="flex" height="100%" style={{ flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="relative" color="secondary">
                <Toolbar>
                    <Typography variant="h6">{target.name}</Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ flex: 1, overflow: 'hidden' }}>
                <ConversationContent history={history} />
            </Container>
            <ConversationEditor editing={editing} onSend={(e) => console.log(e)} />
        </Box>
    );
}

export default ConversationWindow;