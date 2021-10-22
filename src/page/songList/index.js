/*
 * @Author: your name
 * @Date: 2021-09-28 15:22:28
 * @LastEditTime: 2021-09-30 17:54:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\page\songList\index.js
 */
import React from "react";
import HeaderNav from "../../components/headerNav";
import { songListDetail } from "../../api/playList";
import { quantityFilter } from "../../filter";
import querystring from "qs";
import "./index.scss";
export default class SongList extends React.Component {
  constructor() {
    super();
    this.state = {
      songListId: null,
      songListInfo: null,
      songList: [],
    };
  }
  componentDidMount() {
    console.log(this.props);
    let songListId =
      querystring.parse(this.props.history.location.search.slice(1)).id || "";
    this.setState({ songListId }, () => {
      this.getSongListDetail(this.state.songListId);
    });
  }

  getSongListDetail(id) {
    let { songListInfo, songList } = this.state;
    songListDetail(id).then((res) => {
      songListInfo = res.data.playlist;
      res.data.playlist.tracks.forEach((item) => {
        songList.push(item);
      });
      this.setState({ songListInfo, songList });
    });
  }
  render() {
    let { songListInfo, songList } = this.state;
    function returnInfo(object, info) {
      if (object) {
        if (!info.includes(".")) return object[info];
        let obj = null;
        info.split(".").forEach((item, index) => {
          obj = obj ? obj[item] : object[item];
        });
        return obj;
      }
    }
    return (
      <div className="song_list">
        <div
          className="song_list_header"
          style={{
            backgroundImage: `url(${returnInfo(songListInfo, "coverImgUrl")})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <HeaderNav activeIndex={5} title={"歌单®"} bind={this} />
          <div className="song_list_info">
            <div className="song_list_img">
              <img src={returnInfo(songListInfo, "coverImgUrl")} alt="" />
            </div>
            <div className="info">
              <div style={{ color: "#fff", fontSize: "15px" }}>
                {returnInfo(songListInfo, "name")}
              </div>
              <div className="info_info">
                <div className="info_avatarUrl">
                  <img
                    src={returnInfo(songListInfo, "creator.avatarUrl")}
                    alt=""
                  />
                  <div className="info_identityIconUrl">
                    <img
                      src={returnInfo(
                        songListInfo,
                        "creator.avatarDetail.identityIconUrl"
                      )}
                      alt=""
                    />
                  </div>
                </div>
                <span className="info_nikename juz">
                  {returnInfo(songListInfo, "creator.nickname")}
                </span>
                <div className="juz">
                  <div className="info_add juz">
                    <span className="iconfont icon-tianjia" />
                  </div>
                </div>
              </div>
              <div className="info_description">
                {returnInfo(songListInfo, "description")}
              </div>
            </div>
            <div className="info_icon">
              <span className="iconfont icon-xiala" />
            </div>
          </div>
          <div className="song_list_share">
            <div>
              <span className="iconfont icon-zhengque" />
              <span>
                {quantityFilter(returnInfo(songListInfo, "subscribedCount"))}
              </span>
            </div>
            <div>
              <span
                className="iconfont icon-jianyi"
                style={{ fontSize: "18px" }}
              />
              <span>
                {quantityFilter(returnInfo(songListInfo, "commentCount"))}
              </span>
            </div>
            <div>
              <span className="iconfont icon-fenxiang" />
              <span>
                {quantityFilter(returnInfo(songListInfo, "shareCount"))}
              </span>
            </div>
          </div>
        </div>
        <div className="song_list_l">
          <div className="play_list_header">
            <div className="play_list_left">
              <span className="iconfont icon-bofang-copy" />
              <span className="text">播放全部</span>
              <i>({songList.length})</i>
            </div>
            <div className="play_list_right">
              <span className="iconfont icon-xiazai" />
              <span className="iconfont icon-zhengque" />
            </div>
          </div>
          <ul className="play_list_song">
            {songList.map((item, index) => {
              return (
                <li key={item.id}>
                  <div className="song_index juz">{index + 1}</div>
                  <div className="song_detail">
                    <span>{item.name}</span>
                    <span>dec</span>
                  </div>
                  <div className="juz">
                    <div className="song_icon">
                      <span className="iconfont icon-shipin" />
                      <span className="iconfont icon-gengduo-shuxiang" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
