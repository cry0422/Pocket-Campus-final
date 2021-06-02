const app = getApp()
const order = ['demo1', 'demo2', 'demo3']

Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    agenda: [],
    "bnrUrl": [{
      "url": "/images/header.jpg"
    }, {
      "url": "/images/indeximage3.jpg"
    }, {
      "url": "/images/indeximage2.jpg"
    }, {
      "url": "/images/indeximage1.jpg"
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    var app = getApp();
    var list = app.globalData.database;
    // wx.getStorage({
    //   key: 'agenda',
    //   success: function (res) {
    //     that.setData({
    //       list: res.data
    //     })
    //   }
    // })

    var today = new Date();
    var currentDate = today.getDay(); //获取存储当前日期
    var weekday = [7, 1, 2, 3, 4, 5, 6];
    var weekNum = weekday[currentDate];
    var countNum = [];

    var agd = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].dayOfWeek == weekNum) {
        var every = list[i];
        agd = agd.concat([{
          "course": every.classNum,
          "location": every.address,
          "time": parseInt(every.timePeriod)
        }]);
      }
    }
    for (var m = 0; m < agd.length - 1; m++) {
      for (var n = 0; n < agd.length - m - 1; n++) {

        if (agd[n].time > agd[n + 1].time) {
          var swap = agd[n];
          agd[n] = agd[n + 1];
          agd[n + 1] = swap;
        }
      }
    }
    for(var i=0;i<agd.length;i++){
      if(agd[i+1] != null){
       if(agd[i].course == agd[i+1].course && agd[i].location == agd[i+1].location){
        agd[i].time = agd[i].time + "~" + agd[i+1].time;
        countNum = countNum.concat([i+1]);
        }
      }
    }
    for(var i=0;i<countNum.length;i++){
      delete agd[countNum[i]];
    }
    var finalAgd = [];
    for(var i=0;i<agd.length;i++){
      if(agd[i] != null){
        finalAgd = finalAgd.concat([agd[i]]);
      }
    }
    if (agd.length == 0) {
      agd = [{
          'course': 'NO',
          'location': 'ACTIVITY',
          'time': "TODAY"
        }];
    }
    console.log(1, agd)
    this.setData({
      agenda: finalAgd,
    })



    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function (option) {
    this.onLoad();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})