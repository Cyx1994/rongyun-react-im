import React from 'react';
import { Box, Card, CardActionArea, CardMedia, Typography, Button, CardActions, CardContent, Link } from '@material-ui/core';

export default () => (
    <Box width="100%" height="100%" display="flex" style={{ justifyContent: 'center', alignItems: 'center' }} >
        <Card style={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        没有内容
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        该项目是用Material UI实现，具体使用方法请
                        前往 <Link href="https://material-ui.com/zh/" rel="noopener" target="_blank" > Material UI </Link>查询
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => console.log('email: ljj1994@vip.qq.com')}>
                    工作交流
        </Button>
                <Button size="small" color="primary" onClick={() => console.log('tel: 18161226502')}>
                    联系方式
        </Button>
            </CardActions>
        </Card>
    </Box>
)