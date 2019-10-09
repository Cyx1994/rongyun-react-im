import React from 'react';
import { Box, Input, InputAdornment, IconButton, colors } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

interface Props {
    draft?: string;
    onSend: (message: string) => void
}

export default (props: Props) => {
    const [message, setMessage] = React.useState('');
    const onSend = () => {
        props.onSend(message);
        setMessage('');
    }
    return <Box height={220} p={2} style={{ backgroundColor: colors.lightGreen[200] }}>
        <Input multiline fullWidth
            autoFocus
            rows={6}
            rowsMax={6}
            placeholder="Input something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => onSend()}
                    >
                        <SendIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    </Box>
}