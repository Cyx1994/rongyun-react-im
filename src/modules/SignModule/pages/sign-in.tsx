import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Box, TextField, Button } from '@material-ui/core';
import useForm, { FormMethods } from 'rc-form-hooks';
import { toast } from 'react-toastify';

import { authActions, AuthRequestParams } from '../action';

interface Props extends RouteComponentProps {
    signIn: (authParams: AuthRequestParams, cb: () => void) => void
}

const SignInPage: React.FC<Props> = ({ history, signIn }) => {

    const { getFieldDecorator, validateFields }: FormMethods<AuthRequestParams> = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateFields()
            .then(v => {
                signIn(v, () => history.replace('/home'));
            })
            .catch(e => {
                toast.error(e.message)
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box width={'100%'} height={200}>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input username!' }],
                    initialValue: '',
                })(<TextField autoFocus label="username" placeholder="any string" variant="filled" fullWidth />)}
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input password!' }],
                    initialValue: '',
                })(<TextField label="password" variant="filled" fullWidth />)}
                <Box display="flex" style={{ justifyContent: 'flex-end' }} >
                    <Button type={'submit'}>submit</Button>
                </Box>
            </Box>
        </form>

    );
}

const mapDispatchToProps = (dispath: any) => ({
    signIn: (auth: any, cb: () => void) => dispath(authActions.signIn(auth, cb))
})

export default connect(null, mapDispatchToProps)(SignInPage);