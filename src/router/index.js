import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'FrontPage',
    component: () => import('../views/frontend/FrontPage.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/frontend/Index.vue')
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
        meta: {
          title: '商品頁面'
        }
      },
      {
        path: 'product_detail',
        name: 'product_detail',
        component: () => import('../views/frontend/Product_Detail.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/frontend/About.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { requiresAuth: true },
    component: () => import('../views/backend/Admin.vue'),
    children: [
      {
        path: 'products',
        name: 'Admin_Products',
        meta: { requiresAuth: true },
        component: () => import('../views/backend/Admin_Products.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
