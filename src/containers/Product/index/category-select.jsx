import React from "react";

import Util from "util/util.jsx";
import ProductS from "service/product-service.jsx";
const _product = new ProductS();
const _utl = new Util();

class CategorySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_1_list: [],
            category_1_id: 0,
            category_2_list: [],
            category_2_id: 0
        }
    }

    componentDidMount() {
        this.getCategory_1();
    }

    //加载一级分类
    getCategory_1() {
        _product.getCategory({categoryId: this.state.category_1_id}).then(res => {
            this.setState({
                category_1_list: res
            });
        }, err => {
            _utl.errorTips(err);
        });
    }

    //加载二级分类
    getCategory_2() {
        _product.getCategory({categoryId: this.state.category_1_id}).then(res => {
            this.setState({
                category_2_list: res
            });
        }, err => {
            _utl.errorTips(err);
        });
    }

    //select一级选中选择事件
    ChangeCategory_1(e) {
        if (this.props.readOnly) return false;
        let newValue = e.target.value || 0;
        this.setState({
            category_1_id: newValue,
            category_2_list: [],
            category_2_id: 0
        }, () => {
            this.getCategory_2();
            this.propsGetValue();
        });
    }

    //select二级选中事件
    ChangeCategory_2(e) {
        if (this.props.readOnly) return false;
        let newValue = e.target.value || 0;
        this.setState({
            category_2_id: newValue,
        }, () => {
            this.propsGetValue();
        });
    }

    //传值给父组件
    propsGetValue() {
        this.props.onGetSelectValue(this.state.category_1_id, this.state.category_2_id);
    }

    //编辑渲染
    componentWillReceiveProps(_props) {
        if (this.props.category_1_id !== _props.category_1_id) {
            this.setState({
                category_1_id: _props.category_1_id
            }, () => {
                this.propsGetValue();
            })

        }
    }

    render() {
        return (
            <div className="col-md-10 category-box">
                <select
                    readOnly={this.props.readOnly}
                    className="form-control category-select"
                    onChange={(e) => this.ChangeCategory_1(e)}
                    value={this.state.category_1_id}
                >
                    <option value="0">请选择一级分类</option>
                    {
                        this.state.category_1_list.map(
                            (item, index) => <option value={item.id} key={index}>{item.name}</option>
                        )
                    }
                </select>
                <select
                    readOnly={this.props.readOnly}
                    className="form-control category-select"
                    onChange={(e) => this.ChangeCategory_2(e)}
                >
                    <option value="0">请选择二级分类</option>
                    {
                        this.state.category_2_list.map(
                            (item, index) => <option value={item.id} key={index}>{item.name}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}
export default CategorySelect;