import React from "react";
import FileUploader from "@/components/file-uploader/index.jsx";
import Editor from "@/components/editor/index.jsx";
import CateGorySelect from "./category-select.jsx";


import Util from "util/util.jsx";
import ProductS from "service/product-service.jsx";
const _product = new ProductS();
const _utl = new Util();

class Search extends React.Component {
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

    //上传图片成功
    onSuccess(res) {
        let imgbox = this.state.subImages;
        imgbox.push(res);
        this.setState({
            subImages: imgbox
        });
    }

    //上传图片失败
    onError(err) {
        _utl.errorTips(err);
    }

    //删除上传的图片
    delImage(e) {
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        })
    }

    //获取富文本编辑器值
    getEditorValue(value) {
        this.setState({
            detail: value
        })
    }

    //获取value值
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    //切割图片只要图片名字
    getSubImagesString() {
        return this.state.subImages.map((image) => image.uri).join(',');
    }

    //保存商品
    onSubmit(e) {
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.category_1_id),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status
        };
        if (this.state.id) {
            product.id = this.state.id;
        }
        _product.saveProduct(product).then((res) => {
            alert(res);
        }, (err) => {
            _utl.errorTips(err);
        })
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
                            <input type="text"
                                   className="form-control"
                                   placeholder="请输入商品名称"
                                   value={this.state.name}
                                   onChange={(e) => this.onValueChange(e)}
                                   name="name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入商品描述"
                                   name="subtitle"
                                   value={this.state.subtitle}
                                   onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CateGorySelect
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
                                <input type="number" className="form-control"
                                       placeholder="价格"
                                       name="price"
                                       value={this.state.price}
                                       onChange={(e) => this.onValueChange(e)}
                                />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number"
                                       className="form-control"
                                       placeholder="库存"
                                       name="stock"
                                       value={this.state.stock}
                                       onChange={(e) => this.onValueChange(e)}
                                />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            <FileUploader
                                onError={(err) => this.onError(err)}
                                onSuccess={(res) => this.onSuccess(res)}/>
                        </div>
                        <div className="col-md-10 col-md-offset-2" style={{height: '80px', marginTop: '8px'}}>
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
                            <Editor
                                defaultDetail={this.state.defaultDetail}
                                onEditorValue={(value) => this.getEditorValue(value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <input type="button" value="提交"
                                   className="btn btn-primary"
                                   onClick={e => this.onSubmit(e)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;
