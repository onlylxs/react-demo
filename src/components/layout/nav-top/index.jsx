import React from "react";
import Util from "util/util.jsx";

const _utl = new Util();

class NavTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: _utl.getStorage('userinfo').username
        }
    }

    onlogout() {
        _utl.logout().then((res) => {
            _utl.removeStorage('userinfo');
            window.location.href = '/login';
        }, (err) => {
            _utl.errorTips(err);
        })
    }

    render() {
        return (
            <div id="fixed-top">
                <div className="topbar-left"><p>后台管理平台</p></div>
                <div className="topbar-right">
                    <div className="dropdown">
                        <a href="javascript:;" className="topbar-btn">
                            <i className="fa fa-user"/>
                            {
                                this.state.name ? <span>Welcome，{this.state.name}</span> : <span>Welcome，游客</span>
                            }
                        </a>
                        <ul>
                            <li><a href="UserModifyPwd"><i className="fa fa-unlock-alt"/>修改密码</a></li>
                            <li>
                                <a href="javascript:;" id="exitBtn"
                                   onClick={() => {
                                       this.onlogout()
                                   }}>
                                    <i className="fa fa-power-off"/>退出登录
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default NavTop