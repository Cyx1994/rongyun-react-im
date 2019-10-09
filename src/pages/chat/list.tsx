import React from 'react';
import { colors, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, Typography, Divider } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AccessibleSharpIcon from '@material-ui/icons/AccessibleSharp';

import moment from 'moment';
import { Conversation } from '../../interface';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100%',
            height: '100%',
            padding: 0,
            backgroundColor: colors.blue[100],
        },
        lastMsg: {
            width: '80%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
    }),
);

interface Props {
    data: Conversation[],
    onSelect: (target: Conversation) => void,
}

const ConversationList: React.FC<Props> = ({ data, onSelect }) => {
    const classes = useStyles();
    const defaultItem: Conversation | [] = data.length ? [] : {
        conversationTitle: 'default conversation',
        conversationType: RongIMLib.ConversationType.PRIVATE,
        draft: '',
        isTop: false,
        latestMessageId: '123',
        notificationStatus: RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB,
        objectName: 'huihua',
        receivedStatus: RongIMLib.ReceivedStatus.UNREAD,
        receivedTime: new Date().getTime(),
        senderUserId: 'empty_',
        senderUserName: 'empty_',
        sentStatus: RongIMLib.SentStatus.SENT,
        sentTime: new Date().getTime(),
        targetId: 'empty_',
        unreadMessageCount: 12,
        senderPortraitUri: 'http://baidu.com',
        isHidden: false,
        mentionedMsg: 'dinner time!',
        hasUnreadMention: false,
        _readTime: new Date().getTime(),
        setTop: () => { },
        latestMessage: 'lunch time!',
    };
    return <List className={classes.layout}>
        {
            data.concat(defaultItem).map((c, index) => (
                <div key={c.targetId}>
                    <ListItem button onClick={() => onSelect(c)}>
                        <ListItemAvatar>
                            <Avatar>
                                <AccessibleSharpIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={c.targetId || c.conversationTitle}
                            secondaryTypographyProps={{ className: classes.lastMsg }}
                            secondary={c.draft ? 'draft:' + c.draft : (c.mentionedMsg ? '@You ' + c.mentionedMsg : c.latestMessage.content.content)}
                        />
                        <ListItemSecondaryAction>
                            <Typography >{moment(c.receivedTime || c.sentTime).format('MM-DD')}</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {index !== data.length && <Divider variant="inset" />}
                </div>
            ))
        }
    </List>
}

export default ConversationList;