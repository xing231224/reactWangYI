import { loading } from "../../utils/imgUrl";
import "./index.scss"


const React = require("react");


/**
 * CardList组件内容
 * @param title 组件标题
 * @param extra 描述
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @returns {*}
 * @constructor
*/
export default class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    goRoute(status) {
        this.props.history.push("/index/" + status)
    }
    render() {

        const { isShow } = this.props
        return (
            <div className="loading">
                {
                    isShow ? (
                        <div className="loadingBg">
                            <img className="imgWH" src={loading.loadingImg} alt="" />
                            <div className="loadingIcon">
                                <img src={loading.loadingIcon} alt="" />
                                <img src={loading.loadingFont} alt="" />
                            </div>
                        </div>
                    ) : (<div className="loadingBg">
                        <img className="imgWH" src={loading.loadOverImg} alt="" />
                        <div className="loadOverBtn">
                            <img onClick={() => { this.goRoute(1) }} src={loading.loadOverBtn1} alt="" />
                            <img onClick={() => { this.goRoute(2) }} src={loading.loadOverBtn2} alt="" />
                            <img src={loading.loadOverFont} alt="" />
                        </div>
                    </div>)
                }


            </div>
        )
    }
}