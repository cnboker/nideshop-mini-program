var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data:{
    cardList: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.getMycardList();
  },
  getMycardList(){
    let that = this;
    util.request(api.Mycards).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          cardList: res.data
        });
      }
    });
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