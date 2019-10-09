import React from 'react';
import { Box, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import moment from 'moment';

import { Message } from '../../../interface';
type Props = {
    message: Message
}

export default ({ message }: Props) => {
    return <Box p={1}>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <FaceIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={moment(message.sentTime).format('YYYY-MM-DD HH:mm:ss')}
                secondary={message.content.content}
            />
        </ListItem>
    </Box>
}