import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EmojiPeopleSharpIcon from '@material-ui/icons/EmojiPeopleSharp';

import { Contacts } from '../interface';
declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

type Props = {
    data: Contacts[],
    onSelect: (item: Contacts) => void
}

const useStyles = makeStyles({
    root: {
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
            return <StyledTreeItem key={node.id} nodeId={node.id} labelText={node.name} labelIcon={SupervisorAccountIcon}>
                {renderTree(node.children)}
            </StyledTreeItem>
        }
        return <StyledTreeItem key={node.id} nodeId={node.id} labelText={node.name} labelIcon={EmojiPeopleSharpIcon}
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

const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.text.secondary,
            '&:focus > $content': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
                color: 'var(--tree-view-color)',
            },
        },
        content: {
            color: theme.palette.text.secondary,
            // borderTopRightRadius: theme.spacing(2),
            // borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightRegular,
            },
        },
        group: {
            marginLeft: 0,
            '& $content': {
                paddingLeft: theme.spacing(2),
            },
        },
        expanded: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
        labelRoot: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0),
        },
        labelIcon: {
            marginRight: theme.spacing(1),
        },
        labelText: {
            fontWeight: 'inherit',
            flexGrow: 1,
        },
    }),
);


function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}