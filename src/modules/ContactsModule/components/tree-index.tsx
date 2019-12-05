import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

type Props = {
    data: any,
    onSelect: (item: any) => void
}

const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default ({ data = [], onSelect }: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
        setExpanded(nodes);
    };

    const renderTree = (tree: any[]) => tree.map(node => {
        if (node.children) {
            return <TreeItem key={node.id} nodeId={node.id} label={node.name}>
                {renderTree(node.children)}
            </TreeItem>
        }
        return <TreeItem key={node.id} nodeId={node.id} label={node.name} onClick={() => onSelect(node)} />

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