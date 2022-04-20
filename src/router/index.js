import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: '图标库' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
//二级路由 审核大厅
  {
    path: '/hall',
    component: Layout,
    redirect: '/hall/account',
    name: 'Hall',
    meta: { title: '审核大厅', icon: '部门管理' },
    children: [
      {
        path: 'certification',
        name: 'Certification',
        component: () => import('@/views/hall/certification.vue'),
        meta: { title: '实名认证', icon: 'tree' }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/hall/account.vue'),
        meta: { title: '账户变更', icon: '用户管理' }
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/hall/comment.vue'),
        meta: { title: '评论咨询', icon: '角色管理' }
      },
    ]

  //     {
  //       path: 'admin',
  //       name: 'Admin',
  //       component: () => import('@/views/hall/admin.vue'),
  //       meta: { title: '订单评论', icon: 'tree' }
  //     }
  //   ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '客房服务管理', icon: '菜单管理' }
      }
    ]
  },
//栏目管理 一级路由
{
  path: '/Column',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Column',
      component: () => import('@/views/column/index.vue'),
      meta: { title: '栏目管理', icon: '组件管理' }
    }
  ]
},
//系统配置 一级路由
{
  path: '/baseConfig',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'BaseConfig',
      component: () => import('@/views/baseConfig/index.vue'),
      meta: { title: '系统配置', icon: '组件管理' }
    }
  ]
},
//二级路由
{
  path: '/manager',
  component: Layout,
  redirect: '/manager/custom',
  name: 'Manager',
  meta: { title: '人员管理', icon: '部门管理' },
  children: [
    {
      path: 'custom',
      name: 'Custom',
      component: () => import('@/views/manager/custom.vue'),
      meta: { title: '顾客管理', icon: '用户管理' }
    },
    {
      path: 'employee',
      name: 'Employee',
      component: () => import('@/views/manager/employee.vue'),
      meta: { title: '员工管理', icon: '角色管理' }
    },
    {
      path: 'admin',
      name: 'Admin',
      component: () => import('@/views/manager/admin.vue'),
      meta: { title: '管理员', icon: 'tree' }
    }
  ]
},
//二级路由
{
  path: '/cargory',
  component: Layout,
  redirect: '/cargory/cargoryList',
  name: 'Cargory',
  meta: { title: '网站咨询', icon: '部门管理' },
  children: [
    {
      path: 'cargoryList',
      name: 'CargoryList',
      component: () => import('@/views/cargory/cargoryList.vue'),
      meta: { title: '网站分类', icon: '用户管理' }
    },
    {
      path: 'cargoryFor',
      name: 'CargoryFor',
      component: () => import('@/views/cargory/cargoryFor.vue'),
      meta: { title: '网站信息', icon: '角色管理' }
    },
   
  ]
},
//文章详情页面
{
  path: '/toPubDetail',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Category',
      component: () => import('@/views/cargory/toPubDetail.vue'),
      //隐藏路由
      hidden:true
    }
  ]
},
//订单管理
{
  path: '/Order',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Order',
      component: () => import('@/views/order/index1.vue'),
      meta: { title: '订单管理', icon: '组件管理' }
    }
  ]
},
//订单详情页面
{
  path: '/toDetails',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Order',
      component: () => import('@/views/order/toDetails.vue'),
      //隐藏路由
      hidden:true
    }
  ]
},

{
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
