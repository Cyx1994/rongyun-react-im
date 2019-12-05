import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Container, Paper, Typography, Theme, createStyles, makeStyles } from '@material-ui/core';

import SignInPage from './pages/sign-in';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        root: {
            padding: theme.spacing(3, 2),
        },
    }),
);

export default () => {
    const classes = useStyles();
    return <Container maxWidth="sm" color="red" className={classes.layout}>
        <Paper className={classes.root}>
            <Typography variant="h2" component="h2" style={{ marginBottom: 48, marginLeft: 12 }}>
                X-IM
            </Typography>
            <Route path="/sign/in" component={SignInPage} />
            <Redirect to="/sign/in" />
        </Paper>
    </Container>
}