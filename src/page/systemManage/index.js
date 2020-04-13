import React from 'react';
import Template from '@src/template';
// import list from './list';
// import loadable from '@src/router/loader' //路由懒加载 
const systemManage = {
    path: '/systemManage',
    component: Template,
    title: '系统管理',
    children: [
        {
            path: '/systemManage/list',
            component: React.lazy(() => import("./list")),
            title: '列表'
        }
    ]
}
export default systemManage;
