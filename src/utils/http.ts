/*
 * @Description: 网络请求中间件
 * @Author: empty
 * @Date: 2019-09-03 14:04:40
 * @LastEditTime: 2019-09-06 17:02:51
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios';
import sha1 from 'sha1';
import Api from './api';
import Config from '../config';
import { toast } from 'react-toastify';
import qs from 'qs';


let instance = axios.create({
    timeout: 10000,
    baseURL: Api.baseUrl,
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        'App-Key': Config.appKey,
        'Nonce': Config.HashSeed,
    }
})


/**
 * @description: 请求前拦截处理 
 */
instance.interceptors.request.use(
    async config => {
        _isShowLoading(true);
        const now = new Date().getTime();
        config.headers['Timestamp'] = now.toString();
        config.headers['Signature'] = sha1(Config.secret + Config.HashSeed + now);
        return config;
    },
    error => {
        console.warn('request ===>', error);
        return Promise.reject(error);
    }
)

/**
 * @description: 请求后拦截处理
 */

instance.interceptors.response.use(
    response => {
        _isShowLoading(false);
        if (!Object.is(response.status, 200)) {
            // 网络状态
            _handleError(response.data);
            return Promise.reject(response.data);
        } else if (!Object.is(response.data.code, 200)) {
            // 返回结果错误
            _handleError(response.data);
            return Promise.reject(response.data);
        }
        else {
            return response.data;
        }
    },
    error => {
        _isShowLoading(false);
        _handleError(error);
        return Promise.reject({ msg: '网络错误，请重试' });
    }
)


export default class http {
    static async get(url: string, params?: object) {
        return await instance.get(url, params);
    }
    static async post(url: string, params?: object) {
        console.log(url, params);
        return await instance.post(url, qs.stringify(params));
    }
    // TODO: other请求方式
}


/**
 * @description: 网络请求动画
 */
function _isShowLoading(loading: boolean): void {
    // TODO: 实现全局网络加载动画
}

/**
 * @description: 根据statusCode处理错误
 */
function _handleError(error: any): void {
    console.warn('response====> ', error);
    toast.error(error.msg || error.message || '网络错误');
} 