const util = require('../utils/util.js');
// pages/login.js
Page({
  /**
   * Component properties
   */
  properties: {},

  /**
   * Component initial data
   */
  data: {},
  onWechatLogin(e) {
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({title: '微信登录失败1'})
      return false
    }
    util.wxLogin(e.detail, () => {
      wx.switchTab({url: '/pages/index/index'});
    }, (error) => {});

  },

  /**
   * Component methods
   */
  methods: {}
})