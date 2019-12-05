import React from 'react';
import { colors } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AccessibleSharpIcon from '@material-ui/icons/AccessibleSharp';
import BathtubIcon from '@material-ui/icons/Bathtub';
import HomeIcon from '@material-ui/icons/AccessibleSharp';


export const MockAvatarByName = ({ name = 'a' }: any) => {
    const key = name.charCodeAt(0) % 5;
    let Avatar = FaceIcon;
    switch (key) {
        case 1: Avatar = AccessibleSharpIcon; break;
        case 2: Avatar = AccessAlarmIcon; break;
        case 3: Avatar = HomeIcon; break;
        case 4: Avatar = BathtubIcon; break;
        default: break;
    }
    return <Avatar />;
}

export const mockColorByName = (name: string = 'a') => {
    const key = name.charCodeAt(0) % 5;
    let color = colors.grey[300];
    switch (key) {
        case 1: color = colors.blue[300]; break;
        case 2: color = colors.orange[300]; break;
        case 3: color = colors.pink[300]; break;
        case 4: color = colors.cyan[300]; break;
        default: break;
    }
    return color;
}
