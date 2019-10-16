import React from 'react';
import { Box, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import moment from 'moment';

import { Message } from '../../../interface';
type Props = {
    message: Message,
    mine?: boolean
}

export default ({ message, mine }: Props) => {
    return <Box p={1}>
        <ListItem
            style={mine ? { flexDirection: 'row-reverse', textAlign: 'right' } : {}}
        >
            <ListItemAvatar style={mine ? { marginRight: 0, marginLeft: 16 } : {}}>
                <Avatar>
                    <FaceIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={message.targetId + '  ' + moment(message.sentTime).format('YYYY-MM-DD HH:mm:ss')}
                primary={message.content.content}
            />
        </ListItem>
    </Box>
}