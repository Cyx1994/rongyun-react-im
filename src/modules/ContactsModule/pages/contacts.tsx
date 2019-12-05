import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, colors } from '@material-ui/core';
import TreeIndexComponent from '../components/tree-index';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import data from '../contactsData';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sider: {
            width: '100%',
            maxWidth: 280,
            backgroundColor: theme.palette.background.default,
        },
        conversation: {
            flexGrow: 1,
            backgroundColor: colors.blueGrey[100],
        }
    }),
);

interface Porps extends RouteComponentProps {

}

const ContactScreen: React.FC<Porps> = () => {
    const classes = useStyles();
    return <Box display="flex" height="100%">
        <Box className={classes.sider} >
            <TreeIndexComponent data={data} onSelect={(item) => console.log(item)} />
        </Box>
        <Box className={classes.conversation} />
    </Box>
}

export default ContactScreen;