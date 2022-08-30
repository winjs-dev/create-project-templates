// 分享设置
export default {
  data() {
    return {
      //默认分享参数
      share: {
        title: 'uni-app 多端框架',
        path: '/pages/index/index',
        imageUrl: '',
        bgImgUrl: '',
        desc: '',
        content: ''
      }
    };
  },
  onShareAppMessage(res) {
    //分享到朋友
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      bgImgUrl: this.share.bgImgUrl,
      desc: this.share.desc,
      content: this.share.content,
      success(res) {},
      fail(res) {}
    };
  },
  onShareTimeline(res) {
    //分享到朋友圈
    return {
      title: this.share.title,
      success(res) {},
      fail(res) {}
    };
  }
};
