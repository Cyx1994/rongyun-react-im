import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ConversationList from './list';
import ConversationWindow from './conversation';
import EmptyContent from '../../components/EmptyContent';
import { conversationActions } from '../../actions/chat';

import { Conversation } from '../../interface';

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
    conversationList: Conversation[]
}

const ChatPage: React.FC<Porps> = ({ conversationList }) => {
    const classes = useStyles();
    const target = undefined;
    return <Box display="flex" height="100%">
        <Box className={classes.sider} >
            <ConversationList data={conversationList} />
        </Box>

        <Box className={classes.conversation} >
            {
                target ? <ConversationWindow conversation={target} /> : <EmptyContent />
            }
        </Box>
    </Box>
}

const mapStateToProps = (state: any) => ({
    conversationList: state.chat.conversationList,
})

const mapDispatchToProps = (dispatch: any) => ({
    getConversationList: () => dispatch(conversationActions.getList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);