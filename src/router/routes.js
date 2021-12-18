
const routes = [
  {
    path: '/',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "main", component: () => import('pages/Index.vue') },
      //Detail
      {
        path: '/detail=:id',
        name: "detail",
        component: () =>
          import('pages/Detail/Detail.vue'),
      },
      //About
      {
        path: '/about',
        name: "about",
        component: () =>
          import('pages/About/About.vue'),
      },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
