import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 10000
    })

    axios.interceptors.request.use(function (config) {
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
    
    axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        return Promise.reject(error);
      });

    return instance(config)
}