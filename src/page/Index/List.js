import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 50,
            list: [],
        }
    }
    componentDidMount() {
        this.isScroll();
    }
    isScroll() {
        if (this.props.list && this.props.list.length <= 5) {
            this.setState({
                list: this.props.list
            })
            return false;

        }
        let list = JSON.parse(JSON.stringify(this.props.list)).splice(0, 4);
        this.setState({
            list: [...this.props.list, ...list]
        })
        this.Int();
    }
    Int() {
        this.listScroll = setInterval(() => {
            if ((this.props.list.length - 1) * 50 <= this.state.top * (-1)) {
                clearInterval(this.listScroll);
                this.refs.oul.style.transition = 'none'
                this.setState({
                    top: 50
                }, () => {
                    this.Int();


                })
                return false;
            }
            this.setState({
                top: this.state.top - 1
            })
        }, 30)
    }
    mouseIn() {
        if (this.props.list && this.props.list.length <= 5) return false;
        clearInterval(this.listScroll);
    }
    mouseOut() {
        if (this.props.list && this.props.list.length <= 5) return false;
        this.Int();
    }
    render() {
        return (
            <div className="list">
                <div className="top">
                    <span>最新职位</span>
                    <span className="fr">更多</span>
                </div>
                <ul ref='oul' style={{ top: this.state.top + 'px' }} onMouseOver={() => this.mouseIn()} onMouseOut={() => this.mouseOut()}>
                    {this.state.list.map((item, index) => {
                        return (
                            <li key={index} >
                                <span>{item.title}</span>
                                <span>{item.address}</span>
                                <span>{index + 1}小时前</span>
                            </li>
                        )
                    })}

                </ul>
            </div>
        );
    }
}

export default List;
