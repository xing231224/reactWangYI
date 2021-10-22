import React from "react";
import { tabbar } from "../../utils/imgUrl";
import { withRouter } from "react-router-dom";
// import querystring from "querystring";
import "./index.scss";

class Tabbar extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }
  navRoute(index, path) {
    this.setState({
      activeIndex: index,
    });
    this.props.history.push(path);
  }
  componentDidMount() {
    // let activeIndex = querystring.parse(this.props.history.location.search.slice(1)).activeIndex
    // this.setState({
    //     activeIndex
    // })
    let pathname = this.props.location.pathname;
    switch (pathname) {
      case "/index/browse":
        this.setState({ activeIndex: 0 });
        break;
      case "/index/discover":
        this.setState({ activeIndex: 1 });
        break;
      case "/index/store":
        this.setState({ activeIndex: 2 });
        break;
      case "/index/library":
        this.setState({ activeIndex: 3 });
        break;
      case "/index/profile":
        this.setState({ activeIndex: 4 });
        break;
      default:
        let { activeIndex } = this.props;
        if (activeIndex !== "") return this.setState({ activeIndex });
        break;
    }
  }

  render() {
    return (
      <div className="footer">
        {tabbar.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => this.navRoute(item.id, item.path)}
            >
              {this.state.activeIndex === item.id ? (
                <img src={item.imgActive} alt="" />
              ) : (
                <img src={item.img} alt="" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
export default withRouter(Tabbar);
