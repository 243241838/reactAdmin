import React from 'react';
import Loadable from 'react-loadable'

//通用的过场组件
const loadings = () => <div>loading...</div>

export default (loader, loading = loadings) => {
    return Loadable({
        loader,
        loading
    })
}