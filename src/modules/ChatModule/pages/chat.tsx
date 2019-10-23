import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ConversationList from '../components/conversation-list';
import ConversationWindow from '../components/conversation';
import EmptyContent from '../components/empty-conversation';
import { conversationActions } from '../actions/conversation';
import { messageActions } from '../actions/message';
import { Conversation, Message } from '../interface';

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
    conversationList: Conversation[],
    setTarget: (target: Conversation) => void,
    onSendTextMsg: (id: string, text: string) => void,
    chatHistory: { [key: string]: Message[] },
    myId: string,
    target?: Conversation,
}

const ChatScreen: React.FC<Porps> = ({ conversationList, setTarget, target, chatHistory, onSendTextMsg, myId }) => {
    const classes = useStyles();
    return <Box display="flex" height="100%">
        <Box className={classes.sider} >
            <ConversationList data={conversationList} onSelect={(c) => { if (!target || target.targetId !== c.targetId) { setTarget(c) } }} />
        </Box>

        <Box className={classes.conversation} >
            {
                target ? <ConversationWindow conversation={target}
                    chatHistory={chatHistory[target.targetId] || []}
                    onSend={(text) => onSendTextMsg(target.targetId, text)}
                    myId={myId}
                /> : <EmptyContent />
            }
        </Box>
    </Box>
}

const mapStateToProps = (state: any) => {
    return {
        conversationList: state.chat.conversationList,
        target: state.chat.target,
        chatHistory: state.chat.chatHistory,
        myId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setTarget: (target: Conversation) => dispatch(conversationActions.setTarget(target)),
    onSendTextMsg: (id: string, text: string) => dispatch(messageActions.sendTextMsg(id, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);