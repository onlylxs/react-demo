import React from "react";
import Pagination from "@/components/pagination/index.jsx";

import Util from "util/util.jsx";
import User from "service/user-service.jsx";
const _user = new User();
const _utl = new Util();


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 10
        }
    }

    componentDidMount() {
        this.loadUserList();
    }

    //获取用户列表
    loadUserList() {
        _user.getUserList({
            "pageNum": this.state.pageNum,
            "pageSize": this.state.pageSize
        }).then(res => {
            this.setState(res);
        }, err => {
            this.setState({
                list: []
            });
            _utl.errorTips(err);
        });
    }

    //改变页码
    onChangePageNum(pageNum, pageSize) {
        this.setState({
            pageNum: pageNum,
            pageSize: pageSize
        }, () => {
            this.loadUserList();
        });
    }

    render() {
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        let noMore = (
            <tr>
                <td colSpan="5" align="center">没有更多信息</td>
            </tr>
        );
        return (
            <div id="User">
                <table className="table table-bordered table-hover display" id="example">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>用户名</th>
                        <th>邮箱</th>
                        <th>电话</th>
                        <th>注册时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.length >= 1 ? listBody : noMore
                    }
                    </tbody>
                </table>
                {
                    this.state.list.length >= 1 ?
                        <Pagination
                            current={this.state.pageNum}
                            pageSize={this.state.pageSize}
                            total={this.state.total}
                            onChange={(pageNum, pageSize) => this.onChangePageNum(pageNum, pageSize)}
                            showTotal={(total, range) => `${range[0]} - ${range[1]} 条，共 ${total} 条数据`}
                        />
                        : ''
                }
            </div>
        );
    }
}
export default UserList