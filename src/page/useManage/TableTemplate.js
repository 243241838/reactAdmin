import React, {useState} from 'react'
import { Table, Button, Modal } from 'antd';
const { Column } = Table;
// 生成表格
function TableTemplate(props) {
    const [visible, setVisible] = useState(false); //提示框
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [rowData, setRowData] = useState({});
    const [pageData] = useState(props.pageData);
    const del = (row)=> {
        // console.log(row);
        setRowData(row);
        setVisible(true);
    } 
    // 确认
    const handleOk = ()=> {
        setConfirmLoading(true);
        console.log(rowData)
        setTimeout(()=> {
            setVisible(false);
            setConfirmLoading(false);
        }, 4000)
    }
    // 取消
    const handleCancel = ()=> {
        setVisible(false);
    }
    return (
        <div>
            <br />
            <Table
                rowClassName="row"
                loading={props.loading}
                pagination={false}
                bordered
                dataSource={props.data}>
                <Column title="序号" align="center" width={100} dataIndex="" render={(text, record, index) => {
                    return ((index + 1) + (pageData.pageIndex - 1) * pageData.pageSize)
                } } />
                <Column title="年龄" align="center" dataIndex="age" />
                <Column title="地址" align="center" dataIndex="address" />
                <Column title="名字" align="center" dataIndex="name" />
                <Column title="哈哈" align="center" dataIndex="name" />
                <Column title="操作" align="center" width={200} render={(text, record, index) => {
                       return (
                           <div>
                                <Button onClick={()=> del(record)}>删除</Button>
                                &nbsp; &nbsp;
                                <Button type="primary" onClick={()=> del(record)}>编辑</Button>
                           </div>
                        )
                } } />
            </Table>
            <br />
            <Modal
                title='提示'
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                maskClosable={false}
                >
            <p>确认删除吗?</p>
        </Modal>
        </div>
    )
}
export default TableTemplate;