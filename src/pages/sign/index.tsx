import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Container, Paper, Typography, Theme, createStyles, makeStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import SignInPage from './sign-in';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            height: '100%', display: 'flex',
            alignItems: 'center'
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
            <Typography variant="h1" component="h2" style={{ marginBottom: 48 }}>
                X-IM
            </Typography>
            <Route path="/sign/in" component={SignInPage} />
            <Redirect to="/sign/in" />
        </Paper>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable={false}
            pauseOnHover
        />
    </Container>
}