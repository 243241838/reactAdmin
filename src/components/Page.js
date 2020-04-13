import React, {useState} from 'react'
import { Pagination } from 'antd';
function Page(props) {
    const [pageData] = useState(props.pageData)
    // 页码
    const onChange = (page, pageSize) => {
        props.pageIndexChange(page);
    }
    // 分页条数
    const onShowSizeChange = (current, size) => {
         props.pageSizeChange(size);
    }
    return (
        <div className="textR">
        {/* current={pageData.pageIndex}*/}
        {/*pageSize={pageData.pageSize}*/}
            <Pagination
               
                
                total={pageData.total}
                showTotal={total => `共 ${total} 条`}
                showQuickJumper
                pageSizeOptions={
                    ['10', '20', '30', '50']
                }
                onShowSizeChange={onShowSizeChange}
                hideOnSinglePage={true}
                onChange={onChange} />
        </div>
    )
}
export default Page;