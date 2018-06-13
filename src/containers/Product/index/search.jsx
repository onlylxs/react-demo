import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'productName', //productId / productName
            searchKeyword: ''
        }
    }

    onChangeValue(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    //查询
    onSearch() {
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }

    onSearchKeyUp(e) {
        if (e.keyCode == 13) {
            this.onSearch();
        }
    }

    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select
                                className="form-control"
                                onChange={e => this.onChangeValue(e)}
                                name="searchType">
                                <option value="productName">按商品名称查询</option>
                                <option value="productId">按商品ID查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="关键词"
                                onKeyUp={e => this.onSearchKeyUp(e)}
                                onChange={e => this.onChangeValue(e)}
                                name="searchKeyword"/>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.onSearch()}>
                            搜索
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;