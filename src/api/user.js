import axios from "../utils/request";

// 获取用户详情
export const userDetail = (uid) => {
  return axios({
    url: "/user/detail?uid=" + uid,
    method: "post",
  });
};
// 获取账号信息
export const userInfo = () => {
  return axios({
    url: "user/account",
    method: "get",
  });
};
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const userSubcountInfo = () => {
  return axios({
    url: "user/subcount",
    method: "get",
  });
};
// 获取用户喜欢的音乐
export const userLikeList = (uid) => {
  return axios({
    url: "/likelist?uid=" + uid,
    method: "post",
  });
};
// 获取用户等级
export const userLevel = () => {
  return axios({
    url: "/user/level",
    method: "post",
  });
};
// 获取用户绑定信息
export const userBinding = (uid) => {
  return axios({
    url: "/user/binding?uid=" + uid,
    method: "post",
  });
};
/*
用户绑定手机

phone : 手机号码
oldcaptcha: 原手机号码的验证码
captcha:新手机号码的验证码
*/
export const userReplacephone = (form) => {
  return axios({
    url: "/user/replacephone",
    method: "post",
    data: form,
  });
};
/*
*更新用户信息
gender: 性别 0:保密 1:男性 2:女性
birthday: 出生日期,时间戳 unix timestamp
nickname: 用户昵称
province: 省份id
city: 城市id
signature：用户签名
*/
export const userUpdate = (form) => {
  return axios({
    url: "/user/update",
    method: "post",
    data: form,
  });
};
// 更新头像
export const avatarUpload = () => {
  return axios({
    url: "/avatar/upload",
    method: "post",
  });
};
// 获取用户歌单
export const userPlayList = (uid) => {
  return axios({
    url: "/user/playlist?uid=" + uid,
    method: "post",
  });
};

/*
获取用户历史评论
必选参数 : uid : 用户 id
可选参数 :
limit : 返回数量 , 默认为 10
time: 上一条数据的time,第一页不需要传,默认为0
*/
export const userHistory = (form) => {
  return axios({
    url: "/user/comment/history",
    method: "post",
    data: form,
  });
};
/* 
获取用户电台
*/
export const userDj = (uid) => {
  return axios({
    url: "/user/dj?uid=" + uid,
    method: "post",
  });
};
/* 
获取用户关注列表
必选参数 : uid : 用户 id
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
*/
export const userFollows = (form) => {
  return axios({
    url: "/user/follows",
    method: "post",
    data: form,
  });
};

/* 
获取用户粉丝列表
必选参数 : uid : 用户 id
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
*/
export const userFolloweds = (form) => {
  return axios({
    url: "/user/followeds",
    method: "post",
    data: form,
  });
};
/* 
获取用户动态
必选参数 : uid : 用户 id
可选参数 : 
limit : 返回数量 , 默认为 30
lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
*/
export const userEvent = (form) => {
  return axios({
    url: "/user/event",
    method: "post",
    data: form,
  });
};
/* 
转发用户动态
必选参数 : 
uid : 用户 id
evId : 动态 id
forwards : 转发的评论
*/
export const userEventForward = (form) => {
  return axios({
    url: "/event/forward",
    method: "post",
    data: form,
  });
};
/* 
删除用户动态
必选参数 : evId : 动态 id
*/
export const userEventDel = (uid) => {
  return axios({
    url: "/event/del?uid=" + uid,
    method: "post",
  });
};
/*
分享歌曲、歌单、mv、电台、电台节目到动态
说明 : 登录后调用此接口 ,可以分享歌曲、歌单、mv、电台、电台节目到动态
必选参数 : id : 资源 id （歌曲，歌单，mv，电台，电台节目对应 id）
可选参数 : type: 资源类型，默认歌曲 song，可传 song,playlist,mv,djradio,djprogram
msg: 内容，140 字限制，支持 emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
*/
export const shareResource = (obj) => {
  return axios({
    url: "/share/resource",
    method: "post",
    data: obj,
  });
};
/*
获取动态评论
说明 : 登录后调用此接口 , 可以获取动态下评论
必选参数 : threadId : 动态 id，可通过 /event，/user/event 接口获取
接口地址 : /comment/event
调用例子 : /comment/event?threadId=A_EV_2_6559519868_32953014
*/
export const commentEvent = (threadId) => {
  return axios({
    url: "/comment/event?threadId=" + threadId,
    method: "get",
  });
};

/*
关注/取消关注用户
说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
必选参数 :
id : 用户 id
t : 1为关注,其他为取消关注
接口地址 : /follow
调用例子 : /follow?id=32953014&t=1
*/
export const followUser = (obj) => {
  return axios({
    url: "/follow",
    method: "post",
    data: obj,
  });
};

/* 
获取音乐url
必选参数 : id : 音乐 id
可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
接口地址 : /song/url
调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
音乐是否可用
*/
export const getMusic = (id) => {
  return axios({
    url: "/song/url",
    method: "get",
    params: { id },
  });
};
/* 
获取歌词
说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
必选参数 : id: 音乐 id
接口地址 : /lyric
调用例子 : /lyric?id=33894312
*/
export const getMusicLyric = (id) => {
  return axios({
    url: "/lyric?id=" + id,
    method: "get",
  });
};
/* 
获取歌曲详情
说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
必选参数 : ids: 音乐 id, 如 ids=347230
接口地址 : /song/detail
调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
*/
export const getSongDetail = (id) => {
  return axios({
    url: "/song/detail",
    method: "get",
    params: { ids: id },
  });
};
/* 
音乐是否可用
说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
*/
export const checkMusic = (id) => {
  return axios({
    url: "/check/music?id=" + id,
    method: "get",
  });
};
