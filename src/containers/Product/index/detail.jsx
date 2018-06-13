import React from "react";
import CateGorySelect from "./category-select.jsx";


import Util from "util/util.jsx";
import ProductS from "service/product-service.jsx";
const _product = new ProductS();
const _utl = new Util();

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            name: '',//商品名称
            subtitle: '',//商品描述
            subImages: [],//上传的图片
            detail: '',//商品详情
            price: 0,//价格
            stock: 0,//库存
            status: 1,//状态
            category_1_id: 0,
            category_2_id: 0,
        }
    }

    //获取下拉选择值
    onGetSelectValue(category_1_id, category_2_id) {
        this.setState({
            category_1_id: category_1_id,
            category_2_id: category_2_id
        });
    }

    componentDidMount() {
        if (this.state.id) {
            this.getProductInfo();
        }
    }

    //获取编辑信息
    getProductInfo() {
        _product.getProduct({productId: this.state.id}).then((res) => {
            let image = res.subImages.split(',');
            res.subImages = image.map((imgUri) => {
                return {
                    uri: imgUri,
                    url: res.imageHost + imgUri
                }
            });
            res.defaultDetail = res.detail;
            this.setState(res);
        }, (err) => {
            _utl.errorTips(err);
        })
    }

    render() {
        return (
            <div className="product-edit">
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" value={this.state.name} readOnly />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" value={this.state.subtitle} readOnly />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CateGorySelect
                            readOnly
                            category_1_id={this.state.categoryId}
                            onGetSelectValue={
                                (category_1_id, category_2_id) => this.onGetSelectValue(category_1_id, category_2_id)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.price} readOnly/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.stock} readOnly/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10 col-md-offset-2" style={{height: '80px', marginTop: '-15px'}}>
                            {
                                this.state.subImages.length ?
                                    (
                                        this.state.subImages.map((image, index) => {
                                            return (
                                                <div className="img-box" key={index}>
                                                    <img src={image.url}/>
                                                    <i className="fa fa-close" index={index}
                                                       onClick={e => this.delImage(e)}/>
                                                </div>
                                            )
                                        })
                                    )
                                    : ''
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <div dangerouslySetInnerHTML={{__html:this.state.defaultDetail}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDetail;
