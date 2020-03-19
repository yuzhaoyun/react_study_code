import React from 'react'
// 注意: prop-types 包中只能单一, 只提供了一些常见的 数据类型, 用于做类型的校验
import ReactTypes from 'prop-types'

// 咱们封装组件的目的, 是为了团队协作开发更加方便, 有的人只负责开发组件, 有的人只负责调用组件
// 最好在封装组件的时候, 为组件的一些必要数据, 进行类型校验
export default class Counter extends React.Component{
    constructor (props) {
        super(props);

        // 初始化组件外的私有状态, 保存的是组件的私有数据
        this.state = {
            msg: 'ok',
            count: props.initcount // 基数: 把外界传过来的 initcount 赋值给 state 中的 count 值, 这样就把count值改成了可读可写的state值
        };
    }

    // 在封装一个组件的时候, 组件内部, 肯定有一些数据是必须的, 哪怕是用户没有传递一些相关的启动参数, 组件内部
    // 尽量提供一个默认值
    
    // 在 React 中, 使用静态的 defaultProps 属性, 来设置 组件的 默认属性值;

    static defaultProps = {
        initcount: 0  // 如果外界没有传递 initcount 那么自己初始化一个值 0
    }

    // 这是创建一个 静态的 propTypes 对象, 在这个对象中, 可以把 外界传递过来的属性, 做类型校验;
    // 注意: 如果要为 传递过来的属性做类型校验, 必须安装 React 提供的 第三方包, 叫做: prop-types
    // prop-types 大概在 v.15.x 前, 并没有单独抽离出来, 那时候, 还和 react 包在一起, 之后分开来了
    static propTypes = {
        initcount: ReactTypes.number // 使用 props-types 包, 来定义 initcount 为 number 类型
    }

    // 在组件即将挂载到页面上的时候执行, 此时, 组件尚未挂载到页面中
    // 此时DOM是否建好了呢? 此时, 内存中的虚拟DOM也没有开始创建
    componentWillMount () { // 这个函数等同于 vue 中的 created 函数
        // 此时, 无法获取到页面上的 任何元素, 因为 虚拟DOM 和 页面 都还没有开始渲染呢 ! 
        // console.log(document.getElementById('myh3')); // 在此阶段中, 不能去操作页面上的DOM 元素
        console.log(this.props.initcount);
        console.log(this.state.msg);
        this.myselfFund();
    }

    // 当执行到这个生命周期函数的时候, 即将要开始渲染内存中的 虚拟 DOM 了, 当这个函数执行完, 内存中就有了一个虚拟DOM
    // 但是, 页面上尚未真正显示DOM元素;
    render () {

        // 在组件运行阶段中, 每当调用 render 函数的时候, 也忙上的 DOM 元素, 还是之前旧的
        if (this.refs.h3 && this.refs.h3.innerText) {
            console.log(this.refs.h3.innerText);
        }
        // 在 return 之前, 虚拟DOM 还没有开始创建, 页面上也是空的, 根本拿不到任何的 元素 
        return <div>
            {/* 规定, 每个用户在使用 组件的时候, 必须传递一个 默认的 数量之, 是为 组件初始化的数据 */}
            <h1>这是 Counter 计数器组件</h1>
            <input type="button" value=' +1 ' id='btn' onClick={this.increment}/>
            <hr/>
            <h3 id="myh3" ref='h3'>当前的数量是: {this.state.count}</h3>
        </div>

        // 当 return 执行完毕之后, 虚拟 DOM 创建好了, 但是, 还没有挂载到真正的页面中
    }

    // 当组件挂载到页面上之后, 会进入这个生命周期函数, 只要生命周期函数了, 必然说明, 页面上, 已经有可见的DOM元素了
    // 当组件执行完 componentDidMount 函数后, 就进入了运行中的状态, 所以, componentDidMount 是创建阶段的最后一个函数
    componentDidMount () {
        // 在这个函数中, 我们可以放心的去 操作 页面上你需要使用的 DOM 元素了
        // 如果我们想操作DOM元素, 最早, 只能在 componentDidMount 中进行
        //  componentDidMount 相当于 vue 中的 mounted 函数
        // console.log(document.getElementById('myh3'));

        // 原生方法
        // document.getElementById('btn').onclick = () => {
        //     this.setState({
        //         count: this.state.count +1
        //     })
        // }


    }
    
    // 从这里开始, 就进入到了组件的运行中状态
    // 来判断组件是否需要自增
    shouldComponentUpdate (nextProps, nextState) {
        // 1. 在 shouldComponentUpdate 中要求必须返回一个布尔值
        /* 
        2. 在 shouldComponentUpdate 中, 如果返回的值时 false, 则 不会继续执行后续的声明周期函数, 而是
        直接退回到了运行中的状态, 此时有 由于 后续的 render 函数并没有被调用, 因此, 页面不会被更新, 但是组件
        的state 状态, 却被修改了
        */
        // return false

        // 需求: 如果 state 中的 count 值时偶数, 则 更新页面, 如果 count 值 是奇数则更新页面
        /*
        经过打印测试发现, 在 shouldComponentUpdate 中, 通过 this.state.count 拿到的值, 是上一次的旧
        数据, 并不是当前最新的数据
        */
        // console.log(nextProps);
        // console.log(nextState);
        // return nextState.count % 2 === 0 ? true : false;

        return true
    }

    // 组件将要更新, 此时尚未更新, 在进入这个 声明周期函数的时候, 内存中的虚拟DOM是旧的, 页面上的DOM元素也是旧的
    componentWillUpdate () {
        // 经过打印分析, 此时 页面上的 DOM 元素, 都是旧的, 应该慎重操作, 因为你可能操作的是旧DOM
        // console.log('当前内容是:' + document.getElementById('myh3').innerHTML);
        // console.log(this.refs.h3.innerText);
    }

    // 组件完成了更新, 此时, state 中的数据, 虚拟DOM, 页面上的 DOM, 都是最新的, 此时可以放心大胆的去操作了
    componentDidUpdate () {
        console.log(this.refs.h3.innerText);
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    myselfFund () {
        console.log('这是我自己定义的函数');
    }
}