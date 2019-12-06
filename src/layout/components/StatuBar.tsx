import React from 'react';
import { Typography, colors } from '@material-ui/core'
type Props = {
    status: RongIMLib.ConnectionStatus
}

const barObject = {
    0: [colors.green[500], '连接成功'],
    1: [colors.blue[500], '连接中'],
    2: [colors.red[500], '链接已断开'],
    3: [colors.red[500], '网络错误'],
    4: [colors.orange[500], '已退出登录'],
    6: [colors.orange[500], '其他设备登录'],
    7: [colors.red[500], 'WebSocket 不可用'],
    12: [colors.red[500], '域名错误(需通过开发者后台检查安全域名设置)'],
    201: [colors.blue[500], '正在请求导航'],
    202: [colors.green[500], '请求导航成功'],
    203: [colors.red[500], '请求导航失败'],
    204: [colors.orange[500], '请求导航超时']
}

export default ({ status }: Props) => {
    if (!status) {
        return null;
    }
    const statusObject = barObject[status];
    return <div style={{ width: '100%', height: 28, lineHeight: "28px", backgroundColor: statusObject[0], textAlign: 'center' }}>
        <Typography >{statusObject[1]}</Typography>
    </div>
}