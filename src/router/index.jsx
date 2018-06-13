import React from "react";
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
//引入组件
import Home from "@/containers/Home/index.jsx";
import Login from "@/containers/Login/index.jsx";
import Order from "@/containers/Order/index.jsx";
import OrderDetail from "@/containers/Order/detail.jsx";
import ErrorPage from "@/containers/Error/index.jsx";
import User from "@/containers/User/index.jsx";
import ProductReuter from "@/containers/Product/index.jsx";
import Layout from "@/components/layout/index.jsx";


class RouterMap extends React.Component {

    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/order/index" component={Order}/>
                    <Route path="/order/detail/:id?" component={OrderDetail}/>
                    <Redirect exact from="/order" to="/order/index"/>
                    <Route path="/user" component={User}/>
                    <Route path="/product" component={ProductReuter}/>
                    <Route path="/product-category" component={ProductReuter}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={props => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}

export default RouterMap


