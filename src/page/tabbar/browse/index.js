import React from "react";
import HeaderNav from "../../../components/headerNav";
import { Icon } from "antd-mobile";
import {
  catlist,
  highquality,
  songList,
  searchSong,
  hotSearch,
} from "../../../api/playList";
import { minIcon } from "../../../utils/imgUrl";
import { thousands } from "../../../filter/index";
import { setItem, getItem, removeItem } from "../../../utils/storage";
import store from "../../../store";
import $ from "jquery";
import "./index.scss";
export default class Browse extends React.Component {
  constructor() {
    super();
    this.state = {
      isTop: false,
      isReturnTop: false,
      navTitle: null,
      cateList: [],
      songListHot: [],
      searSongList: [],
      historySear: [],
      hotSearList: [],
      page: 0,
      listQuery: {
        limit: 50,
        offset: 0,
        cat: "全部",
        order: "hot",
      },
      more: true,
    };
  }
  // 子组件传递的参数
  callback = (isTop) => {
    this.setState({ isTop: isTop });
  };
  changePullDown(e) {
    $(".footer").toggleClass("browse_hidden");
    if ($(".mini-play").attr("style")) {
      setTimeout(() => {
        $(".mini-play").toggle();
      }, 500);
    } else {
      $(".mini-play").toggle();
    }

    $(".pullDown_z").toggleClass("browse_show");
    $(".headerNav").toggleClass("browse_top");
  }
  changeSearch(e) {
    let { searSongList } = this.state;
    searSongList = [];
    if (!e) {
      $(".searchMen").show();
      $(".searchList").hide();
      this.setState({ searSongList });
      return;
    }
    $(".searchMen").hide();
    $(".searchList").show();
    this.setState({ searSongList }, () => {
      searchSong({ keywords: e }).then((res) => {
        searSongList = res.data ? res.data.result.songs : [];
        this.setState({ searSongList });
      });
    });
  }
  componentWillMount() {
    let { historySear } = this.state;
    historySear = getItem("historySear")
      ? JSON.parse(getItem("historySear"))
      : [];
    this.setState({ historySear });
    this.getCatList();
    this.getHighQuality(this.state.page);
    this.pullDownLoad();
    this.getHotSear();
    // songList().then(res=>{
    //   console.log(res);
    // })
  }
  componentDidMount() {}
  // 歌单 ( 网友精选碟 )
  getHighQuality() {
    let { songListHot, listQuery, page, more } = this.state;
    listQuery.offset = listQuery.limit * page;
    songList(listQuery)
      .then((res) => {
        if (res.data.code === 200) {
          more = res.data.more;
          songListHot = songListHot.concat(res.data.playlists);
          this.setState({ songListHot, more });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  // 获取分类
  getCatList() {
    let { cateList } = this.state;
    catlist().then((res) => {
      res.data.sub.forEach((item) => {
        cateList.push(item);
      });
      this.setState({ cateList });
    });
  }
  // 实现下拉加载
  pullDownLoad() {
    window.onscroll = () => {
      let attrNone = $(".songList").attr("style") ? true : false;
      let { listQuery, page, more, isTop } = this.state;
      // 变量 scrollHeight 是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // 变量 windowHeight 是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 变量scrollTop为当前页面的滚动条纵坐标位置
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 滚动条到底部得距离 = 滚动条的总高度 - 可视区的高度 - 当前页面的滚动条纵坐标位置
      var scrollBottom = scrollHeight - windowHeight - scrollTop;
      if (scrollTop >= windowHeight * 3) {
        this.setState({ isReturnTop: true });
      } else {
        this.setState({ isReturnTop: false });
      }
      if (scrollBottom === 0 && more && !isTop && !attrNone) {
        page++;
        this.setState({ page });
        this.getHighQuality();
      }
    };
  }
  componentWillUnmount() {
    window.onscroll = null;
  }
  init(cat) {
    let { songListHot, listQuery, page, more } = this.state;
    listQuery = {
      limit: 50,
      offset: 0,
      cat,
      order: "hot",
    };
    page = 0;
    more = true;
    songListHot = [];
    this.setState({ songListHot, listQuery, page, more }, () => {
      this.getHighQuality();
    });
  }
  cateName(item) {
    this.init(item.name);
    this.setState({ navTitle: item.name });
    // 调用子组件的方法
    this.changePullDown();
    this.setState({ isTop: true });
    $(".searchBtn").toggleClass("opacityHide");
    $(".songList").toggle();
    document.documentElement.scrollTop = 0;
  }
  // 搜索歌曲
  searchSongFn(item) {
    let { historySear } = this.state;
    if (historySear.length >= 10) {
      historySear.pop();
    }
    if (!historySear.find((i) => i === item.name)) {
      historySear.unshift(item.name);
      setItem("historySear", JSON.stringify(historySear));
      this.setState({ historySear });
    }
    this.goSongList(item.id);
  }
  addSongList(id) {
    let arrList = store.state.playList;
    arrList.forEach((item, index) => {
      if (item == id) return arrList.splice(index, 1);
    });
    if (arrList.length >= 5) {
      arrList.pop();
    }
    arrList.push(id);
    store.dispatcher.dispatch({
      type: "getPlayList",
      list: arrList,
    });
  }
  goSongList(item) {
    console.log(item);
  }
  // 清空历史
  historyClear() {
    let { historySear } = this.state;
    historySear = [];
    removeItem("historySear");
    this.setState({ historySear });
  }
  songListFn(item) {
    this.props.history.push("/songlist?id=" + item.id);
  }
  getHotSear() {
    let { hotSearList } = this.state;
    hotSearch().then((res) => {
      res.data.data.forEach((item) => {
        hotSearList.push(item);
      });
    });
    this.setState({ hotSearList });
  }

  render() {
    let {
      cateList = [],
      songListHot = [],
      isReturnTop,
      navTitle,
      searSongList = [],
      historySear = [],
      hotSearList = [],
    } = this.state;
    return (
      <div className="browse">
        <HeaderNav
          activeIndex={0}
          pullDown={(e) => this.changePullDown(e)}
          callback={this.callback}
          searchVal={(e) => this.changeSearch(e)}
          title={navTitle}
        />
        <div className="pullDown_z">
          {cateList.map((item) => (
            <p onClick={() => this.cateName(item)} key={item.name}>
              {item.name}
            </p>
          ))}
        </div>
        <div className="songList">
          <ul>
            {songListHot.map((item, index) => {
              return index % 2 === 0 ? (
                <li key={index} onClick={() => this.songListFn(item)}>
                  <div className="rightSong" style={{ color: "#fff" }}>
                    <div className="avatarUrl">
                      <img
                        className="avatarUrlImg"
                        src={item.creator.avatarUrl}
                        alt=""
                      />
                      <div className="like">
                        <img src={minIcon.noLikeBtn} alt="" />
                      </div>
                    </div>
                    <p
                      className="textName"
                      style={{ fontWeight: "bold", flex: "1" }}
                    >
                      {item.name}
                    </p>
                    <span
                      style={
                        index % 3 === 0
                          ? { fontSize: "14px" }
                          : { color: "#fff", fontSize: "14px" }
                      }
                    >
                      {thousands(item.playCount)}
                    </span>
                  </div>
                  <div className="leftSong">
                    <img src={item.coverImgUrl} alt="" />
                  </div>
                </li>
              ) : (
                <li key={index} onClick={() => this.songListFn(item)}>
                  <div className="leftSong">
                    <img src={item.coverImgUrl} alt="" />
                  </div>
                  <div className="rightSong">
                    <div className="avatarUrl">
                      <img
                        className="avatarUrlImg"
                        src={item.creator.avatarUrl}
                        alt=""
                      />
                      <div className="like">
                        <img src={minIcon.noLikeBtn} alt="" />
                      </div>
                    </div>
                    <p
                      className="textName"
                      style={{ fontWeight: "bold", flex: "1" }}
                    >
                      {item.name}
                    </p>
                    <span style={{ fontSize: "14px" }}>
                      {thousands(item.playCount)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="searchMen">
          <div className="history">
            <span className="frist_s">历史</span>
            <ul>
              {historySear.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
            <span className="last_s" onClick={() => this.historyClear()}>
              清空
            </span>
          </div>
          <div className="hotSearch">
            <h3>热门搜索</h3>
            <ul>
              {hotSearList.map((item, index) => {
                return (
                  <li
                    className="hide"
                    key={item.score}
                    onClick={() => this.goSongList(item)}
                  >
                    {item.searchWord}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div
          className="searchList"
          style={{
            height: searSongList.length > 15 ? "100%" : "90vh",
            display: searSongList.length === 0 ? "none" : "block",
          }}
        >
          {searSongList.map((item) => {
            return (
              <p key={item.id} onClick={() => this.searchSongFn(item)}>
                {" "}
                <Icon
                  type="search"
                  style={{ verticalAlign: "middle" }}
                  size="xxs"
                />{" "}
                <span style={{ verticalAlign: "middle" }}>{item.name}</span>
              </p>
            );
          })}
        </div>
        {isReturnTop ? (
          <div
            className="backTop"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={minIcon.returnTop} alt="" />
          </div>
        ) : null}
      </div>
    );
  }
}
