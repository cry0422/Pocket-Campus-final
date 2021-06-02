// pages/activity/activity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '', //搜索的内容
    allActivities:[],
    activities: [],
    new : [],
    mark : false,
    selectState: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newActivities = app.globalData.activities;
    for (var i=0;i<newActivities.length;i++){
      if (newActivities[i].type == 'evening party'){
        newActivities[i].pictureUrl = '/images/party.jpg'
      }
      else if (newActivities[i].type == 'match') {
        newActivities[i].pictureUrl = '/images/match.jpg'
      }
      else if (newActivities[i].type == 'seminar') {
        newActivities[i].pictureUrl = '/images/seminar.jpg'
      }
      else if (newActivities[i].type == 'club activity') {
        newActivities[i].pictureUrl = '/images/club activity.jpg'
      }
    }
    this.setData({
      allActivities: newActivities,
    })
    if (this.data.inputValue == '') {
      this.setData({
        activities: this.data.allActivities,
      })
    }
    else{
      if (this.data.selectState == true){
        this.setData({
          activities: this.data.new
        })
      }
      else{
        this.setData({
          activities:this.data.new
        })
      }
    }
    console.log(this.data.selectState)
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

  addActivity:function(){
    wx.navigateTo({
      url: '../create/create',
    })
  },

  navigateTo:function(e){
    var app = getApp();
    app.globalData.targetName = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../activityDetail/activityDetail',
    })
  },

  //搜索框文本内容显示
  inputBind: function(event) {
    this.setData({
      inputValue: event.detail.value
    })
    var keyWord = String(this.data.inputValue).toUpperCase();
    var newActivity = [];
    for (var i=0;i<this.data.allActivities.length;i++) {
      var name = String(this.data.allActivities[i].name);
      var newName = name.toUpperCase();
      var state = newName.indexOf(keyWord);
      if (state != -1) {
        newActivity.push(this.data.allActivities[i]);
      }
    }
    if (newActivity.length == 0) {
      this.setData({
        new:newActivity,
        selectState:false
      })
    }
    else{
      this.setData({
        new:newActivity,
        selectState:true
      })
    }
    newActivity = []
    console.log(this.data.new)
    this.onLoad()
  },
  // query:function(){
  //   var keyWord = String(this.data.inputValue).toUpperCase();
  //   var newActivity = [];
  //   for (var i=0;i<this.data.activities.length;i++) {
  //     var name = String(this.data.activities[i].name);
  //     var newName = name.toUpperCase();
  //     var state = newName.indexOf(keyWord);
  //     if (state != -1) {
  //       newActivity.push(this.data.activities[i]);
  //     }
  //   }
  //   console.log(newActivity)
  //   if (newActivity.length == 0){
  //     console.log('1')
  //     this.setData({
  //       new:[],
  //       mark: true,
  //       selectState:true
  //     })
  //   }
  //   else{
  //     console.log('in')
  //     this.setData({
  //       new: newActivity,
  //       mark: true,
  //       selectState:false
  //     })
  //   }
  //   var a = []
  //   newActivity = a
  //   this.onLoad();
  //   this.setData({
  //     mark:false
  //   })
  // }
})