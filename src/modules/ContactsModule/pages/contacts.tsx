import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Box, colors } from '@material-ui/core';
import TreeIndexComponent from '../components/tree-index';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import EmptyContent from '../components/empty-contacts';
import ContactsReviewCard from '../components/contacts-review-card';
import { conversationActions } from '../../ChatModule';

import { Contacts } from '../interface';
import tempData from '../contactsData';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sider: {
            width: '100%',
            maxWidth: 280,
            padding: 5,
            backgroundColor: theme.palette.background.default
        },
        conversation: {
            flexGrow: 1,
            backgroundColor: colors.lime[200],
        }
    }),
);

interface Props extends RouteComponentProps {
    contactsTree: Contacts[];
    setTarget: (node: Contacts) => void;
    onSendMsg: (targetId: string) => void;
}

const ContactScreen: React.FC<Props> = ({ contactsTree, history, onSendMsg }) => {
    const classes = useStyles();
    const [target, setTarget] = useState<Contacts>();

    return <Box display="flex" height="100%">
        <Box className={classes.sider} >
            <TreeIndexComponent data={contactsTree} onSelect={(item) => setTarget(item)} />
        </Box>
        <Box className={classes.conversation} >
            {
                target ? <ContactsReviewCard contacts={target} onSendMsg={(targetId) => { onSendMsg(targetId); history.replace('/home/chat') }} /> : <EmptyContent onSend={() => { onSendMsg('empty_') }} />
            }
        </Box>
    </Box>
}

const mapStateToProps = (state: any) => ({
    contactsTree: tempData
})

const mapDispathToProps = (dispatch: any) => ({
    onSendMsg: (targetId: string) => dispatch(conversationActions.create(targetId))
})

export default connect(mapStateToProps, mapDispathToProps)(ContactScreen);