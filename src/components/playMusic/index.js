import React from "react";
import "./index.scss";
import $ from "jquery";
import {
  getMusic,
  getSongDetail,
  userLikeList,
  getMusicLyric,
  checkMusic,
} from "../../api/user";
import { headerNav } from "../../utils/imgUrl";
import { timeFormat } from "../../filter";
import { getItem } from "../../utils/storage";
import isLogin from "../../utils/isLogin";
import { withRouter } from "react-router-dom";
import store from "../../store";
import { Toast } from "antd-mobile";
import "../../utils/yinhua";
class PlayMusic extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      likeIds: [],
      likeId: null,
      playIng: [],
      list: {},
      audioPlay: false,
      audio: {
        duration: 0, //总时长
        currentTime: 0, //当前播放时长
        distance: 95, //歌词距离
        num: 0, // 个数
      },
      bottom: 0, // 距离底部的距离
      display: null,
    };
  }
  componentWillMount() {
    let userInfo = JSON.parse(getItem("userInfo")) || "";
    if (userInfo === "") return isLogin(this);
    this.setState({ userInfo }, () => {
      this.getUserLike();
    });

    // let likeId =
    //   querystring.parse(this.props.history.location.search.slice(1)).id || "";
    // this.setState({ likeId }, () => {
    //   this.getMusicList(this.state.likeId);
    // });
  }
  componentDidMount() {
    this.drawAudioPlay();
    this.drawAudioArc();
    let { audioPlay } = this.state;
    store.state.on("change", () => {
      // this.playOrPaused();
      audioPlay = true;
      let len = store.state.playList.length;
      this.getMusicList(store.state.playList[len - 1]);
      this.setState({ audioPlay }, () => {
        setTimeout(() => {
          this.playOrPaused();
        }, 500);
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    let { bottom, display } = this.state;
    // 沉底
    let routeStr = "songlist";
    // 消失
    let routeHide = "login/loading";
    let flag = routeStr
      .split("/")
      .map((item) => (item = "/" + item))
      .includes(nextProps.location.pathname);
    let flagHide = routeHide
      .split("/")
      .map((item) => (item = "/" + item))
      .includes(nextProps.location.pathname);
    bottom = flag ? 0 : "62px";
    display = flagHide ? "none" : "block";
    this.setState({ bottom, display });
  }
  //获取用户的喜欢音乐id
  getUserLike() {
    let { userInfo, likeIds } = this.state;
    userLikeList(userInfo.userId).then((res) => {
      res.data.ids.forEach((item) => {
        likeIds.push(item);
      });
      this.setState({ likeIds }, () => {
        this.getMusicList(likeIds[0]);
      });
    });
  }

  getMusicList(id) {
    this.setState({ list: {} }, async () => {
      // 获取喜欢的音乐
      // 获取音乐详情
      // 获取歌词
      let list = {};
      let musicDetail = await (await getSongDetail(id)).data;
      let musicUrl = await (await getMusic(id)).data;
      let musicLyric = await (await getMusicLyric(id)).data;
      let musicCheck = await (await checkMusic(id)).data;
      Promise.all([musicDetail, musicUrl, musicLyric, musicCheck]).then(
        (res) => {
          if (!res[3]) return Toast.fail("暂时无法播放！！！");
          list = {
            songs: res[0].songs[0],
            privileges: res[0].privileges[0],
            data: res[1].data[0],
            lrc: res[2].lrc.lyric,
          };
          list.lrc = this.parsingLyrics(list.lrc);
          this.setState({ list });
        }
      );
    });
  }
  // 解析歌词
  parsingLyrics(lrc) {
    var oLRC = {
      ti: "", //歌曲名
      ar: "", //演唱者
      al: "", //专辑名
      by: "", //歌词制作人
      offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
      ms: [], //歌词数组{t:时间,c:歌词}
    };
    if (lrc.length == 0) return;
    var lrcs = lrc.split("\n"); //用回车拆分成数组
    for (var i in lrcs) {
      //遍历歌词数组
      lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
      var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
      var s = t.split(":"); //分离:前后文字
      if (isNaN(parseInt(s[0]))) {
        //不是数值
        for (var i in oLRC) {
          if (i != "ms" && i == s[0].toLowerCase()) {
            oLRC[i] = s[1];
          }
        }
      } else {
        //是数值
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (var k in arr) {
          start += arr[k].length; //计算歌词位置
        }
        var content = lrcs[i].substring(start); //获取歌词内容
        for (var k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          var s = t.split(":"); //分离:前后文字
          oLRC.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content,
          });
        }
      }
    }
    oLRC.ms.sort(function (a, b) {
      //按时间顺序排序
      return a.t - b.t;
    });
    return oLRC.ms;
  }
  // 打开播放器
  openPlay() {
    $("#audio")
      .removeClass()
      .addClass("animate__animated animate__fadeInUpBig show addbackBlur");
    setTimeout(() => {
      $(".browse").hide();
    }, 1000);
    setTimeout(() => {
      $(".footer").hide();
    }, 500);
  }
  // 关闭播放器
  closePlay() {
    $("#audio")
      .removeClass()
      .addClass("animate__animated animate__fadeOutDownBig hide");
    $(".browse").show();
    $(".footer").show();
  }
  playOrPaused(e) {
    if (e) {
      e.stopPropagation();
    }
    let { audioPlay } = this.state;
    let audio = this.refs["audio"];
    if (audio.paused || audio.ended) {
      audioPlay = true;
      audio.play();
      $(".audio-btn-play")
        .removeClass("audio-btn-play-off")
        .addClass("audio-btn-play-on");
    } else {
      audioPlay = false;
      $(".audio-btn-play")
        .removeClass("audio-btn-play-on")
        .addClass("audio-btn-play-off");
      audio.pause();
    }
    $("#audio-img-canvas-play").toggleClass("audio-img-canvas-play-on");
    $("#audio-img-canvas").toggleClass("audio-img-canvas-on");
    this.setState({ audioPlay });
  }
  // 初始化播放器
  initPlay() {
    let audio = this.refs["audio"];
    $(".audio-by-now").width("0");
    $("#audio-img-canvas-play").removeClass("audio-img-canvas-play-on");
    $("#audio-img-canvas").removeClass("audio-img-canvas-on");
    $(".audio-btn-play")
      .removeClass("audio-btn-play-on")
      .addClass("audio-btn-play-off");
    audio.pause();
    this.setState({
      audio: {
        currentTime: 0,
        duration: audio.duration,
      },
    });
  }

  onTimeUpdate(e) {
    let { list } = this.state;
    let { currentTime, duration, num = 0, distance } = this.state.audio;
    const audio = e.target;
    num = 0;
    distance = 95;
    (list.lrc ? list.lrc : []).forEach((item, index) => {
      if (item.t < currentTime) {
        num++;
        return;
      }
    });
    distance = distance - num * 30;
    // let allWidth = $(".audio-by-all").width();
    let width = (currentTime / duration) * 100;
    $(".aplayer-played").width(width + "%");
    if (audio.ended) {
      this.initPlay();
      return;
    }
    this.setState({
      audio: {
        ...this.state.audio,
        currentTime: audio.currentTime,
        num,
        distance,
      },
    });
  }
  drawAudioArc() {
    var audioCanvas = document.getElementById("audio-img-canvas");
    var audioCtx = audioCanvas.getContext("2d");
    audioCtx.translate(150, 150);
    audioCtx.strokeStyle = "rgba(255,255,255,1)";
    audioCtx.lineWidth = "6";
    audioCtx.arc(0, 0, 100, 0, Math.PI * 2, true);
    audioCtx.stroke();
    audioCtx.beginPath();
    audioCtx.lineWidth = "3";
    audioCtx.arc(0, 0, 80, Math.PI / 6, (Math.PI / 6) * 4, false);
    audioCtx.stroke();
    audioCtx.beginPath();
    audioCtx.arc(0, 0, 80, (Math.PI / 6) * 9, (Math.PI / 6) * 6, true);
    audioCtx.stroke();
    audioCtx.beginPath();
    audioCtx.lineWidth = "2";
    audioCtx.arc(0, 0, 60, (Math.PI / 6) * 9, (Math.PI / 6) * 11, true);
    audioCtx.stroke();
  }
  drawAudioPlay() {
    var audioCanvasPlay = document.getElementById("audio-img-canvas-play");
    var audioCtxPlay = audioCanvasPlay.getContext("2d");
    audioCtxPlay.translate(25, 10);
    audioCtxPlay.lineWidth = "4";
    audioCtxPlay.strokeStyle = "rgba(255,255,255,1)";
    audioCtxPlay.rect(-10, 0, 20, 20);
    audioCtxPlay.stroke();
    audioCtxPlay.beginPath();
    audioCtxPlay.rect(-10, 20, 20, 10);
    audioCtxPlay.stroke();
    audioCtxPlay.beginPath();
    audioCtxPlay.moveTo(0, 30);
    audioCtxPlay.lineTo(0, 220);
    audioCtxPlay.stroke();
    audioCtxPlay.beginPath();
    audioCtxPlay.translate(0, 220);
    audioCtxPlay.rotate(120);
    audioCtxPlay.rect(0, 0, 22, 36);
    audioCtxPlay.stroke();
    audioCtxPlay.beginPath();
    audioCtxPlay.lineWidth = "2";
    audioCtxPlay.moveTo(10, 25);
    audioCtxPlay.lineTo(30, 25);
    audioCtxPlay.stroke();
    audioCtxPlay.beginPath();
  }
  render() {
    let { list, audio, bottom, display } = this.state;
    const musicImgUrl = {
      background: `url(${
        list.songs ? list.songs.al.picUrl : null
      }) center center / 100px 100px no-repeat`,
    };
    const lryStyle = {};
    return (
      <div>
        <div
          className="mini-play"
          style={{ bottom, display }}
          onClick={() => this.openPlay()}
        >
          {/* {playIng.map((item) => {
            return ( */}
          <div className="mini-audio">
            <div className="mini-img">
              <img src={list.songs ? list.songs.al.picUrl : null} alt="" />
            </div>
            <div className="mini-text">
              <div>
                {list.songs
                  ? list.songs.ar.map((item) => {
                      return <span key={item.id}>{item.name}&nbsp;&nbsp;</span>;
                    })
                  : null}
              </div>
            </div>
            <div className="mini-ico">
              <div
                onClick={(e) => this.playOrPaused(e)}
                className="audio-btn-play audio-btn-play-off"
              ></div>
            </div>
          </div>
          {/* ); */}
          {/* })} */}
        </div>
        <div
          id="audio"
          className="audio audio-html"
          style={{
            backgroundImage: `url(${list.songs ? list.songs.al.picUrl : null})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <audio
            ref="audio"
            id="audio-my"
            onCanPlay={() => this.initPlay()}
            onTimeUpdate={(e) => this.onTimeUpdate(e)}
            autoPlay={true}
            src={list.songs ? list.data.url : null}
            preload="metadata"
          ></audio>
          <div className="audio-head">
            <div className="pullIco">
              <img
                src={headerNav.arrowBottom}
                onClick={() => this.closePlay()}
                alt=""
              />
            </div>
            <div className="audio-head-tittle audio-head-tittle-off">
              <div className="audio-head-tittle-text">
                {list.songs ? list.songs.name : null}
              </div>
            </div>
            <div className="audio-head-tittle-by audio-head-tittle-by-off">
              {list.songs
                ? list.songs.ar.map((item) => {
                    return <span key={item.id}>{item.name}&nbsp;&nbsp;</span>;
                  })
                : null}
            </div>
            {/* <div className="audio-play-list">
      <div className="audio-play-list-all">
        <span className="play-list-all">忆少年</span>
        <span className="play-list-all play-list-all-now">年少有为</span>
        <span className="play-list-all">Lemon</span>
        <span className="play-list-all">渐渐</span>
        <span className="addSonBtn"></span>
      </div>
    </div> */}
          </div>
          <div className="add"></div>
          <div className="min-time min-time-off"></div>
          <div className="audio-img">
            <canvas id="audio-img-canvas" width="300px" height="300px"></canvas>
            <div className="audio-img-cover" style={musicImgUrl}></div>
            <canvas
              id="audio-img-canvas-play"
              className="audio-img-canvas-play-off"
              width="60px"
              height="300px"
            ></canvas>
          </div>
          <div className="audio-songLry">
            <div
              style={{
                transform: " translateY(" + audio.distance + "px)",
                transition: "all .5s",
              }}
            >
              {list.lrc
                ? list.lrc.map((item, index) => {
                    return (
                      <p
                        style={
                          audio.num - 1 === index
                            ? { opacity: "1", fontSize: "16px" }
                            : { fontSize: "12px" }
                        }
                        key={index}
                      >
                        {" "}
                        {item.c}{" "}
                      </p>
                    );
                  })
                : null}
            </div>
          </div>

          <div className="audio-by">
            <span className="audio-by-text-now">
              {audio.currentTime ? timeFormat(audio.currentTime) : "00:00"}
            </span>
            <div className="audio-by-all">
              {/* <span className="audio-by-now"></span> */}
              <div className="aplayer-bar-wrap">
                <div className="aplayer-bar">
                  <div
                    className="aplayer-loaded"
                    style={{ width: "100%" }}
                  ></div>
                  <div className="aplayer-played">
                    <span className="aplayer-thumb"></span>
                  </div>
                </div>
              </div>
            </div>
            <span className="audio-by-text-all">
              {timeFormat(audio.duration)}
            </span>
          </div>
          <div className="audio-btn">
            <div className="audio-btn-list audio-btn-list-off"></div>
            <div className="audio-btn-before"></div>
            <div
              onClick={() => this.playOrPaused()}
              className="audio-btn-play audio-btn-play-off"
            ></div>
            <div className="audio-btn-next"></div>
            <div className="audio-btn-sound"></div>
          </div>
          <div className="audio-sound">
            <div className="audio-sound-all">
              <span className="audio-sound-now"></span>
              <span className="audio-sound-art"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(PlayMusic);
