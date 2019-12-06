import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Box, ListItem, ListItemAvatar, Avatar, Typography, colors } from '@material-ui/core';
import { MockAvatarByName, mockColorByName } from '../../../utils/mock';

import { Message } from '../interface';
type Props = {
    message: Message,
    mine?: boolean
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layoutRight: {
            flexDirection: 'row-reverse', textAlign: 'right'
        },
        avatarRight: {
            marginRight: 0, marginLeft: 16
        },
        frameContentLeft: {
            position: 'relative',
            maxWidth: 400,
            minHeight: 40,
            background: colors.grey[200],
            borderRadius: '1px',
            padding: '0 10px',
            wordWrap: 'break-word'
        },
        frameContentRight: {
            position: 'relative',
            maxWidth: 400,
            minHeight: 40,
            background: colors.cyan[200],
            borderRadius: '1px',
            padding: '0 10px',
            wordWrap: 'break-word'
        },
        frameFont: {
            lineHeight: '40px',
        },
        cornerLeft: {
            position: 'absolute',
            top: 10,
            left: -16,
            width: 0,
            height: 0,
            fontSize: 0,
            border: 'solid 8px',
            borderColor: `transparent ${colors.grey[200]} transparent transparent`
        },
        cornerRight: {
            position: 'absolute',
            top: 10,
            right: -16,
            width: 0,
            height: 0,
            fontSize: 0,
            border: 'solid 8px',
            borderColor: `transparent  transparent transparent ${colors.cyan[200]}`
        }
    }),
);


export default ({ message, mine }: Props) => {
    const classes = useStyles();

    return <Box p={1} id={'msg' + message.messageUId}>
        <ListItem className={mine ? classes.layoutRight : ''} style={{ alignItems: 'flex-start' }} >
            <ListItemAvatar className={mine ? classes.avatarRight : ''}>
                <Avatar style={{ backgroundColor: mockColorByName(message.senderUserId) }}  >
                    <MockAvatarByName name={message.senderUserId} />
                </Avatar>
            </ListItemAvatar>
            <MessageFrame direction={mine ? 'right' : 'left'}>
                <Typography align="left" className={classes.frameFont} >{message.content.content}</Typography>
            </MessageFrame>
        </ListItem>
    </Box>
}


const MessageFrame: React.SFC<any> = ({ direction = 'left', children }) => {
    const classes = useStyles();

    return <div className={direction === 'right' ? classes.frameContentRight : classes.frameContentLeft}>
        <div className={direction === 'right' ? classes.cornerRight : classes.cornerLeft} />
        {children}
    </div>
}