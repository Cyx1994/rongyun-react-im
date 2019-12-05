import React from 'react';
import { Typography, colors } from '@material-ui/core'
type Props = {
    status: RongIMLib.ConnectionStatus
}
const barColor: string[] = ['', colors.green[500], colors.red[500], colors.red[500], colors.orange[500], colors.orange[500], colors.red[500]];
const barTips: string[] = ['连接成功', '正在连接', '断开连接', '网络不可用', '已退出登录'];

export default ({ status }: Props) => {
    return <div style={{ width: '100%', height: 28, lineHeight: "28px", backgroundColor: barColor[status], textAlign: 'center' }}>
        <Typography >{barTips[status]}</Typography>
    </div>
}