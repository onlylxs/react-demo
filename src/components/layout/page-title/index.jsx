import React from "react";

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = this.props.title;
    }

    render() {
        return (
            <div className="page-breadcrumb">
                <a href="javascript:;">{this.props.title}</a>
            </div>
        )
    }
}
export default Layout