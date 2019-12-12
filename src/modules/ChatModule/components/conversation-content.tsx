import React, { useState } from 'react';
import { Box, Zoom, Fab, RootRef, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ConversationMessage from './message';
import useScrollTrigger from '../../../utils/useScrollTrigger';

interface Props {
    history?: RongIMLib.Message[];
    myId: string;
    targetId: string;
    onLoad: () => void;
    hasMore: boolean;
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

const scrollToEnd = (smooth: boolean = false, anchor?: Element | null) => {
    if (!anchor) {
        anchor = document.querySelector(
            '#back-to-top-anchor',
        );
    }
    if (anchor) {
        const option: any = {
            block: 'nearest'
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

const ConversationContent: React.FC<Props> = ({ history, myId, targetId, onLoad, hasMore }) => {
    const [scrollArea, setScrollArea] = useState();
    const [anchor, setAnchor] = useState<Element | null>();


    React.useEffect(() => {
        // 防止锚点变化引起重复获取
        if (!history && !anchor) {
            onLoad();
        } else if (history) {
            scrollToEnd(true, anchor);
        }
    }, [history, onLoad, anchor]);


    // 跟换会话，窗口初始化
    React.useEffect(() => {
        setAnchor(undefined);
    }, [targetId]);

    const getNode = React.useCallback(node => {
        if (node !== null) {
            setScrollArea(node);
        }
    }, []);



    const getHistory = () => {
        // 设置锚点
        if (history && history[0]) {
            const t = document.querySelector(
                '#msg' + history[0].messageUId,
            );
            setAnchor(t);
        }
        onLoad();
    }
    return (
        <RootRef rootRef={getNode}>
            <Box p={1} height="100%" style={{ overflow: 'auto' }} >
                {
                    hasMore && <Box display="flex" justifyContent="center">
                        <Button onClick={() => getHistory()}>load more</Button>
                    </Box>
                }

                {
                    history && history.map(msg => <ConversationMessage key={msg.messageUId} message={msg} mine={msg.senderUserId === myId} />)
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