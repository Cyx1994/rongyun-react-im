import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Box, TextField, Button } from '@material-ui/core';
import useForm, { FormMethods } from 'rc-form-hooks';
import { toast } from 'react-toastify';

import http from '../../utils/http';
import Api from '../../utils/api';

type AccountInfo = {
    username: string,
    password: string,
}

const SignInPage: React.FC<RouteComponentProps> = ({ history }) => {

    const { getFieldDecorator, validateFields }: FormMethods<AccountInfo> = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateFields()
            .then(v => {
                console.log(v);
                http.post(Api.auth.getToken, {
                    userId: v.username
                }).then(res=>{
                    console.log(res);
                });
                history.push('/home');
            })
            .catch(e => toast.error(e.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box width={'100%'} height={300} >
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input username!' }],
                    initialValue: '',
                })(<TextField autoFocus label="username" variant="filled" fullWidth />)}
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input password!' }],
                    initialValue: '',
                })(<TextField label="password" variant="filled" fullWidth />)}

                <Button type={'submit'}>submit</Button>
            </Box>
        </form>

    );
}

const mapDispatchToProps = (dispath: any) => ({

})

export default connect(null, mapDispatchToProps)(SignInPage);