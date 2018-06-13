import React from "react";

import NavTop from "./nav-top/index.jsx";
import NavSide from "./nav-side/index.jsx";
import PageTitle from "./page-title/index.jsx";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '首页'
        }
    }

    componentDidMount() {
        var ths = this;
        $('#left-content li').click(function () {
            ths.setState({
                title: $(this).find('b').text()
            })
        });
    }

    render() {
        return (
            <div id="warpper">
                <NavTop/>
                <NavSide />
                <div id="right-content">
                    <PageTitle title={this.state.title} />
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Layout