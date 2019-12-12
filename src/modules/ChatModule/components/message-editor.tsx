import React from 'react';
import { Box, Input, InputAdornment, IconButton } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';

interface Props {
    draft?: string;
    size?: 'large' | 'small';
    onSend: (message: string) => void
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            border: `1px solid ${theme.palette.divider}`,
            borderStyle: "solid none none none",
            backgroundColor: theme.palette.background.default,
        },
        layoutXs: {
            backgroundColor: theme.palette.background.default,
        },
    }),
);

export default ({ draft, size = "large", onSend }: Props) => {
    const classes = useStyles();
    const [message, setMessage] = React.useState('');
    return <Box height={size === 'large' ? 220 : 150} p={2} className={size === 'large' ? classes.layout : classes.layoutXs}>
        <Input multiline fullWidth
            autoFocus
            rows={size === 'large' ? 6 : 2}
            rowsMax={size === 'large' ? 6 : 2}
            placeholder="Input something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                            if (message) {
                                onSend(message);
                                setMessage('');
                            }
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    </Box>
}