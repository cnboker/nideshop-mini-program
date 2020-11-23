var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    cardList: []
  },
  onLoad: function (options) {
    this.getcardList();
  },

  getcardList: function () {
    let that = this;
    util
      .request(api.CardList)
      .then(function (res) {
        if (res.errno === 0) {
          that.setData({cardList: res.data})
        }
      })
  },
  cardSelect(event) {
    console.log('selectCard', event.currentTarget.dataset.cardId);
    try {
      wx.setStorageSync('cardId', event.currentTarget.dataset.cardId);
    } catch (e) {}
    //选择该收货地址
    wx.redirectTo({url: '/pages/shopping/checkout/checkout'})
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  }
})