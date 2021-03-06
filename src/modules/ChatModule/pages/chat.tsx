import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Hidden, SwipeableDrawer } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { robotsId } from '../../ContactsModule';

import ConversationList from '../components/conversation-list';
import ConversationWindow from '../components/conversation';
import EmptyContent from '../components/empty-conversation';
import conversationActions from '../actions/conversation';
import messageActions from '../actions/message';
import { Conversation, Message } from '../interface';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sider: {
            width: '20%',
            minWidth: 280,
            maxWidth: 300,
            marginLeft: 0,
            backgroundColor: theme.palette.background.default,
        },
        conversation: {
            flexGrow: 1,
        }
    }),
);

interface Porps extends RouteComponentProps {
    conversationList: Conversation[];
    setTarget: (target: Conversation) => void;
    onSendTextMsg: (id: string, text: string) => void;
    onLoadHistory: (id: string) => void;
    chatHistory: { [key: string]: Message[] };
    myId: string;
    target?: Conversation;
    hasMore: boolean;
}

const ChatScreen: React.FC<Porps> = ({ conversationList, setTarget, target, chatHistory, onSendTextMsg, onLoadHistory, myId, hasMore }) => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

    return <Box display="flex" height="100%">
        <Hidden xsDown>
            <Box className={classes.sider} >
                <ConversationList data={conversationList} onSelect={(c) => { if (!target || target.targetId !== c.targetId) { setTarget(c) } }} />
            </Box>
        </Hidden>
        <Hidden xsUp>
            <SwipeableDrawer anchor="left" open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)} className={classes.sider} >
                <ConversationList data={conversationList} onSelect={(c) => { if (!target || target.targetId !== c.targetId) { setTarget(c) } }} />
            </SwipeableDrawer>
        </Hidden>

        <Box className={classes.conversation} >
            {
                target ? <ConversationWindow conversation={target}
                    chatHistory={chatHistory[target.targetId]}
                    onLoadHistory={() => onLoadHistory(target.targetId)}
                    onSend={(text) => onSendTextMsg(target.targetId, text)}
                    myId={myId}
                    hasMore={hasMore}
                /> : <EmptyContent onSend={() => { onSendTextMsg('empty_', 'hello'); setDrawerOpen(true); }} />
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
        hasMore: state.chat.hasMore,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setTarget: (target: Conversation) => dispatch(conversationActions.setTarget(target)),
    onSendTextMsg: (id: string, text: string) => {
        if (robotsId.some(robotId => robotId === id)) {
            dispatch(messageActions.talkToRobot(id, text));
        } else {
            dispatch(messageActions.sendTextMsg(id, text));
        }
    },
    onLoadHistory: (id: string) => dispatch(messageActions.getHistory(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);