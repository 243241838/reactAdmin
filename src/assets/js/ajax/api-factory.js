/* eslint-disable no-invalid-this */
import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie';
import Deferred from './deferred';
import { message} from 'antd';
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
const ajax = axios.create({
    timeout: 30000, //超时时间
    withCredentials: true
});

ajax.defaults.withCredentials = true; //允许跨域的配

export class Descriptor {
    constructor(desc) {
        this._url = _.isFunction(desc.url) ? desc.url : function () {
            return desc.url;
        };
        this._paramsValidator = _.chain(desc.params)
            .omit(v => !_.isFunction(v.validate))
            .mapObject(v => v.validate)
            .value();
        this._defaultParams = _.mapObject(desc.params, v => v.defaultValue);
        this._headers = desc.headers || {};
        this._optionParams = desc.optionParams;
        this._responseType = desc.responseType || 'json';
        this._contentType = `${desc.contentType || 'application/json'}; charset=UTF-8`;
    }

    makeParams(paramsFns) {
        return _.chain(paramsFns)
            .reduce((acc, v) => {
                const p = _.isFunction(v) ? v.call(acc) : v;
                return _.extend({}, acc, _.omit(p, value => _.isUndefined(value)));
            }, this._defaultParams)
            .mapObject((v, k, a) => _.isFunction(v) ? v.call(a) : v, this)
            .value();
    }

    makeRequest(method, params) {
        // var newParams = JSON.parse(JSON.stringify(params));
        // console.log(newParams);
        // if(params.optionParams&&params.optionParams.pageIndex&&params.optionParams.pageSize){ //添加是否有参数pageIndex  pageSize
        //   newParams.optionParams.pageIndex = (newParams.optionParams.pageIndex-1)*newParams.optionParams.pageSize;
        // }
        // _.omit 返回一个没有列入排除key属性的对象。
        // const data = _.omit.apply(_, [newParams].concat(this._optionParams)); //去掉url的key
        let data = {};
        //上传文件流
        if (params.contentType === 'multipart/form-data') { //上传的格式
            if (params.optionParams) {
                let fmData = new FormData(); //创建form对象
                Object.keys(params.optionParams).forEach((k) => {
                    fmData.append(k, params.optionParams[k]); //通过append向form对象添加数据
                })
                data = fmData
            }
        } else {
            //json
            data = params.optionParams;
        }
        const headers = _.extend({
            'Content-Type': params.contentType ? params.contentType : this._contentType,
            'token': Cookies.get('token') ? Cookies.get('token') : '',
            'loginType': 5
        }, this._headers);
        return {
            data: data,
            method,
            headers,
            cancelToken: null,
            url: this._url(params),
            responseType: this._responseType,
        };
    }
}

export default (descriptor) => {
    const desc = new Descriptor(descriptor);
    return function () {
        const paramsFns = [].slice.call(arguments, 0),
            exec = function (method, preFilter) {
                const params = desc.makeParams(paramsFns);
                let ajaxOption = desc.makeRequest(method, params);

                if (this._token) {
                    this._token.cancel('Cancel ajax request.');
                    this._token = null;
                }
                this._token = axios.CancelToken.source();

                if (preFilter) {
                    ajaxOption = preFilter(ajaxOption);
                }
                ajaxOption.cancelToken = this._token.token;

                const deferred = Deferred();
                ajax(ajaxOption)
                    .then(v => {
                        this._token = null;
                        if (v.data.code === 200) {
                            // window.alert('200')
                        } else if (v.data.code === 999) {
                            // Message({
                            //     message: v.data.msg,
                            //     type: 'warning',
                            //     customClass: 'MessageCustomClass',
                            //     duration: 3000
                            // });
                             message.warning(v.data.msg);
                            //  history.push('/');
                            //  setTimeout(()=> {
                            //      window.location.reload();
                            //  }, 2000)
                             return false;
                            // loginout();
                        } else {
                            // Message({
                            //     message: v.data.msg,
                            //     type: 'warning',
                            //     customClass: 'MessageCustomClass',
                            //     duration: 3000
                            // });
                        }
                        deferred.resolve(v.data, params);
                    })
                    .then(null, err => {
                        if (!axios.isCancel(err)) {
                            this._token = null;
                            // loginout();
                            // if (err.response.status != 200) {
                            //   Message({
                            //     message: err.response.data.msg,
                            //     type: 'warning',
                            //     customClass: 'MessageCustomClass',
                            //     duration: 1000
                            //   });
                            //   return false;
                            // }
                            deferred.reject(err, params);
                        }
                    });

                return deferred.promise;
            };

        return {
            fetch(preFilter) {
                return exec.call(this, 'GET', preFilter);
            },
            post(preFilter) {
                return exec.call(this, 'POST', preFilter);
            },
            put(preFilter) {
                return exec.call(this, 'PUT', preFilter);
            },
            del(preFilter) {
                return exec.call(this, 'DELETE', preFilter);
            },
        };
    };
};