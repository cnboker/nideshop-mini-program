var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const pay = require('../../services/pay.js');

var app = getApp();
Page({
  data: {
    status: false,
    orderId: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({orderId: options.orderId, status: options.status})
  },
  onReady: function () {},
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  payOrder() {
    pay
      .payOrder(this.data.orderId)
      .then(res => {
        this.setData({status: true});
      })
      .catch(res => {
        util.showErrorToast('支付失败');
      });
  },
  testPayOrder() {
    util
      .request(api.TestPayId, {orderId: this.data.orderId})
      .then((res) => {
        this.setData({status: true});
        wx.showToast('支付成功');
      }).catch(e=>{
        util.showErrorToast('支付失败');
      })
  },
  testOvertimeOrder() {
    util
      .request(api.OrderOverdue, {orderId: this.data.orderId})
      .then((res) => {
        wx.showToast('操作成功');
      }).catch(e=>{
        util.showErrorToast('支付失败');
      })
  }
})