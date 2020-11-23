var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const pay = require('../../../services/pay.js');

var app = getApp();

Page({
  data: {
    checkedGoodsList: [],
    checkedAddress: {},
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00, //快递费
    couponPrice: 0.00, //优惠券的价格
    orderTotalPrice: 0.00, //订单总价
    actualPrice: 0.00, //实际需要支付的总价
    addressId: 0,
    cardId: 0,
    couponId: 0,
    checkedMycard: {}
  },
  onLoad: function (options) {
    this.updateVariable();
  },
  updateVariable: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    try {
      var addressId = wx.getStorageSync('addressId') || 0;
      var cardId = wx.getStorageSync('cardId') || 0;
      console.log('cardId=', cardId)
      if (addressId > 0) {
        this.setData({addressId});
      }
      if (cardId > 0) {
        this.setData({cardId})
      }

      var couponId = wx.getStorageSync('couponId') || 0;
      if (couponId > 0) {
        this.setData({couponId});
      }
    } catch (e) {
      // Do something when catch error
    }

  },
  //卡处理流程
  /*
  1. 没有可用会员卡，则提示用户选择卡；如果有卡且该卡在有效期限内，则作为默认卡，否则当作无卡处理
  2. 选择卡后会到该页面调用后台服务获取check信息，后台检测是否有可用卡，如果有返回可用卡，跳过付款流程，如果没有返回cardId对应的卡信息，数据包括未
  未付款状态，页面需要增加付款流程；
  */
  getCheckoutInfo: function () {
    let that = this;
    util
      .request(api.CartCheckout, {
        addressId: +that.data.addressId,
        cardId: +that.data.cardId,
        couponId: +that.data.couponId
      })
      .then(function (res) {
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            checkedGoodsList: res.data.checkedGoodsList,
            checkedAddress: res.data.checkedAddress,
            checkedMycard: res.data.checkedMycard,
            actualPrice: res.data.actualPrice,
            checkedCoupon: res.data.checkedCoupon,
            couponList: res.data.couponList,
            couponPrice: res.data.couponPrice,
            freightPrice: res.data.freightPrice,
            goodsTotalPrice: res.data.goodsTotalPrice,
            orderTotalPrice: res.data.orderTotalPrice,
            addressId: res.data.checkedAddress.id,
            cardId: res.data.checkedMycard.cardId || 0
          });
          
        }

        wx.hideLoading();
      });
  },
  selectCard() {
    wx.navigateTo({url: '/pages/shopping/card/card'})
  },
  selectAddress() {
    wx.navigateTo({url: '/pages/shopping/address/address'})
  },
  addAddress() {
    wx.navigateTo({url: '/pages/shopping/addressAdd/addressAdd'})
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    wx.showLoading({title: '加载中...'})
    this.getCheckoutInfo();

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  submitOrder: function () {
    if (this.data.addressId <= 0) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    if (this.data.cardId <= 0) {
      util.showErrorToast('请选择会员卡');
      return false;
    }
    console.log('data', this.data)
    util.request(api.OrderSubmit, {
      addressId: this.data.addressId,
      couponId: this.data.couponId,
      cardId: this.data.cardId
    }, 'POST').then(res => {
      if (res.errno === 0) {
        const orderId = res.data.orderInfo.order_sn;
        pay
          .payOrder(parseInt(orderId))
          .then(res => {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=1&orderId=' + orderId
            });
          })
          .catch(res => {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' + orderId
            });
          });
      } else {
        util.showErrorToast('下单失败');
      }
    });
  }
})