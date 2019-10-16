import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Box, TextField, Button } from '@material-ui/core';
import useForm, { FormMethods } from 'rc-form-hooks';
import { toast } from 'react-toastify';

import { SET_AUTH } from '../../actions/auth';

import http from '../../utils/http';
import Api from '../../utils/api';

type AccountInfo = {
    username: string,
    password: string,
}

interface Props extends RouteComponentProps {
    signIn: (auth: {
        token: string,
        userId: string,
        name?: string,
        portraitUri?: string,
    }) => void
}

const SignInPage: React.FC<Props> = ({ history, signIn }) => {

    const { getFieldDecorator, validateFields }: FormMethods<AccountInfo> = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateFields()
            .then(v => {
                console.log(v);
                http.post(Api.auth.getToken, {
                    userId: v.username
                }).then((res: any) => {
                    delete res.code;
                    signIn(res);
                    history.push('/home');
                });
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
    signIn: (auth: any) => dispath({ type: SET_AUTH, data: auth })
})

export default connect(null, mapDispatchToProps)(SignInPage);