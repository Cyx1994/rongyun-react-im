import React from 'react';
import { colors, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, Typography, Divider, Badge } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AccessibleSharpIcon from '@material-ui/icons/AccessibleSharp';

import moment from 'moment';
import { Conversation } from '../interface';

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
        },
        draftLabel: {
            color: colors.pink[900]
        },
        mentionLabel: {
            color: colors.lightBlue[900]
        }
    }),
);

interface Props {
    data: Conversation[],
    onSelect: (target: Conversation) => void,
}

const ConversationList: React.FC<Props> = ({ data, onSelect }) => {
    const classes = useStyles();
    /* 演示会话 */
    const defaultItem: Conversation | [] = data.length ? [] : {
        conversationTitle: 'default conversation',
        conversationType: RongIMLib.ConversationType.PRIVATE,
        draft: '',
        isTop: false,
        latestMessageId: '123',
        notificationStatus: RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB,
        objectName: 'huihua',
        receivedStatus: RongIMLib.ReceivedStatus.UNREAD,
        receivedTime: 1571813163484,
        senderUserId: 'empty_',
        senderUserName: 'empty_',
        sentStatus: RongIMLib.SentStatus.SENT,
        sentTime: 1571811663484,
        targetId: 'empty_',
        unreadMessageCount: 12,
        senderPortraitUri: 'http://baidu.com',
        isHidden: false,
        mentionedMsg: "It's a example!",
        hasUnreadMention: false,
        _readTime: new Date().getTime(),
        setTop: () => { },
        latestMessage: { content: { content: 'lunch time!' } },
    };
    return <List className={classes.layout}>
        {
            data.concat(defaultItem).map((c, index) => (
                <div key={c.targetId}>

                    <ListItem button onClick={() => onSelect(c)}>
                        <ListItemAvatar>
                            <Badge badgeContent={c.unreadMessageCount} color="secondary">
                                <Avatar>
                                    <AccessibleSharpIcon />
                                </Avatar>
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText primary={c.conversationTitle || c.targetId}
                            secondaryTypographyProps={{ className: classes.lastMsg }}
                            secondary={c.draft ? <span><span className={classes.draftLabel} >Draft:</span> {c.draft} </span>
                                : (c.mentionedMsg ? <span> <span className={classes.mentionLabel} >@You</span>  {c.mentionedMsg}</span>
                                    : c.latestMessage.content.content)}
                        />
                        <ListItemSecondaryAction>
                            <Typography >{timeRules(goodTime(c.sentTime, c.receivedTime))}</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {index !== data.length - 1 && <Divider variant="inset" />}
                </div>
            ))
        }
    </List>
}

const timeRules = (time: number = 0) => {
    const now = moment().valueOf();

    const temp = now - time;
    if (temp < 5 * 3600) {
        return '刚刚';
    } else if (temp < moment().startOf('day').valueOf()) {
        return moment(time).format('HH:mm');
    } else if (temp < moment().startOf('week').valueOf()) {
        return moment(time).format('e');
    } else {
        return moment(time).format('MM-DD');
    }
}

const goodTime = (sent?: number, received?: number) => {
    if (sent && received) {
        return Math.max(sent, received);
    } else {
        return sent || received;
    }
}

export default ConversationList;