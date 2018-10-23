import axios from 'axios';

const axiosJson = axios.create({
    // baseURL: 'https://www.tdaifu.net/nxReview',
    baseURL: 'http://localhost:8082/',
    timeout: 4000,
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

axiosJson.interceptors.response.use((res) => {
    if (res.status !== 200) {
      throw new Error('请求错误');
    }
    return res.data;
  }, (error) => {
    return Promise.reject(error);
});

export default axiosJson;