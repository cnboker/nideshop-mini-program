const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const { checkLogin } = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    staticFileServer: api.StaticResourceServer,
    goodsCount: 0,
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: []
  },
  onShareAppMessage: function () {
    return {
      title: '绘本借阅小程序',
      desc: '绘本借阅',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
        });
      }
    });
  },
  onLoad: function (options) {
     // 页面渲染完成
     console.log('token=',wx.getStorageSync('token'))
     
    this.getIndexData();
    util.request(api.GoodsCount).then(res => {
      this.setData({
        goodsCount: res.data.goodsCount
      });
    });
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login'
      });
      return;
    }
  },
  
  onReady: function () {
   
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
