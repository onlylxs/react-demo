import React from "react";
import Util from "util/util.jsx";
import User from "service/user-service.jsx";

const _user = new User();
const _utl = new Util();


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _utl.getUrlParam('redirect') || '/'
        }
    }

    //获取input值
    inputChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    }

    inputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmitLogin();
        }
    }

    onSubmitLogin(e) {
        _user.login({
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            _utl.setStorage('userinfo', res);
            window.location.href = this.state.redirect;
        }, (err) => {
            _utl.errorTips(err);
        })
    }

    render() {
        return (
            <div id="login">
                <div className="login-box">
                    <h1>用户登录</h1>
                    <div className="row">
                        <i className="fa fa-user"/>
                        <input type="text"
                               name="username"
                               onChange={e => this.inputChange(e)}
                               onKeyUp={e => this.inputKeyUp(e)}
                               className="form-control"
                               placeholder="登陆账号"/>
                    </div>
                    <div className="row">
                        <i className="fa fa-unlock-alt"/>
                        <input type="password"
                               name="password"
                               onChange={e => this.inputChange(e)}
                               onKeyUp={e => this.inputKeyUp(e)}
                               className="form-control"
                               placeholder="登陆密码"/>
                    </div>
                    <button className="login-btn" onClick={e => this.onSubmitLogin(e)}> 登 陆</button>
                </div>
            </div>
        );
    }
}
export default Login

