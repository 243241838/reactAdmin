import React from 'react';
import Template from '@src/template';
// import userList from './userList';
// import edit from './edit';
// import loadable from '@src/router/loader' //路由懒加载 
const useManage = {
    path: '/useManage',
    component: Template,
    title: '用户管理',
    requiresAuth: true,
    children: [
        {
            path: '/useManage/userList',
            component: React.lazy(() => import("./userList")),
            title: '用户列表',
            requiresAuth: true,
        },
         {
            path: '/useManage/edit',
            component: React.lazy(() => import("./edit")),
            title: '编辑',
            requiresAuth: true,
        }
    ]
}
export default useManage;
