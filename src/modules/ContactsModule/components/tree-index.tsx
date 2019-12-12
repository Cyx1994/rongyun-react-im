import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import { Contacts } from '../interface';
declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type Props = {
    data: Contacts[],
    onSelect: (item: Contacts) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 280,
            height: '100%',
            border: `1px solid ${theme.palette.divider}`,
            borderStyle: "none solid none none",
        },
        item: {
            padding: '5px 0px'
        }
    })
);

export default ({ data = [], onSelect }: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
        setExpanded(nodes);
    };

    const renderTree = (tree: any[]) => tree.map(node => {
        if (node.children) {
            return <TreeItem className={classes.item} key={node.id} nodeId={node.id} label={<Typography>{node.name}</Typography>} >
                {renderTree(node.children)}
            </TreeItem>
        }
        return <TreeItem className={classes.item} key={node.id} nodeId={node.id} label={<Typography>{node.name}</Typography>}
            onClick={() => onSelect(node)}
        />

    })

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            onNodeToggle={handleChange}
        >
            {renderTree(data)}
        </TreeView>
    );
}