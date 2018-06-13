import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="error">
                出错了，找不到改路径！<br />
                <Link to="/">点我回到首页</Link>
            </div>
        );
    }
}
export default Home