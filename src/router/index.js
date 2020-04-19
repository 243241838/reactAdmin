import React from 'react';
// BrowserRouter  HashRouter
import { BrowserRouter as Router,Redirect , Switch} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
// import loadable from './loader' //路由懒加载 
import Main from '@src/Main';
import useManage from '@src/page/useManage/';
import systemManage from '@src/page/systemManage';
// import Template from '@src/template';
// const login = React.lazy(() => import("@src/page/Login"));
import login from '@src/page/Login';
import  Index from '@src/page/Index/Index';
// exact对应一个页面是用， 一个模块时不要用， 否则一级路由使用， 匹配不到二级
const routes = [
      {
        path: '/index',
        exact: true,
        component: Index,
        title: 'Index'
    },
    {
        path: '/',
        exact: true,
        render: ()=> <Redirect to="/login" />
    },

    {
        path: '/login',
        exact: true,
        component: login,
        title: '登录'
    },
    {
        path: '/',
        component: Main,
        // is
        children: [
            useManage,
            systemManage
        ]
    }
]
function RouteConfig() {
    return (
        <Router>
            {renderRoutes(routes)}
        </Router>
    )
}
export default RouteConfig;