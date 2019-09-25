import React from 'react';
import { TextField, Input } from '@material-ui/core';
import useForm, { FormMethods } from 'rc-form-hooks';

const SignInPage: React.FC = () => {
    const { getFieldDecorator, validateFields, values }: FormMethods<{
        username: string;
        password: string;
    }> = useForm();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateFields()
            .then(console.log)
            .catch(e => console.error(e.message));
    };
    return (
        <form onSubmit={handleSubmit}>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input username!' }]
            })(<TextField label="username" />)}
            <button type={'submit'}>submit</button>
        </form>
    );
}

export default SignInPage;