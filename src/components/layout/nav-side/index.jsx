import React from "react";
import {Link} from "react-router-dom";

class NavSide extends React.Component {
    render() {
        return (
            <div id="left-content">
                <div className="menu">
                    <ul>
                        <li className="index-li">
                            <Link className="tit" to='/'>
                                <i className="fa fa-home" /><b>首页</b>
                            </Link>
                        </li>
                        <li>
                            <Link className="tit" to='/product'>
                                <i className="fa fa-caret-right" /><b>商品管理</b>
                            </Link>
                        </li>
                        <li>
                            <Link className="tit" to='/product-category'>
                                <i className="fa fa-caret-right" /><b>品类管理</b>
                            </Link>
                        </li>
                        <li>
                            <Link className="tit" to='/order'>
                                <i className="fa fa-caret-right" /><b>订单管理</b>
                            </Link>
                        </li>
                        <li>
                            <Link className="tit" to='/user'>
                                <i className="fa fa-caret-right" /><b>用户管理</b>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}
export default NavSide