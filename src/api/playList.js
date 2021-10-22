import axios from "../utils/request";
import qs from "qs";

// 歌单分类
export const catlist = () => {
  return axios({
    url: `/playlist/catlist`,
    method: "get",
  });
};
// 热门歌单分类
export const hotCatList = () => {
  return axios({
    url: `/playlist/hot`,
    method: "get",
  });
};
/**
 * 歌单 ( 网友精选碟 )
 *说明 : 调用此接口 , 可获取网友精选碟歌单
 *可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 *cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 *limit: 取出歌单数量 , 默认为 50
 *offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const songList = (obj) => {
  return axios({
    url: `/top/playlist?order=${obj.order}&cat=${obj.cat}&limit=${obj.limit}&offset=${obj.offset}`,
    method: "post",
  });
};
/**
 *精品歌单标签列表
 *说明 : 调用此接口 , 可获取精品歌单标签列表
 *接口地址 : /playlist/highquality/tags
 *调用例子 : /playlist/highquality/tags
 */
export const songListTags = () => {
  return axios({
    url: `/playlist/highquality/tags`,
    method: "get",
  });
};
/**
 *获取精品歌单
 *说明 : 调用此接口 , 可获取精品歌单
 *可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",
 *可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 *limit: 取出歌单数量 , 默认为 20
 *before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 *接口地址 : /top/playlist/highquality
 *调用例子 : /top/playlist/highquality?before=1503639064232&limit=3
 */
export const highquality = (obj) => {
  return axios({
    url: `/top/playlist/highquality`,
    method: "post",
    data: qs.stringify(obj),
  });
};
/**
 *相关歌单推荐
 *说明 : 调用此接口,传入歌单 id 可获取相关歌单(对应页面 https://music.163.com/#/playlist?id=1)
 *
 *必选参数 : id : 歌单 id
 *
 *接口地址 : /related/playlist
 *
 *调用例子 : /related/playlist?id=1
 */
export const relatedSongList = (id) => {
  return axios({
    url: "/related/playlist",
    method: "get",
    params: { id },
  });
};


/**
*获取歌单详情
*说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐
*(未登录状态只能获取不完整的歌单,登录后是完整的)，
*但是返回的trackIds是完整的，tracks 则是不完整的，
*可拿全部 trackIds 请求一次 song/detail 
*接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
*必选参数 : id : 歌单 id
*可选参数 : s : 歌单最近的 s 个收藏者,默认为8
*接口地址 : /playlist/detail
*调用例子 : /playlist/detail?id=24381616
*/
export const songListDetail = (id) => {
  return axios({
    url: "/playlist/detail",
    method: "get",
    params: { id },
  });
};
/**
 *歌单详情动态
 *说明 : 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
 *必选参数 : id : 歌单 id
 *接口地址 : /playlist/detail/dynamic
 *调用例子 : /playlist/detail/dynamic?id=24381616
 */
export const songListDynamic = (id) => {
  return axios({
    url: "/playlist/detail/dynamic",
    method: "get",
    params: { id },
  });
};

/**
 * 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * 必选参数 : keywords : 关键词
 * 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 ,
 * 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 *
 */
export const searchSong = (obj) => {
  return axios({
    url: "/cloudsearch?keywords=" + obj.keywords,
    method: "get",
    // data: qs.stringify(obj),
  });
};

// 热门搜索
export const hotSearch = () => {
  return axios({
    url: "/search/hot/detail",
    method: "get",
  });
};
