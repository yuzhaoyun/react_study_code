// 1. 导入包
// import React,{Component} from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

// 导入计数器组件
// import Counter from './components/counter'
// import TestRecevieProps from './components/TestReceiveProps'
// import BindThis from './components/BindThis'
// import CmtList from './components/Comment/CmtList'
import Context from './components/context'

// 调用 render函数渲染
ReactDOM.render(<div>
    {/* <Counter initcount={0}></Counter> */}
    {/* <TestRecevieProps></TestRecevieProps> */}
    {/* <CmtList></CmtList> */}
    <Context></Context>
    </div>,document.getElementById('app'));