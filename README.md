

## react技术栈管理后台

使用react + react-router + react-router-config  + react-redux + redux-thunk antd版本4 兼容ie11及以上版本

#### react-router-config
可以让react实现和vue一样的路由定义方式， 模块化定义路由
#### 
const routes = [
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
 <Router>
    {renderRoutes(routes)}
</Router>
#### redux-thunk
实现异步提交


