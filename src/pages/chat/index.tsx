import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ConversationList from './list';
import ConversationWindow from './conversation';
import EmptyContent from '../../components/EmptyContent';
import { conversationActions, chatActions, SET_CONVERSATION_TARGET } from '../../actions/chat';

import { Conversation, Message } from '../../interface';

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
    target?: Conversation,
}

const ChatPage: React.FC<Porps> = ({ conversationList, setTarget, target, chatHistory, onSendTextMsg, }) => {
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
                /> : <EmptyContent />
            }
        </Box>
    </Box>
}

const mapStateToProps = (state: any) => {
    return {
        conversationList: state.chat.conversationList,
        target: state.chat.target,
        chatHistory: state.chat.chatHistory
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getConversationList: () => dispatch(conversationActions.getList()),
    setTarget: (target: Conversation) => dispatch({ type: SET_CONVERSATION_TARGET, data: target }),
    onSendTextMsg: (id: string, text: string) => dispatch(chatActions.sendTextMsg(id, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);