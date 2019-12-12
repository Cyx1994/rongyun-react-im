import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MessageSharpIcon from '@material-ui/icons/MessageSharp'
import { Contacts } from '../interface';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

type Props = {
    contacts: Contacts,
    onSendMsg: (targetId: string) => void
}

export default function ContactsReviewCard({ contacts, onSendMsg }: Props) {
    const classes = useStyles();

    return (<Box width="100%" height="100%" display="flex" style={{ justifyContent: 'center', alignItems: 'center' }} >
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {contacts.name[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={contacts.name}
            />
            <CardMedia
                className={classes.media}
                image="https://material-ui.com/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    A anytalk robot.
        </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="创建会话" aria-label="create conversation">
                    <IconButton aria-label="add to favorites" onClick={() => onSendMsg(contacts.targetId || 'empty_')} >
                        <MessageSharpIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    </Box>
    );
}