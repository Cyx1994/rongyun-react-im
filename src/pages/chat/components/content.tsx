import React from 'react';
import { Box, useScrollTrigger, Zoom, Fab, RootRef } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ConversationMessage from './message';
interface Props {
    history: RongIMLib.Message[];
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            zIndex: 99
        },
    }),
);

const scrollToEnd = () => {
    const anchor = document.querySelector(
        '#back-to-top-anchor',
    );

    if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}


function ScrollEndFab(props: any) {
    const { children, window } = props;
    const classes = useStyles();
    const target = window ? window : undefined;
    const trigger = useScrollTrigger({
        target,
        disableHysteresis: true,
        threshold: 100,
    });

    return (
        <Zoom in={trigger}>
            <div onClick={scrollToEnd} role="presentation" className={classes.fab}>
                {children}
            </div>
        </Zoom>
    );
}



export default (props: Props) => {
    const [scrollArea, setScrollArea] = React.useState();
    React.useEffect(() => {
        scrollToEnd();
    })
    const getNode = React.useCallback(node => {
        if (node !== null) {
            setScrollArea(node);
        }
    }, []);
    return (
        <RootRef rootRef={getNode}>
            <Box p={2} height="100%" className="scroll-area">

                {
                    props.history.map(msg => <ConversationMessage key={msg.messageUId} message={msg} />)
                }
                <ScrollEndFab window={scrollArea}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowDownIcon />
                    </Fab>
                </ScrollEndFab>
                <div id="back-to-top-anchor" />
            </Box>
        </RootRef>
    )
}