import middleware from "../../middleware/index"
export default [
    {
      path: '/student',
      name: 'student',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/students/StudentHome'),
    },

    {
        path: '/add-student',
        name: 'add-student',
        meta: {
          middleware:[middleware.auth , middleware.checkPermissions ],
          permissions:['view-dashboard'],
        },
        component: () => import('../views/students/AddStudent'),
    },

    {
        path: '/student-detail',
        name: 'student-detail',
        meta: {
          middleware:[middleware.auth , middleware.checkPermissions ],
          permissions:['view-dashboard'],
        },
        component: () => import('../views/students/ShowStudent'),
    },

    {
      path: '/student-fee-list',
      name: 'student-fee-list',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/students/StudentFeeList'),
    },

    
    {
      path: '/fee-payment-detail',
      name: 'fee-payment-detail',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/students/PayFeeStudent'),
    },
  ]