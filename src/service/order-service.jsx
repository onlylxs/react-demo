import Util from "util/util.jsx";
const _utl = new Util();

class User {

    //获取订单列表
    getOrderList(data) {
        return _utl.request({
            url: '/manage/order/' + data.url + '.do',
            data: data
        })
    }
    //获取订单详情
    getOrderDetail(data) {
        return _utl.request({
            url: '/manage/order/detail.do',
            data: data
        })
    }

}
export default User