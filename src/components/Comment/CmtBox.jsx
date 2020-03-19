import React from "react"

// 评论框组件
export default class CmtBox extends React.Component {
    constructor (props) {
        super (props);

        this.state = {};
    }

    render () {
        return <div>
            <label>评论人: </label><br/>
            <input type="text" ref='user'/> <br/>
            <label>评论内容: </label> <br/>
            <textarea cols="30" rows="4" ref='content'></textarea> <br/>
            <button onClick={this.postComment}>发表评论</button>
        </div>
    }

    postComment = () => {
        // 1. 获取到评论人和评论内容
        // 2. 从 本地存储中, 先获取之前的评论数组
        // 3. 把 最新的这条评论 unshift 进去
        // 4. 再 把最新的评论数组, 保存到 本地存储中
        let cmtInfo = { user: this.refs.user.value, content: this.refs.content.value};
        let list = JSON.parse(localStorage.getItem('cmts') || '[]');
        list.unshift(cmtInfo);
        localStorage.setItem('cmts', JSON.stringify(list));

        this.refs.user.value = this.refs.content.value = '';

        this.props.reload();
    }
}