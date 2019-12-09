import React from 'react';
import { colors, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, Typography, Badge } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { MockAvatarByName, mockColorByName } from '../../../utils/mock';

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
    
    return <List className={classes.layout}>
        {
            data.map((c, index) => (
                <div key={c.targetId}>

                    <ListItem button onClick={() => onSelect(c)}>
                        <ListItemAvatar>
                            <Badge badgeContent={c.unreadMessageCount} color="secondary">
                                <Avatar style={{ backgroundColor: mockColorByName(c.conversationTitle || c.targetId) }}  >
                                    <MockAvatarByName name={c.conversationTitle || c.targetId} />
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
    } else if (time > moment().startOf('day').valueOf()) {
        return moment(time).format('HH:mm');
    } else if (time > moment().startOf('week').valueOf()) {
        const weekTab = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        return weekTab[parseInt(moment(time).format('e'))];
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