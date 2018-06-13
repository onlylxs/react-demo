import React from "react";

import Util from "util/util.jsx";
import Order from "service/order-service.jsx";
const _order = new Order();
const _utl = new Util();


class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: [],
            orderNo: this.props.match.params.id,
        }
    }

    componentDidMount() {
        this.loadOrderDetail();
    }

    //获取订单列表
    loadOrderDetail() {
        _order.getOrderDetail({
            url: this.state.url_type,
            "orderNo": this.state.orderNo
        }).then(res => {
            this.setState({
                orderInfo:res
            });
        }, err => {
            this.setState({
                orderInfo: ''
            });
            _utl.errorTips(err);
        });
    }


    render() {
        return (
            <div id="Order">
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.statusDesc}
                                {
                                    this.state.orderInfo.status === 20
                                        ? <button className="btn btn-default btn-sm btn-send-goods"
                                                  onClick={(e) => {
                                                      this.onSendGoods(e)
                                                  }}>立即发货</button>
                                        : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.paymentTypeDesc}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.orderInfo.payment}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                    </div>
                </div>
            </div>
        );
    }
}
export default OrderList