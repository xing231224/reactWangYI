// bannerImg 主图
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import banner3 from "../assets/banner/banner3.png";
import banner4 from "../assets/banner/banner4.png";

// loginButton  登录按钮
import monkBoard from "../assets/banner/monkboard.png";
import buttonLeft from "../assets/banner/buttonLeft.png";
import buttonRight from "../assets/banner/buttonRight.png";
import facebook from "../assets/banner/Facebook.png";
import font from "../assets/banner/Font.png";
import twitter from "../assets/banner/twitter.png";

// 加载图片
import loadingImg from "../assets/Loading/loadingImg.png";
import loadingFont from "../assets/Loading/loadingfont.png";
import loadingIcon from "../assets/Loading/loadingIcon.png";
import loadOverImg from "../assets/Loading/LoadOverImg.png";
import loadOverBtn1 from "../assets/Loading/loadoverbtn-1.png";
import loadOverBtn2 from "../assets/Loading/loadoverbtn-2.png";
import loadOverFont from "../assets/Loading/loadOverFont.png";

// 导航
import navBack from "../assets/navArrow.png";

// login登录
import loginImg from "../assets/login/loginImg.png";

// tabbar
import browse from "../assets/tabbar/browse.png";
import browseACt from "../assets/tabbar/browseAct.png";
import discover from "../assets/tabbar/discover.png";
import discoverAct from "../assets/tabbar/discoverAct.png";
import library from "../assets/tabbar/library.png";
import libraryAct from "../assets/tabbar/libraryAct.png";
import profile from "../assets/tabbar/profile.png";
import profileAct from "../assets/tabbar/profileAct.png";
import store from "../assets/tabbar/store.png";
import storeAct from "../assets/tabbar/storeAct.png";

// headerNav
import profileTitle from "../assets/headerNav/Profile.png";
import libraryTitle from "../assets/headerNav/library.png";
import search from "../assets/headerNav/search.png";
import menu from "../assets/headerNav/menu.png";
import All_Genres from "../assets/headerNav/All Genres.png";
import arrowTop from "../assets/headerNav/arrowTop.png";
import arrowBottom from "../assets/headerNav/arrowBottom.png";
import deleteBtn from "../assets/headerNav/delete.png";
import circleList from "../assets/headerNav/yuandiancaidan.png"
import backIcon from "../assets/headerNav/fanhuijiantouxiangqingye.png"

// 播放小图标
import pauseBtn from "../assets/play-btn.png";
import playBtn from "../assets/pause-btn.png";
import nextBtn from "../assets/next.png";
import previous from "../assets/previous.png";

// 小图标
import likeBtn from "../assets/like.png";
import noLikeBtn from "../assets/nolike.png";
import returnTop from "../assets/return-top.png";
export const playIcon = { playBtn, pauseBtn, nextBtn, previous };

export const minIcon = { likeBtn, noLikeBtn, returnTop };

export const bannerList = [
  { id: 0, img: banner1 },
  { id: 1, img: banner2 },
  { id: 2, img: banner3 },
  { id: 3, img: banner4 },
];
export const loginButton = {
  buttonLeft,
  buttonRight,
  facebook,
  font,
  twitter,
  monkBoard,
};
export const loading = {
  loadingImg,
  loadingFont,
  loadingIcon,
  loadOverImg,
  loadOverBtn1,
  loadOverBtn2,
  loadOverFont,
};
export const nav = {
  navBack,
};

export const login = {
  loginImg,
};

export const headerNav = {
  profileTitle,
  libraryTitle,
  All_Genres,
  search,
  menu,
  arrowTop,
  arrowBottom,
  deleteBtn,
  circleList,
  backIcon
};
export const tabbar = [
  {
    id: 0,
    img: browse,
    imgActive: browseACt,
    path: "/index/browse",
  },
  {
    id: 1,
    img: discover,
    imgActive: discoverAct,
    path: "/index/discover",
  },
  {
    id: 2,
    img: store,
    imgActive: storeAct,
    path: "/index/store",
  },
  {
    id: 3,
    img: library,
    imgActive: libraryAct,
    path: "/index/library",
  },
  {
    id: 4,
    img: profile,
    imgActive: profileAct,
    path: "/index/profile",
  },
];
