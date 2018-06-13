class Util {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: param.url,
                type: param.get || 'POST',
                data: param.data || null,
                dateType: param.dateType || "JSON",
                success: (res) => {
                    if (res.status == 0) {
                        typeof resolve === "function" && resolve(res.data, res.msg)
                    } else if (res.status == 10) {
                        this.doLogin();
                    } else {
                        typeof reject === "function" && reject(res.msg || res.data)
                    }
                },
                error: (res) => {
                    typeof reject === "function" && reject(res.statusText);
                },
            });
        });
    }

    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    // 获取URL参数
    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    errorTips(errMsg) {
        alert(errMsg);
    }

    setStorage(name, value) {
        let dataType = typeof value;
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(value));
        } else if (['number', 'string', 'boolean'].indexOf(dataType)) {
            window.localStorage.setItem(name, value);
        } else {
            alert('该类型不支持本地存储')
        }
    }

    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return '';
        }
    }

    removeStorage(name) {
        window.localStorage.removeItem(name);
    }

    //退出登录
    logout() {
        return this.request({
            url: '/user/logout.do',
        })
    }

}
export default Util;