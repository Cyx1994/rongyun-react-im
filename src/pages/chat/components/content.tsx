import React from 'react';
import { Box, useScrollTrigger, Zoom, Fab, RootRef } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { RongMessage } from '../../../interface';

interface Props {
    history: RongMessage[];
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


function ScrollTop(props: any) {
    const { children, window } = props;
    const classes = useStyles();
    const target = window ? window : undefined;
    const trigger = useScrollTrigger({
        target,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = document.querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.fab}>
                {children}
            </div>
        </Zoom>
    );
}



export default (props: Props) => {
    const [scrollArea, setScrollArea] = React.useState();
    const getNode = React.useCallback(node => {
        if (node !== null) {
            setScrollArea(node);
        }
    }, []);

    return (
        <RootRef rootRef={getNode}>
            <Box p={2} height="100%" className="scroll-area">
                <div id="back-to-top-anchor" />
                {[...new Array(20)]
                    .map(
                        () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                    )
                    .join('\n')}
                <ScrollTop window={scrollArea}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowDownIcon />
                    </Fab>
                </ScrollTop>

            </Box>
        </RootRef>
    )
}