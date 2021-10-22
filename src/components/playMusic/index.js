import React from "react";
import "./index.scss";
import $ from "jquery";
import { getMusic, getSongDetail, userLikeList } from "../../api/user";
import { headerNav } from "../../utils/imgUrl";
import { timeFormat } from "../../filter";
import { getItem } from "../../utils/storage";
import isLogin from "../../utils/isLogin";
import { withRouter } from "react-router-dom";

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
      // this.getMusicList();
    });

    // let likeId =
    //   querystring.parse(this.props.history.location.search.slice(1)).id || "";
    // this.setState({ likeId }, () => {
    //   this.getMusicList(this.state.likeId);
    // });
  }
  componentWillUnmount() {
    // $ = null;
  }
  componentDidMount() {
    this.drawAudioPlay();
    this.drawAudioArc();
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
        // this.getSongDetailUrl(likeIds[0]);
        this.getMusicList(likeIds[0]);
      });
    });
  }
  /**
   * @description:  获取音乐详情以及播放地址
   * @param {*} idsArr number || Array
   * @return {*}
   */
  async getSongDetailUrl(idsArr) {
    let ids = typeof idsArr === "object" ? idsArr.join(",") : idsArr;
    // 歌曲信息综合
    let playIng = [];
    Promise.all([await getSongDetail(ids), await getMusic(ids)]).then((res) => {
      // 歌曲详情
      let musicDeatil = res[0].data.songs;
      // 歌曲地址
      let musicUrl = res[1].data.data;
      musicDeatil.forEach((item, index) => {
        let obj = {};
        obj.al = item.al;
        obj.ar = item.ar;
        playIng.push(obj);
      });
      musicUrl.forEach((item, index) => {
        playIng[index].url = item.url;
        playIng[index].id = item.id;
      });
      this.setState({ playIng });
    });
  }
  async getMusicList(id) {
    // 获取喜欢的音乐
    // 获取音乐详情
    let list = {};
    let musicDetail = await (await getSongDetail(id)).data;
    let musicUrl = await (await getMusic(id)).data;
    Promise.all([musicDetail, musicUrl]).then((res) => {
      // console.log(res);
      list = {
        songs: res[0].songs[0],
        privileges: res[0].privileges[0],
        data: res[1].data[0],
      };
      this.setState({ list });
    });
  }
  // 打开播放器
  openPlay() {
    $("#audio")
      .removeClass()
      .addClass("animate__animated animate__fadeInUpBig show");
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
    let { currentTime, duration } = this.state.audio;
    const audio = e.target;
    // let allWidth = $(".audio-by-all").width();
    let width = (currentTime / duration) * 100;
    $(".audio-by-now").width(width + "%");
    if (audio.ended) {
      this.initPlay();
      return;
    }

    this.setState({
      audio: {
        ...this.state.audio,
        currentTime: audio.currentTime,
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
        <div id="audio" className="audio audio-html">
          <audio
            ref="audio"
            id="audio-my"
            onCanPlay={() => this.initPlay()}
            onTimeUpdate={(e) => this.onTimeUpdate(e)}
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
          <div className="audio-by">
            <span className="audio-by-text-now">
              {audio.currentTime ? timeFormat(audio.currentTime) : "00:00"}
            </span>
            <div className="audio-by-all">
              <span className="audio-by-now"></span>
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
