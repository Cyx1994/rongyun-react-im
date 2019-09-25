import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Container, Paper, Theme, createStyles, makeStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import SignInPage from './sign-in';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
        },
    }),
);

export default () => {
    const classes = useStyles();
    return <Container maxWidth="sm" color="red" style={{ height: '100%' }}>
        <Paper className={classes.root}>
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