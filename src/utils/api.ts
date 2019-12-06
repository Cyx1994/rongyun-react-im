const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://api-cn.ronghub.com';

export default {
    baseUrl,
    auth: {
        getToken: '/user/getToken.json'
    }
}