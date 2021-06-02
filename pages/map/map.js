// pages/map/map.js
var util = require('../../utils/util.js');
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // markers	 Array	标记点
    latitude: "",
    longitude: "",
    scale: 18,
    markers: [],
    //controls控件 是左下角圆圈小图标,用户无论放大多少,点这里可以立刻回到当前定位(控件（更新一下,即将废弃，建议使用 cover-view 代替）)
    controls: [
      { 
        id: 1,
        iconPath: '../../images/location.png',
        position: {
          left: 15,
          top: 600,
          width: 70,
          height: 70
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: '/images/nextlesson.png',
        position: {
          left: 320,
          top: 600,
          width: 60,
          height: 60
        },
        clickable: true
      }
      ],
      selectHeight: 'height: 40px', // select 组件的高度
      selectList: ["SA", "SB", "SC", "SD", "CB", "FB", "MA", "MB", "PB","EE","EB"], // select 组件的可选项
      selectInfo: 'Select the location'  // cover-view 显示的选中的内容
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp();
    var mark = app.globalData.mark;
    var selectedPlace = app.globalData.selectedPlace;
    var place = app.globalData.location;
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      altitude: true,
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
    if (mark == true) {
      var location =  selectedPlace.substring(0,2);
      var latitude = 0;         
      var longitude = 0;
      app.globalData.mark = false;
      for (var i =0;i<place.length;i++){
        if (location == place[i].name){
          latitude = place[i].latitude;
          longitude = place[i].longitude;
          console.log(1);
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: location + " Building",
          })
        }
      }
    }
  },
  //controls控件的点击事件
  bindcontroltap(e) {
    var that = this;
    if (e.controlId == 1) {
      that.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 18,
      })
    }
    else{
      var app = getApp();
      var that = this;
      var scheduleList = app.globalData.database;
      var location = app.globalData.location;
      var myDate = new Date();
      var day= myDate.getDay();
      var hour= myDate.getHours();
      var market = false;
      var scheduleInfo = [];
      var scheduleLat = 0;
      var scheduleLong = 0;
      for(var i=0;i<scheduleList.length;i++){
        if((scheduleList[i].dayOfWeek == day && scheduleList[i].timePeriod == (hour+1)) || (scheduleList[i].dayOfWeek == day && scheduleList[i].timePeriod == (hour+2))) {
          var locationName = scheduleList[i].address.substring(0,2);
          for(var j=0;j<location.length;j++){
            if(locationName == location[j].name){
              market = true;
              scheduleInfo = scheduleList[i];
              scheduleLat = location[j].latitude;
              scheduleLong = location[j].longitude;
            }
          }
        }
      }
      if (market == true){
        wx.showModal({
          title: 'Schedule Information',
          content: 'Next lesson:\n' + scheduleInfo.className + '\n Time: ' + scheduleInfo.timePeriod + ' ：00 \n Location: ' + scheduleInfo.address ,
          showCancel: true,//是否显示取消按钮
          cancelText:"Cancel",//默认是“取消”
          cancelColor:'#000',//取消文字的颜色
          confirmText:"CONFIRM",//默认是“确定”
          confirmColor: '#000',//确定文字的颜色
          success:function (res) {
            if(res.confirm){
              that.setData({
                markers:[{
                  latitude: scheduleLat,
                  longitude: scheduleLong,
                  iconPath: '/images/destination.png',
                  width: 50,
                  height: 50
                }],
                scale:16
              })
              wx.openLocation({
                latitude: scheduleLat,
                longitude: scheduleLong,
                name: locationName + " Building",
              })
            }
            else{
            }
          }
        })
      }
      else{
        wx.showModal({
          title:'Schedule Information',
          content: 'You do not have class for the next two hours!',
          showCancel: false,
          confirmText: 'CONFIRM',
          confirmColor: '#000',
          success:function(res){
            if(res.confirm){
            }
          }
        })
      }
    }
  },

  /**
     * 显示 select
     */
    tapSelect() {
      this.setData({
          selectHeight: 'max-height: 200px'
      });
  },
  /**
   * 关闭 select
   */
  tapSelectClose() {
      this.setData({
          selectHeight: 'height: 40px',
      });
  },
  /**
   * 将选中的 select 内容给到 cover-view
   */
  selectItem(e) {
      let selected = e.currentTarget.dataset.item;
      this.setData({
          selectInfo: selected
      });
      var app = getApp();
      var location = app.globalData.location;
      var that = this;
      for(var i=0;i<location.length;i++){
        if(selected == location[i].name){
          that.setData({
            markers:[{
              latitude: location[i].latitude,
              longitude: location[i].longitude,
              iconPath: '/images/destination.png',
              width: 50,
              height: 50
            }],
            scale: 17
          })
          wx.openLocation({
            latitude: location[i].latitude,
            longitude: location[i].longitude,
            name: location[i].name + " Building",
          })
        }
      }
  }
})
