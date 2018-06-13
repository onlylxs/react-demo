import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
//引入组件
import ProductList from "./index/index.jsx";
import ProductEdit from "./index/edit.jsx";
import ProductDetail from "./index/detail.jsx";
import CategoryList from "./category/index.jsx";


class ProductReuter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/edit/:pid?" component={ProductEdit}/>
                <Route path="/product/detail/:pid?" component={ProductDetail}/>
                <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Redirect exact from="/product-category" to="/product-category/index"/>
            </Switch>
        )
    }
}
export default ProductReuter


