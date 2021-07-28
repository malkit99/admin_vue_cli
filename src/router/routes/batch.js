import middleware from "../../middleware/index"
export default [
    {
      path: '/batch-home',
      name: 'batch-home',
      meta: {
        middleware:[middleware.auth , middleware.checkPermissions ],
        permissions:['view-dashboard'],
      },
      component: () => import('../views/batch/BatchHome'),
    },
  ]