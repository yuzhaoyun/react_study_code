import React from 'react'
import ReactTypes from 'prop-types'

// 最外层父组件
export default class Context extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            color: 'red'
        }
    }

    // 1. 在组件中, 定义一个 function , 这个 function  有个固定的名称, 叫做 getChildContext, 内部必须
    // 返回一个对象, 这个对象,就是要共享给 所有孙子健的 数据
    getChildContext () {
        return {
            color: this.state.color
        }
    }

    // 2. 使用属性校验, 规定一下 传递给子组件的 数据类型, 需要定义 一个 静态 (static) childContextTypes(固定名称)
    static childContextTypes = {
        color: ReactTypes.string // 规定了 传递给子组件的 数据类型 
    }

    render () {
        return <div>
            <h1>这是最外层父组件</h1>
            <Com2></Com2>
        </div>
    }
}

// 中间的子组件
class Com2 extends React.Component {
    render () {
        return <div>
            <h3>这是中间的子组件</h3>
            <Com3></Com3>
        </div>
    }
}

// 这是内部的孙组件
class Com3 extends  React.Component {

    // 3. 上来之后, 先来个属性校验, 去校验一下父组件传递过来的 参数类型
    static contextTypes = {
        color: ReactTypes.string // 这里如果子组件, 想要使用 父组件通过context 共享的数据, 那么在使用之前
        // 一定要先 做一下属性数据类型校验
    }

    render () {
        return <div>
            <h5 style={{color: this.context.color}}>这是最里面的孙子组件</h5>
        </div>
    }
}