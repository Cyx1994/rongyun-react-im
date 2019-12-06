// 融云服务部署时虚自行代理。只代理user,其他server功能不与实现。
const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : '/user';
export default {
    baseUrl,
    auth: {
        getToken: '/getToken.json'
    }
}