import React from "react";
import ReactDOM from "react-dom";

import RouterMap from "@/router/index.jsx";
//导入css
import "./static/css/index.less";
//导入组件


ReactDOM.render(
    <RouterMap/>,
    document.getElementById('app')
);