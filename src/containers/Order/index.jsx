import React from "react";
import {Link} from "react-router-dom";
import Pagination from "@/components/pagination/index.jsx";

import Util from "util/util.jsx";
import Order from "service/order-service.jsx";
const _order = new Order();
const _utl = new Util();


class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 10,
            url_type: 'list',
            orderNo: '',
        }
    }

    componentDidMount() {
        this.loadOrderList();
    }

    //获取订单列表
    loadOrderList() {
        _order.getOrderList({
            url: this.state.url_type,
            "pageNum": this.state.pageNum,
            "pageSize": this.state.pageSize,
            "orderNo": this.state.orderNo,
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
            this.loadOrderList();
        });
    }

    //输入关键词
    onChangeValue(e) {
        let val = e.target.value,
            listType = val === '' ? 'list' : 'search';
        this.setState({
            url_type: listType,
            orderNo: val,
            pageNum: 1,
            pageSize: 10,
        })
    }

    //查询订单
    onSearch() {
        this.loadOrderList();
    }

    //查询订单
    onSearchKeyUp(e) {
        if (e.keyCode == 13) {
            this.loadOrderList();
        }
    }

    render() {
        let listBody = this.state.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.orderNo}</td>
                    <td>{item.receiverName}</td>
                    <td>{item.statusDesc}</td>
                    <td>{item.payment}</td>
                    <td>{new Date(item.createTime).toLocaleString()}</td>
                    <td><Link to={`/order/detail/${item.orderNo}`}>查看</Link></td>
                </tr>
            )
        });
        let noMore = (
            <tr>
                <td colSpan="5" align="center">没有更多信息</td>
            </tr>
        );
        return (
            <div id="Order">

                <div className="form-inline" style={{marginBottom: '25px'}}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="关键词"
                            onKeyUp={e => this.onSearchKeyUp(e)}
                            onChange={e => this.onChangeValue(e)}
                            name="searchKeyword"/>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.onSearch()}>
                        搜索
                    </button>
                </div>

                <table className="table table-bordered table-hover display" id="example">
                    <thead>
                    <tr>
                        <th>订单号</th>
                        <th>收件人</th>
                        <th>订单状态</th>
                        <th>订单总价</th>
                        <th>创建时间</th>
                        <th>操作</th>
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
export default OrderList