var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    staticFileServer: api.StaticResourceServer,
    orderList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    this.getOrderList();
  },
  getOrderList() {
    let that = this;
    util.request(api.BookReturnList).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          orderList: res.data.data
        });
      }
    });
  },
  goReturn(event) {
    const id = event.target.dataset.id;
    util.put(api.PutBookReturn + '/' + id, {
      order_status: 501
    }).then((res) => {

      this.getOrderList();

    });

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})