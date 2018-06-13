import Util from "util/util.jsx";
const _utl = new Util();

class Statistic {
    //获取首页信息
    getHomeCount() {
        return _utl.request({
            url: '/manage/statistic/base_count.do',
        })
    }

}
export default Statistic