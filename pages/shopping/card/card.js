var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    id: 0,
    cardList: [],
    selectedItems: []
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
          that.setData({
            cardList: res.data
          })
          that.setData({
            selectedItems: res.data[that.data.id].items
          })
        }
      })
  },
  cardSelect(event) {
    console.log('selectCard', event.currentTarget.dataset.cardId);
    try {
      wx.setStorageSync('cardId', event.currentTarget.dataset.cardId);
    } catch (e) {}
    //选择该收货地址
    wx.redirectTo({
      url: '/pages/shopping/checkout/checkout'
    })
  },
  switchCate(event) {
    const id = event.currentTarget.dataset.id;
    if (this.data.id === id) {
      return false;
    }
    this.setData({
      id
    });
    this.setData({
      selectedItems: this.data.cardList[id].items
    });
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