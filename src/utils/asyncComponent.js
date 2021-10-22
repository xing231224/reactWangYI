/*
 * @Author: your name
 * @Date: 2021-07-08 12:02:39
 * @LastEditTime: 2021-09-28 15:31:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\utils\asyncComponent.js
 */
// 路由懒加载
const React = require("react");
export const asyncComponent = (fn) => {
    return class MyComponent extends React.Component {
        constructor() {
            super()
            this.state = {
                C: null
            }
        }
        componentDidMount() {
            fn().then(mod => {
                this.setState({
                    C: mod.default
                })
            })
        }
        render() {
            let { C } = this.state

            return (
                <div>
                    {C ? <C {...this.props} ></C> : null}
                </div>
            )
        }
    }
}