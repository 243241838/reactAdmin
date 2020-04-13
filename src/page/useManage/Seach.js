import React from 'react'
import { Form, Input, Button, Select, DatePicker} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
function Seach(props) {
    const [form] = Form.useForm();
    const onFinish = values => {
        props.submit(values)
    };
    const onReset = () => {
        form.resetFields();
        props.reset();
    };
    // initialValues={props.fromData} 默认值
    return (
        <Form form={form} layout="inline" onFinish={onFinish}>
            <Form.Item name="username" label="用户">
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="id" label="id">
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="state" label="状态">
                <Select style={{ width: 120 }} placeholder="请输入"allowClear >
                    <Option value="1">成功</Option>
                    <Option value="2">失败</Option>
                </Select>
            </Form.Item>
            <Form.Item name="time" label="时间" >
                <DatePicker placeholder="请选择"   />
            </Form.Item>
            <Form.Item shouldUpdate>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    搜索
                </Button>
                &nbsp;&nbsp;
                <Button htmlType="button" onClick={onReset}>
                    重置
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Seach;