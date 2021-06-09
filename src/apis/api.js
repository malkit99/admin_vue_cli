import axios from 'axios';
import store from '../state/store'


let BaseApi = axios.create({
  baseURL: "http://localhost:8000/api"
});

let Api = function() {
  let token = store.getters['auth/getToken'];
  if (token){
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem('token' , token)
  }
  else{
    BaseApi.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem('token')
  }

  return BaseApi;
}

// Global Loader
BaseApi.interceptors.request.use(function (config) {
 
    store.commit('notification/SHOW_LOADER' , true)
    return config
  }, 
  function (error) {
    store.commit('notification/SHOW_LOADER' , false)
  
    return Promise.reject(error);
  });
  
  BaseApi.interceptors.response.use((response) => {
    store.commit('notification/SHOW_LOADER' , false)
    return response;
  }, (error) => {
    store.commit('notification/SHOW_LOADER' , false)
  
    return Promise.reject(error);
  })

export default Api 

