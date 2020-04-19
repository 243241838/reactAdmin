import React, { Component } from 'react';
import List from './List';
import './scss/index.scss';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: [
                { title: '前端1', address: '杭州' },
                { title: '前端2', address: '杭州' },
                { title: '前端3', address: '杭州' },
                { title: '前端4', address: '杭州' },
                { title: '前端5', address: '杭州' },
                { title: '前端6', address: '杭州' },
                { title: '前端7', address: '杭州' },
                { title: '前端8', address: '杭州' },
                { title: '前端9', address: '杭州' },
                { title: '前端10', address: '杭州' }
            ]
        };
    }
    setInput(e) {
        this.setState({
            inputValue: e.target.value
        })
    }
    submitData() {
        this.setState({
            list: [ { title: '前端6', address: '杭州' },]
        })
        console.log(this.state.inputValue)
    }
    render() {
        return (
            <div className="index">
                {/* 头部 */}
                <header>
                    <div className="center">
                        <ul className="fl">
                            <li >首页</li>
                            <li>导航</li>
                        </ul>
                        <div className="fr">欢迎</div>
                    </div>
                </header>
                {/* banner */}
                <div className="banner">
                    <img src="https://img.alicdn.com/tfs/TB14TEEm7CWBuNjy0FaXXXUlXXa-1440-478.png" alt="" />
                    <div className="center">
                        <div>
                            <input placeholder="请输入职位关键词" type="text" onChange={(e) => this.setInput(e)} />
                            <button onClick={() => this.submitData()}>搜索</button>
                        </div>
                    </div>
                </div>
                {/* 内容 */}
                <div className="text">
                    <div className="center">
                        <div className="fl">
                            <List list={this.state.list} />
                        </div>
                        <div className="fr right">logo</div>
                    </div>
                </div>
                {/* 底部 */}
                <footer>
                    版权所有
                </footer>
            </div>
        );
    }
}


export default Index;