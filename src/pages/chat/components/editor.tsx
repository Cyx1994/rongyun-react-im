import React from 'react';
import { Box, Input, InputAdornment, IconButton, colors } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { MessagePrototype } from '../../../interface';

interface Props {
    editing?: MessagePrototype;
    onSend: (message: MessagePrototype) => void
}

export default (props: Props) => {
    const [message, setMessage] = React.useState('');
    return <Box height={220} p={2} style={{ backgroundColor: colors.lightGreen[200] }}>
        <Input multiline fullWidth
            autoFocus
            rows={6}
            rowsMax={6}
            placeholder="context"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => props.onSend({ message })}
                    >
                        <SendIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    </Box>
}