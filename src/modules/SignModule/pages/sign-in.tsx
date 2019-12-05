import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Box, TextField, Button } from '@material-ui/core';
import useForm, { FormMethods } from 'rc-form-hooks';
import { toast } from 'react-toastify';

import authActions, { AuthRequestParams } from '../action';

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
        <Box width={'100%'} height={'100%'} >
            <form onSubmit={handleSubmit}>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input username!' }]
                })(<TextField autoFocus label="username" placeholder="any string" fullWidth />)}
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input password!' }]
                })(<TextField label="password" fullWidth placeholder="same to username" />)}
                <Box display="flex" justifyContent="flex-end" marginTop="12px" >
                    <Button type={'submit'} color="primary" variant="contained" >login</Button>
                </Box>
            </form>
        </Box >
    );
}

const mapDispatchToProps = (dispath: any) => ({
    signIn: (auth: any, cb: () => void) => dispath(authActions.signIn(auth, cb))
})

export default connect(null, mapDispatchToProps)(SignInPage);