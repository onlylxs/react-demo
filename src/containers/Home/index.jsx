import React from "react";
import {Link} from "react-router-dom";

import Util from "util/util.jsx";
import Statistic from "service/statistic-service.jsx";

const _utl = new Util();
const _statistic = new Statistic();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "userCount": '...',
            "productCount": '...',
            "orderCount": '...'
        }
    }

    componentDidMount() {
        this.loadCount();
    }

    loadCount() {
        _statistic.getHomeCount().then(res => {
            this.setState(res);
        }, err => {
            _utl.errorTips(err);
        })
    }

    render() {
        return (
            <div id="home" title="首页">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <Link className="btn btn-success" to='/user'>
                                <h1>{this.state.userCount}</h1>
                                <p><i className="fa fa-user"/>总用户数</p>
                            </Link>
                        </div>
                        <div className="col-sm-4">
                            <Link className="btn btn-info" to='/product'>
                                <h1>{this.state.productCount}</h1>
                                <p><i className="fa fa-list"/>商品总数</p>
                            </Link>
                        </div>
                        <div className="col-sm-4">
                            <Link className="btn btn-warning" to='/order'>
                                <h1>{this.state.orderCount}</h1>
                                <p><i className="fa fa-pie-chart"/>订单总数</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home