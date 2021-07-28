import middleware from "../../middleware/index"
export default [
    {
      path: '/course',
      name: 'course',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/course/CourseHome'),
    },

    {
      path: '/standard',
      name: 'standard',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/course/Standard'),
    },
    {
      path: '/add-course',
      name: 'add-course',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/course/AddCourse'),
    },

    {
      path: '/topic',
      name: 'topic',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/course/Topic'),
    },
    {
      path: '/subject',
      name: 'subject',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/course/Subject'),
    },

    {
      path: '/batch',
      name: 'batch',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/course/BatchHome'),
    },


    
    {
      path: '/add-batch',
      name: 'add-batch',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/course/AddBatch'),
    },



  ]