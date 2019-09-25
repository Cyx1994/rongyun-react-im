import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, TextField, Button } from '@material-ui/core';
import useForm, { FormMethods } from 'rc-form-hooks';
import { toast } from 'react-toastify';

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

export default SignInPage;