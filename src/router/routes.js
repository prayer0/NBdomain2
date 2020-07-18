
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/Index')
      },
      {
        path: '/my',
        name: 'detail',
        component: () => import('pages/Detail')
      },
      {
        path: '/free',
        name: 'free',
        component: () => import('pages/free')
      },
      {
        path: '/regok',
        name: 'regok',
        component: () => import('pages/regSuccess')
      },
      {
        path: '/auction',
        name: 'auction',
        component: () => import('pages/auction')
      }
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
