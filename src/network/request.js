import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
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