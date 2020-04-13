import { ADD, GETDATA } from './actionTypes';
import axios from 'axios';
export const getListAction = (data) => ({
    type: GETDATA,
    data
})
// thunk中间件
export const getTodoList = () => {
    // dispatch return 有这个参数
    return (dispatch) => {
        async  function aa () {
            console.log('das')
            let list = await [{ name: 'aa' }];
            const action = getListAction(list);
            dispatch(action);
        }
        aa();
        // axios.get('https://www.easy-mock.com/mock/5e798707b012bb52f48e66bb/react/list')
        //     .then((res) => {
        //         // console.log(res.data.data)
        //         // const action = getListAction(res.data.data.list)
        //         // store.dispatch(action);
        //         const data = res.data;
        //         // console.log(data.data.list)
        //         const action = getListAction(data.data.list);
        //         dispatch(action);
        //     })
        //     .catch((error) => {
        //         const action = getListAction([{name: 'dsdas'}]);
        //         dispatch(action);
        //         console.log('axios 获取数据失败' + error)
        //     })
    }
}