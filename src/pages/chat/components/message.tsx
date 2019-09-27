import React from 'react';
import { Box, Typography } from '@material-ui/core';

import moment from 'moment';

import { Message } from '../../../interface';
type Props = {
    message: Message
}

export default ({ message }: Props) => {
    return <Box p={1}>
        <div>{moment(message.sentTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        <Typography color="primary">{message.content.content}</Typography>
    </Box>
}