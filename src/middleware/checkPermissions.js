import can from '../helpers/can'
import store from '../state/store'
export default function checkPermissions({next , from , router, to}){
    const requiredPermissions = to.meta.permissions
    if(!from.name){
        store.dispatch('auth/getLoadUser').then(() => {

          const canEnter = can(requiredPermissions);
          if(canEnter){
            return next();
          }
          return router.push({name: 'default'})
        })
    }
    else{
        const canEnter = can(requiredPermissions);
        if(canEnter){

            return next();

        }
        return router.push({name: 'default'})
    }




}