import React from 'react';
import { Container, Paper, Theme, createStyles, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
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
    return <Container maxWidth="sm" color="red">
        <Paper className={classes.root}>
            <Switch>
                <Route path="/sign/in" component={SignInPage} />
            </Switch>
        </Paper>

    </Container>
}