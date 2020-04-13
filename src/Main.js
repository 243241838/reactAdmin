import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { Layout, Menu, Breadcrumb, Row, Col, Avatar, Button } from 'antd';
import { connect } from 'react-redux'; //连接器
import * as Icon from '@ant-design/icons';
import 'antd/dist/antd.css';
import './assets/scss/main.scss'
// import { Route, Redirect, Switch } from 'react-router-dom'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            menu: [
                {
                    name: '用户管理',
                    id: '1',
                    icon: 'UserDeleteOutlined',
                    path: '/useManage',
                    children: [
                        {
                            name: '用户列表',
                            id: '2',
                            path: '/useManage/userList',
                            children: []
                        },
                        {
                            name: '编辑列表',
                            id: '3',
                            path: '/useManage/edit',
                            children: []
                        }
                    ]
                },
                {
                    name: '系统管理',
                    id: '11',
                    icon: 'AppstoreOutlined',
                    path: '/systemManage',
                    children: [
                        {
                            name: '列表',
                            id: '12',
                            path: '/systemManage/list',
                            children: []
                        }
                    ]
                }
            ],
            routeName: '',
            pathHistory: []
        };
    }
    componentDidMount() {
        this.setState({
            routeName: this.props.location.pathname
        }, () => {
            this.routerMenu(this.state.menu, []);
        })
    }

    componentWillUnmount() {
        // 取消异步方法
         this.setState = (state, callback) => {
            return
         }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    // 路由面包屑
    routerMenu = (data, list) => {
        data.map((item, index) => {
            if (item.children && item.children.length) {
                let array = [...list];
                array.push(item.name)
                this.routerMenu(item.children, array)
            } else {
                if (item.path === this.state.routeName) {
                    this.setState({
                        pathHistory: [...list, item.name]
                    })
                }
            }
            return null;
        })

    }
    // 渲染菜单
    renderMenu = (data) => {
        return data.map((item, index) => {
            if (item.children && item.children.length) {
                let icon = React.createElement(Icon[item.icon]);
                return (
                    <SubMenu
                        key={item.name}
                        title={
                            <span>
                                {icon}
                                <span>{item.name}</span>
                            </span>
                        }
                        >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.name} onClick={() => this.go_url(item.path)}>
                        <span>{item.name}</span>
                    </Menu.Item>
                )
            }

        })
    }
    go_url = (url) => {
        this.props.history.push(url);
    }
    layoutGo = ()=> {
        this.props.history.push('/');
    }
    render() {
         this.props.history.listen(route => {
            this.setState({
                routeName: route.pathname
            }, () => {
                this.routerMenu(this.state.menu, []);
            })
        })
        return (
            <Layout className="layout">
                <Sider className="sider" trigger={null} collapsible collapsed={this.state.collapsed}>
                    {/*logo位置*/}
                    <div className="logo" >logo</div>
                    <Menu mode="inline" theme="dark" className="menu" >
                        {
                            this.renderMenu(this.state.menu)
                        }
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/*site-layout-background */}
                    <Header className=" header" style={{ padding: 0 }}>
                        <Row>
                            <Col flex='50px'>
                                {
                                    this.state.collapsed ?
                                        < Icon.MenuUnfoldOutlined onClick={() => this.toggle()} /> :
                                        <Icon.MenuFoldOutlined onClick={() => this.toggle()} />
                                }
                            </Col>
                            <Col flex='auto'>
                                {/*
                                    <Menu theme="dark" mode="horizontal">
                                        <Menu.Item key="1">nav 1</Menu.Item>
                                        <Menu.Item key="2">nav 2</Menu.Item>
                                        <Menu.Item key="3">nav 3</Menu.Item>
                                    </Menu>
                                */}
                            </Col>
                            <Col flex='230px'>
                                <Row gutter={10}>
                                    <Col flex='20px'>
                                        <Avatar icon={<Icon.UserOutlined />} />
                                    </Col>
                                    <Col>欢迎，admin</Col>
                                    <Col flex="20px">&nbsp;&nbsp;|</Col>
                                    <Col >
                                        <Button type="link" onClick={()=> this.layoutGo()} ghost>退出</Button >
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Header>
                    <Breadcrumb style={{ margin: '10px 20px' }}>
                        {
                            this.state.pathHistory.map((item, index) => {
                                return (
                                    <Breadcrumb.Item key={item + index}>{item}</Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                    <Content className="site-layout-background" style={{ margin: '00px 16px 24px 16px', padding: 24 }}>
                        {renderRoutes(this.props.route.children)}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
// 映射
const stateToProps = (state) => {
    return state.reducer
    // return state; //可以全部映射state
}
// 修改映射
const dispatchToProps = (dispatch, state) => {
    return {
        inputChange(e) {
            const action = {
                type: 'change_input',
                value: e.target.value
            }
            dispatch(action);
        }
    }
}
export default connect(stateToProps, dispatchToProps)(App);