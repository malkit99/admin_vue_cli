import store from '@/state/store'
export default function guest({next , router}){
    if(localStorage.getItem('token') && store.getters['auth/loggedIn']){
        return router.push({name : "default" })
    }
  
    return next();
  }