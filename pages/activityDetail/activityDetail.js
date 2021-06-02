// pages/activityDetail/activityDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities:[],
    activity:{},
    pictureUrl:"",
    attend: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activities : app.globalData.activities
    });
    var target = app.globalData.targetName;
    for (var i = 0;i<this.data.activities.length;i++){
      if (this.data.activities[i].name == target){
        this.setData({
          activity : this.data.activities[i]
        })
      }
    };
    if (this.data.activity.type == 'evening party'){
      this.setData({
        pictureUrl : '/images/party.jpg'
      })
    }
    else if (this.data.activity.type == 'match') {
      this.setData({
        pictureUrl : '/images/match.jpg'
      })
    }
    else if (this.data.activity.type == 'seminar') {
      this.setData({
        pictureUrl : '/images/seminar.jpg'
      })
    }
    else if (this.data.activity.type == 'club activity') {
      this.setData({
        pictureUrl : '/images/club activity.jpg'
      })
    };
    if (this.data.activity.number == 0){
      this.setData({
        attend:'attend'
      })
    }
    else{
      this.setData({
        attend:'cancel attend'
      })
    };
    console.log(this.data.pictureUrl);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      activities:app.globalData.activities
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  register:function(){
    if (this.data.attend == 'attend'){
      app.globalData.registerActivity = this.data.activity;
      wx.navigateTo({
        url: '../register/register',
      })
    }
    else {
      var a = this.data.activity;
      a.number = 0;
      for (var i=0;i<app.globalData.activities.length;i++) {
        if (this.data.activity.name == app.globalData.activities[i].name){
          app.globalData.activities[i].number = 0;
        }
      }
      this.setData({
        attend: 'attend',
        activity:a
      })
      wx.navigateBack({
        delta: 2,
      })
    }
  },
  navigation:function(){
    app.globalData.selectedPlace = this.data.activity.location;
    app.globalData.mark = true;
    wx.reLaunch({
      url: '../map/map',
    })
  }
})