var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const pay = require('../../../services/pay.js');

Page({
  data:{
    orderList: [],
    status:0,
  },
  onLoad:function(options){
    this.setData({status:options.status});
    this.getOrderList(options.status);
  },
  getOrderList(status){
    let that = this;
    util.request(api.PayList + '?status=' + status).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          orderList: res.data.data
        });
      }
    });
  },
  payOrder(event) {
    const order_sn = event.target.dataset.id;
    pay
      .payOrder(order_sn)
      .then(res => {
        this.setData({status: true});
        wx.redirectTo({
          url: '/pages/payResult/payResult?status=1&orderId=' + order_sn
        });
      })
      .catch(res => {
        util.showErrorToast('支付失败');
        wx.redirectTo({
          url: '/pages/payResult/payResult?status=0&orderId=' + order_sn
        });
      });
  },

  cancelOrder(event){
    const order_sn = event.target.dataset.id;
    wx.showModal({
      title: '',
      content: '确定要取消订单妈？',
      success: (res) => {
        if (res.confirm) {
          util.request(api.PayCancel, { order_sn }, 'POST').then( (res) =>{
            if (res.errno === 0) {
              this.getOrderList(this.data.status);
            }
          });
        }
      }
    });
    return false;
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})