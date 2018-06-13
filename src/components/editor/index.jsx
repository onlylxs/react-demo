import React from "react";
import Simditor from "simditor";
import "simditor/styles/simditor.css";


//通用富文本编辑器
class Editor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadEditor();
    }

    //加载富文本插件
    loadEditor() {
        let element = this.refs['editor'];
        this.editor = new Simditor({
            textarea: $(element),
            placeholder: '请输入内容',
            cleanPaste: true,
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                fileKey: 'upload_file',
                connectionCount: 5
            }
        });
        this.bindEditorEvent();
    }

    //初始化富文本的事件
    bindEditorEvent() {
        this.editor.on('valuechanged', (e, src) => {
            //获取富文本的值传到父组件事件（调用必须有onEditorValue方法）
            this.props.onEditorValue(this.editor.getValue())
        })
    }
    //编辑渲染
    componentWillReceiveProps(_props) {
        if (this.props.defaultDetail !== _props.defaultDetail) {
            this.editor.setValue(_props.defaultDetail);
        }
    }

    render() {
        return (
            <div className="editor">
                <textarea ref="editor"/>
            </div>
        )
    }
}
export default Editor