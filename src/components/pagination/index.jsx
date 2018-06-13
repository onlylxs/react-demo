import React from "react";
import RCPagination from "rc-pagination";
import "rc-pagination/dist/rc-pagination.css";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pagination-box">
                <RCPagination {...this.props}
                            hideOnSinglePage
                            showQuickJumper
                />
            </div>
        )
    }
}
export default Pagination