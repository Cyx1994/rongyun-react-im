import React from 'react';
import { colors, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, Typography, Divider } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AccessibleSharpIcon from '@material-ui/icons/AccessibleSharp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100%',
            height: '100%',
            padding: 0,
            backgroundColor: colors.blue[100],

        },
    }),
);


const ConversationList: React.FC = () => {
    const classes = useStyles();
    return <List className={classes.layout}>
        <ListItem button>
            <ListItemAvatar>
                <Avatar>
                    <AccessibleSharpIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Charles" secondary="dinner time!" />
            <ListItemSecondaryAction>
                <Typography >Jan 9, 2014</Typography>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" />
        <ListItem button>
            <ListItemAvatar>
                <Avatar>
                    <AccessibleSharpIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Joky" secondary="...." />
            <ListItemSecondaryAction>
                <Typography >Jan 7, 2014</Typography>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" />
        <ListItem button>
            <ListItemAvatar>
                <Avatar>
                    <AccessibleSharpIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Muel" secondary="back to work" />
            <ListItemSecondaryAction>
                <Typography >July 20, 2014</Typography>
            </ListItemSecondaryAction>
        </ListItem>
    </List>
}

export default ConversationList;