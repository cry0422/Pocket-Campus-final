// pages/create/create.js
var utils = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityArr:['evening party', 'match', 'seminar', 'club activity'],
    activityIndex:0,
    locationArr:['SA','SB','SC','SD','FB','CB','PB','MA','MB','EE','EB'],
    locationIndex:0,
    room:'',
    activityName:'',
    details:'',
    // imageList:[],
    // imageUrl:'',
    // ownerName: '',
    // phoneNumber: '',
    startTime:null,
    dateTimeArray: null,
    endTime:null,
    dateTimeArray1:null,
    deadTime:null,
    dateTimeArray2:null,
    number:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(2020, 2030);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    this.setData({
      startTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      endTime: obj.dateTime,
      dateTimeArray1: obj.dateTimeArray,
      deadTime:obj.dateTime,
      dateTimeArray2:obj.dateTimeArray,
    });
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
    //修改活动类型
    activityChange(e){
      this.setData({
        activityIndex: e.detail.value
      })
    },

    //修改开始时间
    startTimeChange(e){
      this.setData({
        startTime: e.detail.value
      })
    },
  
    //修改结束时间
    endTimeChange(e) {
      this.setData({
        endTime: e.detail.value
      })
    },
  
    //修改截止时间
    deadTimeChange(e) {
      this.setData({
        deadTime: e.detail.value
      })
    },
  
    //修改活动地点
    locationChange(e){
      this.setData({
        locationIndex: e.detail.value
      })
    },
  
    //修改活动名称
    inputActivityName(e){
      this.setData({
        activityName: e.detail.value
      })
    },

    //输入详细地点
    inputRoom(e){
      this.setData({
        room: e.detail.value
      })
    },
      //输入细节
    inputDetails(e){
      this.setData({
       details: e.detail.value
      })
    },


    submitInfo(e){
      var newActivity = {};
      newActivity = {
        'type' : this.data.activityArr[this.data.activityIndex],
        'name' : this.data.activityName,
        'startTime' : this.data.dateTimeArray[0][this.data.startTime[0]] + '-' + this.data.dateTimeArray[1][this.data.startTime[1]] + '-' + this.data.dateTimeArray[2][this.data.startTime[2]] + ' ' + this.data.dateTimeArray[3][this.data.startTime[3]] + ':' + this.data.dateTimeArray[4][this.data.startTime[4]],
        'endTime' : this.data.dateTimeArray1[0][this.data.endTime[0]] + '-' + this.data.dateTimeArray1[1][this.data.endTime[1]] + '-' + this.data.dateTimeArray1[2][this.data.endTime[2]] + ' ' + this.data.dateTimeArray1[3][this.data.endTime[3]] + ':' + this.data.dateTimeArray1[4][this.data.endTime[4]],
        'deadTime' : this.data.dateTimeArray2[0][this.data.deadTime[0]] + '-' + this.data.dateTimeArray2[1][this.data.deadTime[1]] + '-' + this.data.dateTimeArray2[2][this.data.deadTime[2]] + ' ' + this.data.dateTimeArray2[3][this.data.deadTime[3]] + ':' + this.data.dateTimeArray2[4][this.data.deadTime[4]],
        'location' : this.data.locationArr[this.data.locationIndex]+this.data.room,
        'number':this.data.number,
        'details':this.data.details
      }
      app.globalData.activities.push(newActivity);
      console.log(app.globalData.activities);
      wx.reLaunch({
        url: '../activity/activity'
      })
    }
})