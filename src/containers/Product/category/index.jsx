import React from "react";
import {Link} from "react-router-dom";

import Util from "util/util.jsx";
import ProductS from "service/product-service.jsx";
const _product = new ProductS();
const _utl = new Util();

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CategoryList: [],
            categoryId: this.props.match.params.categoryId || 0
        }
    }

    componentDidMount() {
        this.getCategoryList();
    }

    //获取一级分类列表
    getCategoryList() {
        _product.getCategory({
            categoryId: this.state.categoryId
        }).then(res => {
            this.setState({
                CategoryList: res
            });
        }, err => {
            _utl.errorTips(err);
        });
    }

    //获取二级分类列表
    componentDidUpdate(prveprops, prvestate) {
        var oldpath = prveprops.location.pathname, //获取上一次的路径
            newpath = this.props.location.pathname,//获取改变之后的路径
            newId = this.props.match.params.categoryId;
        console.log(oldpath, newpath);
        if (oldpath != newpath) {
            this.setState({
                categoryId: newId
            }, () => {
                this.getCategoryList();
            })
        }
    }

    //修改分类名称
    onUpdateName(categoryId, categoryName) {
        let newName = window.prompt('请输入新的分类名称', categoryName);
        if (newName) {
            _product.setCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                alert(res);
                this.getCategoryList();
            }, err => {
                _utl.errorTips(err);
            });
        }
    }

    render() {
        return (
            <div id="Category">
                <table className="table table-bordered table-hover display">
                    <thead>
                    <tr>
                        <th>品类ID</th>
                        <th>品类名称</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.CategoryList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <a
                                            href="javascript:void(0);"
                                            onClick={e => this.onUpdateName(item.id, item.name)}
                                        >修改名称</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                        {
                                            item.parentId === 0
                                                ?
                                                <Link
                                                    to={`/product-category/index/${item.id}`}
                                                >查看其子品类</Link>
                                                : null
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Category