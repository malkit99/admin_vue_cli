import store from '../../state/store'
import middleware from "../../middleware/index"

export default [
  {
    path: '/',
    name: 'default',
    meta: {
      middleware:[middleware.auth , middleware.checkPermissions ],
      permissions:['view-dashboard'],
    },
    component: () => import('../views/dashboards/default'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    middleware:[middleware.guest],
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/account/register'),
    meta: {
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('../views/account/forgot-password'),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      middleware:[middleware.auth],
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('../views/utility/404').default,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },

]
