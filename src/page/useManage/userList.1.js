import React, { Component } from 'react'
import style from './scss/useList.module.scss';
import { connect } from 'react-redux'; //连接器
import store from '@src/store';
import { getTodoList } from '@src/store/acctionCreators';
class userList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // componentDidMount() {
    //     const action = getTodoList();
    //     store.dispatch(action)
    //     // this.props.inputChange();
    // }

    // componentWillUnmount() {
    // }
    render() {
         const {inputValue, inputChange, list} = this.props;
        return (
            <div className={style.list}>
                543654
            {inputValue}
            <ul>
                {
                    list.map((item, index)=> {
                        return (
                            <li key={index}>{item.name}</li>
                        )
                    })
                }
            </ul>
            </div>
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
        inputChange() {
            const action = {
                type: 'add',
                value: '64656'
            }
            dispatch(action);
        }
    }
}
export default connect(stateToProps, dispatchToProps)(userList);
