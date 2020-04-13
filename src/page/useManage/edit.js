import React, { Component } from 'react'
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { } from '@ant-design/icons';
// import {withRouter} from "react-router-dom";
// 可给没有路由的
const { Option } = Select;
class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }
    // const [form] = Form.useForm();
    render() {
        return (
            <div >
                <EditForm history={this.props.history} />
            </div>
        )
    }
}
function EditForm(props) {
    const [form] = Form.useForm();
    const onFinish = values => {
        // props.submit(values)
        console.log(values)
    };
    const go_back = () => {
        props.history.goBack()
    }
    const checkPrice = (rule, value) => {
        console.log(React.$validate.validatPhone(value))
        if (React.$validate.validatPhone(value)) {
            return Promise.resolve();
        }

        return Promise.reject('手机号格式不正确');
    }
    return (
        <div>
            <Form form={form} onFinish={onFinish} labelAlign="right" labelCol={{ span: 3 }}>
                <Row gutter={100}>
                    <Col span={10}>
                        {/*onBlur onChange*/}
                        <Form.Item
                            name="username"
                            label="用户"
                            validateTrigger="onBlur"
                            rules={
                                [
                                    {
                                        required: true
                                    },
                                ]
                            }
                            >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="id" label="电话"
                            validateFirst
                            validateTrigger="onBlur"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入'
                                    },
                                    {
                                        validator: checkPrice
                                    },
                                ]
                            }
                            >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={100}>
                    <Col span={10}>
                        <Form.Item name="nick" label="账号">
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="state" label="状态">
                            <Select style={{ width: 120 }} placeholder="请输入" allowClear >
                                <Option value="1">成功</Option>
                                <Option value="2">失败</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={18}>
                        <Button type="primary" loading={false} htmlType="submit" >
                            提交
                          </Button>
                          &nbsp;&nbsp;
                        <Button htmlType="button" onClick={go_back}>
                            返回
                         </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default edit;
