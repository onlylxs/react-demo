import Util from "util/util.jsx";
const _utl = new Util();

class Product {
    //获取商品列表
    getProductList(data) {
        return _utl.request({
            url: '/manage/product/' + data.listType + '.do',
            data: data
        })
    }

    //修改产品状态
    setSaleStatus(data) {
        return _utl.request({
            url: '/manage/product/set_sale_status.do',
            data: data
        })
    }

    //获取商品分类
    getCategory(data) {
        return _utl.request({
            url: '/manage/category/get_category.do',
            data: data
        })
    }

    //修改商品分类名称
    setCategoryName(data) {
        return _utl.request({
            url: '/manage/category/set_category_name.do',
            data: data
        })
    }

    //保存商品
    saveProduct(data) {
        return _utl.request({
            url: '/manage/product/save.do',
            data: data
        })
    }

    //获取商品详情
    getProduct(data) {
        return _utl.request({
            url: '/manage/product/detail.do',
            data: data
        })
    }
}
export default Product