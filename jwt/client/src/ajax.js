import axios from "axios"
import { Loading } from 'element-ui';
import router from "./router";


let loadingInstance;

const start = () => {
  loadingInstance = Loading.service({background: 'rgba(0, 0, 0, 0.8)', text: "拼命加载中..."});
}

const end = () => {
  setTimeout(() => {
    loadingInstance.close();
  }, 500);
}



axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(config => {
  start();
  let token = localStorage.getItem("token");
  token && (config.headers.Authorization = token);
  return config;
}, err => Promise.reject(err));

axios.interceptors.response.use(config => {
  end();
  return config.data
}, err => {
  let { status } = err.response;
  if (status === 403) {  //token过期
    router.push("/login");
    localStorage.removeItem("token");
  }
});

export default axios;