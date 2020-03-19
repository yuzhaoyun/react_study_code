import React from 'react'

export default class BindThis extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            msg: '这是默认的MSG'
        };

        // 绑定 this 并传参的方式2: 在构造函数中绑定并传参
        // 注意: 当为一个函数, 调用 bind 改变了 this 指向后, bind 函数调用的结果, 有一个返回值, 这个值, 就是别改变this 指向后的函数的引用
        // 注意: bind 不会修改 原函数 的 this 指向
        this.changeMsg2 = this.changeMsg2.bind(this, '小汽车,', '天气');
    }

    render () {
        return <div>
            <h1>绑定This 并传参的几种方式</h1>
            {/* bind 的作用: 为前面的函数, 修改函数内部的 this 指向, 让函数内部的 this, 指向 bind 参数列表中的第一个参数 */}
            {/* bind 和 call apllay 之间的区别 */}
            {/* call 和 apply 修改完this指向后, 会立即调用前面的函数, 但是 bind 只是修改this 指向并不会调用 */}
            {/* 注意: bind 中的第一个参数, 是用来修改 this 指向的, 第一个参数后面的所有参数都会用来当做将来调用 前面函数 时候的参数传递进去*/}
            {/* 方式1: 在 事件处理函数中, 直接使用 bind 绑定 this 并传参 */}
            <button onClick={this.changeMsg1.bind(this, '红薯, ', '披萨')}>绑定this并传参的方式1</button>
            
            <button onClick={this.changeMsg2}>绑定this并传参的方式2</button>

            {/* <button onClick={ () => this.changeMsg3('笑脸', '表情') }>绑定this并传参的方式2</button> */}
            <button onClick={ () => this.changeMsg3('笑脸', '表情') }>绑定this并传参的方式2</button>
            <hr/>
            <h3>{this.state.msg}</h3>
            {/* 在 vue 中, 有 v-model 指令来实现双向数据绑定, 但是, 在 React 中, 根本没有指令的概念, 因此 React 默认也不支持 双向数据绑定 */}
            {/* React 只支持从 state 上传输到 页面, 但是, 无法自动实现数据从 页面 传输到 state 中进行保存
            也就是, React 不支持数据的自动逆向传输, 只实现了数据的单项绑定 */}
            {/* 注意: 如果为表单元素提供了value 属性绑定, 那么, 必须同时为 表单元素 绑定 readOnly, 或者提供给 onChange 事件 */}
            {/* 如果 提供了 onChange 表示: 这个元素的值可以被修改, 但是要自己定义修改的逻辑 */}
            <input type="text" style={{width: '100%'}} ref='input' value={this.state.msg} onChange={this.textChange}/>
        </div>
    }

    changeMsg1 (arg1, arg2) {
        // console.log(this); // 注意这里的方法是一个普通方法, 因此, 在触发的时候, 这里的 this 是 undefined
        this.setState({
            msg: '方式1小猪爱吃' + arg1 + arg2
        })
    }

    changeMsg2 (arg1, arg2) {
        // console.log(this); // 注意这里的方法是一个普通方法, 因此, 在触发的时候, 这里的 this 是 undefined
        this.setState({
            msg: '方式2小猪爱吃' + arg1 + arg2
        })
    }

    changeMsg3 (arg1, arg2) {
        // console.log(this); // 注意这里的方法是一个普通方法, 因此, 在触发的时候, 这里的 this 是 undefined
        this.setState({
            msg: '方式3小猪爱吃' + arg1 + arg2
        })
    }

    textChange = () => {
        // 如果想要
        // 让 文本框在触发的 onChange 的时候, 同时把文本框最新的值, 保存到 state 中, 那么, 我们需要手动调用 this.setState
        /**
         * 获取文本框中最新文本的三种方式: 
         *  1. 使用 document.getElementById 来拿
         *  2. 使用 ref 来拿
         *  3. 使用 事件对象的 参数 e 来拿  e.target 就表示触发 这个事件的 事件对象, 得到的是一个原生的 JS DOM 对象
         */
        this.setState({
            msg: this.refs.input.value
        })
    }
}