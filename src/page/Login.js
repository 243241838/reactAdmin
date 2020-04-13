import React from 'react'
import { Card, Form, Input, Button } from 'antd';
import '@src/assets/scss/login.scss';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
function Login(props) {
    const layout = {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
    };
    const tailLayout = {
        wrapperCol: { offset: 20, span: 20 },
    };
    const onFinish = values => {
        // console.log('Success:', values);
        // React.$Cookies.set('nn', '24111')
        React.$Cookies.set('token', '111')
        props.history.push('/useManage')
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">
            <Card title="后台管理系统" className='center'>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >

                    <Form.Item
                        label=""
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <Input.Password prefix={<KeyOutlined />} placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Login;