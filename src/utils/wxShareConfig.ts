function wxShareConfig(
  share = {},
  config = {
    link: '',
    title: '',
    desc: '',
    imgUrl: ''
  }
) {
  if (!share) return
  if (window.wx) {
    // if (!getSession('wx_config') || getSession('wx_config') === 'false') {
    //   window.wx.config(share)
    //   setSession('wx_config', 'true')
    // }
    window.wx.config(share)
    window.wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
      // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
      // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      window.wx.updateAppMessageShareData({
        // 分享给朋友、分享到QQ
        title: config.title || '',
        desc: config.desc || '',
        link: config.link || '',
        imgUrl: config.imgUrl || '',
        success: function () {}
      })
      window.wx.updateTimelineShareData({
        // 分享到朋友圈、分享到QQ空间
        title: config.title || '',
        link: config.link || '',
        imgUrl: config.imgUrl || '',
        success: function () {}
      })
    })
  }
}

export default wxShareConfig
