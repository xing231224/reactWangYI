import React from "react";
import { headerNav } from "../../utils/imgUrl";
import $ from "jquery";
import "./index.scss";

export default class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topOrBottom: false,
      search: false,
      searchVal: "",
      timer: null, // 防抖
      lisTimer: [],
    };
  }

  menu() {
    this.props.menu("profile_show");
  }

  pullDown() {
    let { topOrBottom } = this.state;
    topOrBottom = !topOrBottom;
    this.props.callback(topOrBottom);
    if (!topOrBottom) {
      document.documentElement.scrollTop = 0;
    }
    this.props.pullDown("browse_show");
    this.setState({ topOrBottom });
    $(".searchBtn").toggleClass("opacityHide");
    $(".songList").toggle();
  }
  search() {
    $(".headerNavS").show();
    $(".headerNav").hide();
    $(".headerNavS").addClass("headerNavShow");
    $(".songList").fadeOut();
    $(".searchMen").fadeIn();
    this.animatefn();
  }
  deleteBtn() {
    $(".headerNavS").removeClass("headerNavShow");
    $(".headerNavS").hide();
    $(".headerNav").show();
    $(".songList").fadeIn();
    $(".searchMen").fadeOut();
    this.setState({ searchVal: "" });
    this.removeLi();
    $(".searchList").hide();
  }
  // componentDidMount() {
  //   this.getHotSear();
  // }
  componentWillUnmount() {
    // $ = null;
  }
  animatefn() {
    let { lisTimer } = this.state;
    clearTimeout(lisTimer);
    let lis = document.querySelectorAll(".hotSearch ul li");
    [].slice.call(lis).forEach((item, index) => {
      lisTimer[index] = setTimeout(() => {
        item.className = "animate__animated animate__backInDown";
      }, index * 100);
    });
    this.setState({ lisTimer });
  }
  removeLi() {
    let { lisTimer } = this.state;
    lisTimer.forEach((item) => {
      clearTimeout(item);
    });
    $(".hotSearch ul li").each((index, item) => {
      item.className = "hide";
    });
    this.setState({ lisTimer });
  }

  changeVal(e) {
    let { searchVal, timer } = this.state;
    clearTimeout(timer);
    searchVal = e.target.value;
    timer = setTimeout(() => {
      this.props.searchVal(searchVal);
    }, 500);
    this.setState({ searchVal, timer });
  }
  goBack() {
    console.log(this);
    this.props.bind.props.history.goBack();
  }

  render() {
    let nav;
    let { topOrBottom, searchVal } = this.state;
    let { activeIndex, title } = this.props;
    let opacity = {
      opacity: 0,
    };

    if (activeIndex === 0) {
      return (nav = (
        <div>
          <div className="headerNav">
            <div onClick={() => this.search()} className="flexH searchBtn">
              <img src={headerNav.search} alt="" />
            </div>
            <div className="pullDown" onClick={() => this.pullDown()}>
              <div>{title ? <p>{title}</p> : <p>All&nbsp;Genres</p>}</div>
              <div>
                {topOrBottom ? (
                  <img src={headerNav.arrowTop} alt="" />
                ) : (
                  <img src={headerNav.arrowBottom} alt="" />
                )}
              </div>
            </div>
            <div className="flexH">
              <img style={opacity} src={headerNav.menu} alt="" />
            </div>
          </div>
          <div className="headerNavS">
            <div onClick={() => this.search()} className="flexH">
              <img src={headerNav.search} alt="" />
            </div>
            <div className="inputSearch">
              <input
                onChange={(e) => this.changeVal(e)}
                type="text"
                value={searchVal}
                placeholder="Search for a mix..."
              />
            </div>
            <div className="flexH" onClick={() => this.deleteBtn()}>
              <img src={headerNav.deleteBtn} alt="" />
            </div>
          </div>
        </div>
      ));
    } else if (activeIndex === 4) {
      return (nav = (
        <div className="headerNav">
          <div className="flexH">
            <img style={opacity} src={headerNav.search} alt="" />
          </div>
          <div className="flexH">
            <img src={headerNav.profileTitle} alt="" />
          </div>
          <div className="flexH" onClick={() => this.menu()}>
            <img src={headerNav.menu} alt="" />
          </div>
        </div>
      ));
    } else {
      return (nav = (
        <div className="headerNav">
          <div style={{ width: "10vw" }} onClick={() => this.goBack()}>
            <img src={headerNav.backIcon} alt="" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "18px",
              color: "#fff",
            }}
          >
            <span>{title}</span>
          </div>
          <div style={{ width: "10vw" }}>
            <img src={headerNav.circleList} alt="" />
          </div>
        </div>
      ));
    }
    return <div> {nav} </div>;
  }
}
