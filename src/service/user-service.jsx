import Util from "util/util.jsx";
const _utl = new Util();

class User {
    //登录
    login(userInfo) {
        return _utl.request({
            url: '/manage/user/login.do',
            data: userInfo
        })
    }

    //获取用户列表
    getUserList(data) {
        return _utl.request({
            url: '/manage/user/list.do',
            data: data
        })
    }

}
export default User