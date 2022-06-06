import React from "react";
import "./index.scss";
import isLogin from "../../../utils/isLogin";
import store from "../../../store";
import {
  userSubcountInfo,
  userDetail,
  userLikeList,
  getMusic,
  getSongDetail,
  checkMusic,
} from "../../../api/user";
import { getItem } from "../../../utils/storage";
import HeaderNav from "../../../components/headerNav";
import { playIcon } from "../../../utils/imgUrl";
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      likeList: [],
      isPlay: false,
      flag: false,
      refs: "",
      tab: 0,
    };
  }

  componentWillMount() {
    let userInfo = JSON.parse(getItem("userInfo")) || "";
    if (userInfo === "") return isLogin(this);
    this.setState({ userInfo });
    // this.getLikeMusic(userInfo);

    // userDetail(userInfo.userId).then(res => {
    //     console.log(res);
    // })

    // userSubcountInfo().then(res => {
    //     console.log(res);
    // })
  }

  getLikeMusic(userInfo) {
    // 获取喜欢的音乐
    let likeList = [];
    userLikeList(userInfo.userId).then(async (respone) => {
      let id = respone.data.ids.join(",");
      // 获取音乐详情
      let musicDetail = await (await getSongDetail(id)).data;
      let musicUrl = await (await getMusic(id)).data;
      // let musicCheck = await (await checkMusic(id)).data;
      Promise.all([musicDetail, musicUrl]).then((res) => {
        // console.log(res);
        for (let i = 0; i < res[0].songs.length; i++) {
          likeList[i] = {
            likeId: respone.data.ids[i],
            id: "audio" + i,
            privileges: res[0].privileges[i],
            al: res[0].songs[i].al,
            ar: res[0].songs[i].ar,
            url: res[1].data[i].url,
            isPlay: false,
          };
        }
        store.dispatcher.dispatch({ type: "getlist", list: likeList });
        this.setState({ likeList });
      });
    });
  }
  paly(ref, item) {
    // console.log(item);
    let { isPlay, refs } = this.state;
    if (isPlay || refs !== ref) {
      this.isPlayFun(ref, true);
      isPlay = false;
    } else {
      this.isPlayFun(ref, false);
      isPlay = true;
    }
    this.setState({ isPlay, refs: ref });
  }
  // 改变状态
  isPlayFun(ref = "", status) {
    let { likeList } = this.state;
    likeList.forEach((item) => {
      item.isPlay = false;
      if (item.id === ref) {
        item.isPlay = status;
      }
      if (item.isPlay) {
        this.refs[item.id].play();
      } else {
        this.refs[item.id].load();
      }
    });
    this.setState({ likeList });
  }
  goPlayMusic(id) {
    this.props.history.push("/play?id=" + id);
  }
  changeTab(tab) {
    this.setState({ tab });
  }
  changeMenu(e) {
    document.querySelector(".profile").className += " " + e;
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "0px";
    document.body.style.width = "100%";
  }

  render() {
    let { userInfo, likeList, tab } = this.state;
    const userBg = {
      backgroundImage: `url(${userInfo.backgroundUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // filter: "blur(15px)"
    };
    const activePlay = {
      borderRadius: " 20px",
      boxShadow: "0px 0px 10px #666",
      border: " 0",
    };
    let title = "";
    if (tab === 0) {
      title = <span>followers</span>;
    } else if (tab === 1) {
      title = <span>following</span>;
    } else {
      title = <span>Playlists</span>;
    }
    return (
      <div>
        <div className="userHeader" style={userBg}>
          <HeaderNav activeIndex={4} menu={(e) => this.changeMenu(e)} />
          <img className="img" src={userInfo.avatarUrl} alt="" />
          <p>{userInfo.nickname}</p>
          <p className="signature">{userInfo.signature}</p>
          <div className="following">
            <div onClick={() => this.changeTab(0)}>
              <span>{likeList.length}</span>
              <span>followers</span>
            </div>
            <div onClick={() => this.changeTab(1)}>
              <span>49</span>
              <span>following</span>
            </div>
            <div onClick={() => this.changeTab(2)}>
              <span>24</span>
              <span>Playlists</span>
            </div>
          </div>
          <div className="follow">{title}</div>
        </div>
        <div className="list">
          <ul>
            {likeList.map((item) => {
              return (
                <li
                  onClick={() => this.goPlayMusic(item.likeId)}
                  style={item.isPlay ? activePlay : null}
                  key={item.id}
                >
                  <div
                    onClick={() => {
                      this.paly(item.id, item);
                    }}
                  >
                    {" "}
                    {item.isPlay ? (
                      <img src={playIcon.playBtn} alt="" />
                    ) : (
                      <img src={playIcon.pauseBtn} alt="" />
                    )}
                    <audio ref={item.id} src={item.url}></audio>
                  </div>
                  <div>
                    <span>{item.al.name}</span>
                    <span>
                      {item.ar.map((i) => {
                        return "  " + i.name;
                      })}
                    </span>
                  </div>
                  <div>2h30m</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="profile">
          <p>Report User</p>
          <p>Share Profile</p>
          <p
            onClick={() => {
              document.querySelector(".profile").className = "profile";
              document.documentElement.style.overflow = "scroll";
              document.body.style.position = "static";
            }}
          >
            Cancel
          </p>
        </div>
      </div>
    );
  }
}
