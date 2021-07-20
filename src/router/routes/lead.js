import middleware from "../../middleware/index"

export default [
    {
      path: '/lead',
      name: 'lead',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/dashboards/default'),
    },

    {
        path: '/enquiry',
        name: 'enquiry',
        meta: {
          middleware:[middleware.auth , middleware.checkPermissions ],
          permissions:['view-dashboard'],
        },
        component: () => import('../views/lead/EnquiryHome'),
    },
    {
      path: '/add-enquiry',
      name: 'add-enquiry',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/lead/AddEnquiry'),
  },

    {
        path: '/follow',
        name: 'follow',
        meta: {
          middleware:[middleware.auth , middleware.checkPermissions ],
          permissions:['view-dashboard'],
        },
        component: () => import('../views/dashboards/default'),
    },
  ]