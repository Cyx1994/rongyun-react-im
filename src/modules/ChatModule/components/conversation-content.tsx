import React from 'react';
import { Box, Zoom, Fab, RootRef } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ConversationMessage from './message';
import useScrollTrigger from '../../../utils/useScrollTrigger';

interface Props {
    history?: RongIMLib.Message[];
    myId: string;
    onLoad: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            top: theme.spacing(20),
            right: theme.spacing(2),
            zIndex: 99
        },
    }),
);

const scrollToEnd = (smooth: boolean = false) => {
    const anchor = document.querySelector(
        '#back-to-top-anchor',
    );

    if (anchor) {
        const option: any = {
            block: 'center'
        };
        if (smooth) {
            option.behavior = 'smooth';
        }
        anchor.scrollIntoView(option);
    }
}


function ScrollEndFab(props: any) {
    const { children, window } = props;
    const classes = useStyles();
    const target = window ? window : undefined;
    const trigger = useScrollTrigger({
        target,
        threshold: 100
    });
    return (
        <Zoom in={trigger}>
            <div onClick={() => scrollToEnd(true)} role="presentation" className={classes.fab}>
                {children}
            </div>
        </Zoom>
    );
}


const ConversationContent: React.FC<Props> = ({ history, myId, onLoad }) => {
    const [scrollArea, setScrollArea] = React.useState();
    React.useEffect(() => {
        if (!history) {
            onLoad();
        } else {
            scrollToEnd();
        }
    }, [history, onLoad])
    const getNode = React.useCallback(node => {
        if (node !== null) {
            setScrollArea(node);
        }
    }, []);

    return (
        <RootRef rootRef={getNode}>
            <Box p={1} height="100%" style={{ overflow: 'auto' }} >
                <Box>
                    load more
                </Box>
                {
                    history && history.map(msg => <ConversationMessage key={msg.messageUId} message={msg} mine={msg.targetId === myId} />)
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

export default ConversationContent;