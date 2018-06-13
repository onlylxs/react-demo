import React from "react";
import {Link} from "react-router-dom";
import Pagination from "@/components/pagination/index.jsx";
import Search from "./search.jsx";


import Util from "util/util.jsx";
import ProductS from "service/product-service.jsx";
const _product = new ProductS();
const _utl = new Util();

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 10,
            listType: 'list'
        }
    }

    componentDidMount() {
        this.loadProductList();
    }


    //获取商品列表
    loadProductList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        listParam[this.state.searchType] = this.state.searchKeyword;
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, err => {
            this.setState({
                list: []
            });
            _utl.errorTips(err);
        });
    }

    onSearch(Type, Keyword) {
        let listType = Keyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: Type,
            searchKeyword: Keyword
        }, () => {
            this.loadProductList();
        })
    }


    //更变状态
    onChangeStatus(e, productId, status) {
        let newStatus = status == 1 ? 2 : 1;
        _product.setSaleStatus({
            "productId": productId,
            "status": newStatus
        }).then(res => {
            alert(res);
            this.loadProductList();
        }, err => {
            _utl.errorTips(err);
        });
    }

    //改变页码
    onChangePageNum(pageNum, pageSize) {
        this.setState({
            pageNum: pageNum,
            pageSize: pageSize
        }, () => {
            this.loadProductList();
        });
    }


    render() {
        return (
            <div id="Product">
                <Search onSearch={(Type, Keyword) => this.onSearch(Type, Keyword)}/>
                <Link to='/product/edit' style={{float:'right',marginTop:'-50px'}}>
                    <button className="btn btn-primary"><i className="fa fa-plus"/> 添加商品</button>
                </Link>
                <table className="table table-bordered table-hover display" id="productT">
                    <thead>
                    <tr>
                        <th className="th1">id</th>
                        <th className="th2">信息</th>
                        <th className="th3">价格</th>
                        <th className="th4">状态</th>
                        <th className="th5">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td style={{textAlign: "left"}}>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? '在售' : '已下架'}</p>
                                        <button
                                            onClick={(e, productId, status) => this.onChangeStatus(e, product.id, product.status)}>
                                            {product.status == 1 ? '下架' : '上架'}
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/product/detail/${product.id}`}>查看</Link>
                                        <Link to={`/product/edit/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <Pagination
                    current={this.state.pageNum}
                    pageSize={this.state.pageSize}
                    total={this.state.total}
                    onChange={(pageNum, pageSize) => this.onChangePageNum(pageNum, pageSize)}
                    showTotal={(total, range) => `${range[0]} - ${range[1]} 条，共 ${total} 条数据`}
                />
            </div>
        );
    }
}
export default Product