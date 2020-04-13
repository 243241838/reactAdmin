import React, { Component } from 'react'
import { Button, message} from 'antd';
import style from './scss/useList.module.scss';
import TableTemplate from './TableTemplate';
import Seach from './Seach';
import Page from '@src/components/Page';
class userList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromData: {
                pageSize: 10,
                pageIndex: 1
            },
            loading: false,
            tableData: [
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32,
                    address: '西湖区湖底公园1号',
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42,
                    address: '西湖区湖底公园1号',
                },
            ]
        };
    }
    componentDidMount() {
        // console.log(Cookies)
        // window.$Cookies.set('bb', '1111')
        // React.$Cookies.set('nn', '24111')
        this.getData();
    }

    componentWillUnmount() {
    }
    getData = ()=> {
         React.$ajax({
            url: "/support-api-impl/newsArticle/getNewsArticleList",
            optionParams: {
                name: 'das'
            }
        })
        .post()
        .then(response => {
             console.log(response)
            if (response.code === 200) {
            } else {
               message.warning(response.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
        this.setState({
            loading: true
        })
        console.log('获取数据')
        // console.log(this.state.fromData)
        this.setState({
            loading: false
        })
    }
    // 提交数据
    submit = (data) => {
        console.log(data)
        data.time = data.time ? data.time.format('YYYY-MM-DD') : '';
        this.setState({
            fromData: { ...this.state.fromData,pageIndex: 1, ...data } //赋值， pageIndex重置为一
        }, ()=> {
            this.getData(); //获取数据
        })
    }
    // 重置
    reset = (data) => {
        this.setState({
            fromData: {
                pageSize: 10,
                pageIndex: 1
            }
        })
    }
    // 页码变化
    pageIndexChange = (value)=> {
        console.log(value)
        this.setState({
            fromData: {...this.state.fromData, pageIndex: value}
        },()=> {
           this.getData(); //获取数据
        })
    }
    // 条数变化
    pageSizeChange = (value)=> {
        this.setState({
            fromData: {...this.state.fromData, pageIndex: 1,pageSize: value}
        },()=> {
           this.getData(); //获取数据
        })
    }
    // 添加
    add = () =>{
        this.props.history.push({
            pathname: '/useManage/edit',
            state: {
                name: 'ad',
                bb: '4354'
            }
        })
    }
    render() {
        return (
            <div className={style.list}>
                {/*搜索*/}
                <Seach
                    submit={(data) => this.submit(data)}
                    reset={() => this.reset()}
                    />
                <div>
                     <br/>
                     <Button onClick={()=>this.add()} type="primary" >添加</Button>
                </div>
                {/*表格*/}
                <TableTemplate
                    loading={this.state.loading}
                    pageData={this.state.fromData}
                    data={this.state.tableData}
                    />
                {/*分页*/}
                <Page
                    pageData={{...this.state.fromData, total: 500}}
                    pageIndexChange={(value)=> this.pageIndexChange(value)}
                    pageSizeChange={(value)=> this.pageSizeChange(value)}
                    />
                {/*写css样式*/}
                <style>{``}</style>
            </div>
        )
    }
}


export default userList;
