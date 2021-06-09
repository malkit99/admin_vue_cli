import store from '@/state/store'
export default function auth({next , router}){
    if(!localStorage.getItem('token') && !store.getters['auth/loggedIn']){
        return router.push({name : "login"})
    }
  
    return next();
  }