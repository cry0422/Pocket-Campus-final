var weeksArray = [];
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sch_listData: [],
    dateArray: [],
    showModalStatus: false,
    //多列选择器：
    multiArray: [['Click', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
                  ['Click', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']],
                  //二维数组，长度是多少是几列
    multiIndex: [0, 0],
    locationArray: ['Click', 'SA', 'SB', 'SC', 'SD', 'FB', 'CB', 'PB', 'MA', 'MB', 'EE', 'EB'],
    locationIndex: 0,
  },
  
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      locationIndex: e.detail.value
    })
  },

  addCourse:function(){
    this.setData({showModalStatus : true})
  },

  cancel:function(event){
    this.setData({showModalStatus : false})
  },

  submitSchedule: function (event) {
    var that = this;
    var scheduleInfo = event.detail.value;
    // var dayOfWeek = scheduleInfo.dayOfWeek;
    var i = this.data.multiIndex;
    var j = this.data.multiArray;
    var dayOfWeek = j[0][i[0]];
    var timePeriod = j[1][i[1]]
    var classNum = scheduleInfo.classNum;
    var className = scheduleInfo.className;
    var tutor = scheduleInfo.tutor;
    var location = this.data.locationArray[this.data.locationIndex];
    var location2 = scheduleInfo.address;
    // var location = scheduleInfo.address;

      if(dayOfWeek == "Click" || dayOfWeek == "" || dayOfWeek == null || dayOfWeek == undefined || timePeriod == "Click" || timePeriod == "" || timePeriod == null || timePeriod == undefined||
      classNum == "" || classNum == null || classNum == undefined ||
      className == "" || className == null || className == undefined||
      tutor == "" || tutor == null || tutor == undefined||
      location == "Click" ||location == "" || location == null || location == undefined ||
      location2 == "" || location2 == null || location2 == undefined){
                wx.showModal({
                  title: 'Notice',
                  content: 'All items should not be empty',
                  confirmColor: '#2EA7E0',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {//这里是点击了确定以后
                      console.log('用户点击确定')
                    } else {//这里是点击了取消以后
                      console.log('用户点击取消')
                    }
                  }
                })
              // }else  if(location.indexOf(" ") != -1)
              // {
              //     console.log("location以空格分隔");
              // }else{
              //   wx.showModal({
              //     title: 'Notice',
              //     content: 'location need be sparate by blank space(eg. SC 336)',
              //     confirmColor: '#2EA7E0',
              //     showCancel: false,
              //     success: function (res) {
              //       if (res.confirm) {//这里是点击了确定以后
              //       } else {//这里是点击了取消以后
              //       }
              //     }
              //   })
              }
            
          
    if(location)
    wx.setStorage({
      key: 'scheduleInfo',
      data: scheduleInfo,
      success:function(res){
        that.setData({showModalStatus:false})
      }
    })

    // var that = this;
    // var scheduleInfo = event.detail.value;
    if (dayOfWeek == 'Mon') {
      dayOfWeek = '1';
    } else if (dayOfWeek == 'Tue') {
      dayOfWeek = '2';
    } else if (dayOfWeek == 'Wed') {
      dayOfWeek = '3';
    } else if (dayOfWeek == 'Thu') {
      dayOfWeek = '4';
    } else if (dayOfWeek == 'Fri') {
      dayOfWeek = '5';
    } else if (dayOfWeek == 'Sat') {
      dayOfWeek = '6';
    } else if (dayOfWeek == 'Sun') {
      dayOfWeek = '7';
    }
    var app = getApp()
    var sclist = app.globalData.database;
    sclist = sclist.concat([{
      "dayOfWeek": dayOfWeek,
      "timePeriod": timePeriod,
      "classNum": classNum,
      "className": className,
      "tutor": tutor,
      "address": location + location2,
    }]);
    app.globalData.database = sclist
    this.onLoad()
    
  },

  // myonLoad: function(options){
  //   var that = this;
  //   var app = getApp()
  //   var scheduleList = app.globalData.database;
  //   wx.getStorage({
  //     key: 'scheduleInfo',
  //     success: function(res){
  //       that.setData({
  //         scheduleList: res.data
          
  //       })
  //     }
  //   })
    

  //   var daysArray = getSevenDays();
  //   var sch_listData = dealData(scheduleList);


  //   this.setData({
  //     dateArray: daysArray,
  //     sch_listData: sch_listData,
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    var scheduleList = app.globalData.database;
    wx.getStorage({
      key: 'scheduleInfo',
      success: function(res){
        that.setData({
          scheduleList: res.data
        })
      }
    })

    var daysArray = getSevenDays();
    var sch_listData = dealData(scheduleList);


    this.setData({
      dateArray: daysArray,
      sch_listData: sch_listData,
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
    // var that = this;
    // GetDepartment_info(that);
    this.onLoad();
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

  clickDoctor: function (e) {
    var $dict = e.currentTarget.dataset;

    var tag = $dict.dayofweek;//周几
    var appdate = '';
    for (var k = 0; k < weeksArray.length; k++) {
      if (weeksArray[k].weekNum == tag - 1) {
        appdate = weeksArray[k].date_text;
      }
    }
    var dd = new Date();
    appdate = dd.getFullYear() + '/' + appdate;


    var str = '';
    var timeStr = $dict.timeperiod;
    if (timeStr=="9"){
      timeStr = '9:00';
    } 
      else if (timeStr=="10"){
      timeStr = '10:00';
    } 
      else if (timeStr=="11"){
      timeStr = '11:00';
    }
      else if (timeStr=="12"){
      timeStr = '12:00';
    }
      else if (timeStr=="13"){
      timeStr = '13:00';
    }
      else if (timeStr=="14"){
      timeStr = '14:00';
    }
      else if (timeStr=="15"){
      timeStr = '15:00';
    }
      else if (timeStr=="16"){
      timeStr = '16:00';
    }
      else if (timeStr=="17"){
      timeStr = '17:00';
    }
      else if (timeStr=="18"){
      timeStr = '18:00';
    }
      else{
      timeStr = '19:00';
    }



    wx.showModal({
      title: 'Details',
      content: appdate + ' ' + timeStr + ' \n' + 'Course:  ' + $dict.docname + ' \n' + 'Tutor:  ' + $dict.tutor + ' \n' + 'Location:  ' + $dict.address,
      confirmText: "CONFIRM",
      cancelText: "DELETE",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
        else{
          var that = this;
          var app = getApp();
          var jiaqigege = app.globalData.database;
          console.log(111111111);
          console.log(typeof tag, typeof $dict.timeperiod)
          for (var i = 0; i < jiaqigege.length; i++) {
            if (jiaqigege[i].dayOfWeek == tag && jiaqigege[i].timePeriod == $dict.timeperiod) {
              console.log(111111111);
              console.log(tag, $dict.timeperiod)
              console.log(222222,jiaqigege[i])
              delete jiaqigege[i];

              var final = [];
              for(var i=0;i<jiaqigege.length;i++){
                if(jiaqigege[i] != null){
                  final = final.concat([jiaqigege[i]]);
                }
              }
              app.globalData.database = final;
              const pages = getCurrentPages();
              const perpage = pages[pages.length - 1];
              perpage.onLoad();
              // this.onShow();
              // wx.switchTab({
              //   url: "pages/index/index",
              // })
              // console.log(app.globalData.database);
              break;
            }
          }
        }
      }
    })
  },

})




var getSevenDays = function () {
  var daysArray = [];
  var dayDict = {};
  var weekStr = '';
  var weekNum = '';

  for (var i = 0; i < 7; i++) {
    var date = new Date(); //当前日期
    var newDate = new Date();
    newDate.setDate(date.getDate() + i);

    var m = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
    var d = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();

    var time = newDate.getFullYear() + "-" + m + "-" + d;
    var dayStr = m + "/" + d;

    if (getWeekByDay(time) == 'Mon') {
      weekNum = 0;
    } else if (getWeekByDay(time) == 'Tues') {
      weekNum = 1;
    } else if (getWeekByDay(time) == 'Wed') {
      weekNum = 2;
    } else if (getWeekByDay(time) == 'Thur') {
      weekNum = 3;
    } else if (getWeekByDay(time) == 'Fri') {
      weekNum = 4;
    } else if (getWeekByDay(time) == 'Sat') {
      weekNum = 5;
    } else if (getWeekByDay(time) == 'Sun') {
      weekNum = 6;
    }
    dayDict = { "date_text": dayStr, "weekName": getWeekByDay(time), "weekNum": weekNum };

    console.log("date_text:" + dayStr + "weekName:" + getWeekByDay(time) + "weekNum:" + weekNum)
    daysArray.push(dayDict);
  }

  weeksArray = daysArray;
  return daysArray;
}

var getWeekByDay = function (dayValue) {
  var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化  
  var today = new Array("Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"); //创建星期数组  
  return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日  
}


var dealData = function (scheduleInfoList) {
  var tag = weeksArray[0].weekNum;
  console.log('tag:' + tag);
  var ar = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
  var A_Mon_text_ar = [];
  var A_Tues_text_ar = [];
  var A_Wed_text_ar = [];
  var A_Thur_text_ar = [];
  var A_Fri_text_ar = [];
  var A_Sat_text_ar = [];
  var A_Sun_text_ar = [];
  var B_Mon_text_ar = [];
  var B_Tues_text_ar = [];
  var B_Wed_text_ar = [];
  var B_Thur_text_ar = [];
  var B_Fri_text_ar = [];
  var B_Sat_text_ar = [];
  var B_Sun_text_ar = [];
  var C_Mon_text_ar = [];
  var C_Tues_text_ar = [];
  var C_Wed_text_ar = [];
  var C_Thur_text_ar = [];
  var C_Fri_text_ar = [];
  var C_Sat_text_ar = [];
  var C_Sun_text_ar = [];
  var D_Mon_text_ar = [];
  var D_Tues_text_ar = [];
  var D_Wed_text_ar = [];
  var D_Thur_text_ar = [];
  var D_Fri_text_ar = [];
  var D_Sat_text_ar = [];
  var D_Sun_text_ar = [];
  var E_Mon_text_ar = [];
  var E_Tues_text_ar = [];
  var E_Wed_text_ar = [];
  var E_Thur_text_ar = [];
  var E_Fri_text_ar = [];
  var E_Sat_text_ar = [];
  var E_Sun_text_ar = [];
  var F_Mon_text_ar = [];
  var F_Tues_text_ar = [];
  var F_Wed_text_ar = [];
  var F_Thur_text_ar = [];
  var F_Fri_text_ar = [];
  var F_Sat_text_ar = [];
  var F_Sun_text_ar = [];
  var G_Mon_text_ar = [];
  var G_Tues_text_ar = [];
  var G_Wed_text_ar = [];
  var G_Thur_text_ar = [];
  var G_Fri_text_ar = [];
  var G_Sat_text_ar = [];
  var G_Sun_text_ar = [];
  var H_Mon_text_ar = [];
  var H_Tues_text_ar = [];
  var H_Wed_text_ar = [];
  var H_Thur_text_ar = [];
  var H_Fri_text_ar = [];
  var H_Sat_text_ar = [];
  var H_Sun_text_ar = [];
  var I_Mon_text_ar = [];
  var I_Tues_text_ar = [];
  var I_Wed_text_ar = [];
  var I_Thur_text_ar = [];
  var I_Fri_text_ar = [];
  var I_Sat_text_ar = [];
  var I_Sun_text_ar = [];
  var J_Mon_text_ar = [];
  var J_Tues_text_ar = [];
  var J_Wed_text_ar = [];
  var J_Thur_text_ar = [];
  var J_Fri_text_ar = [];
  var J_Sat_text_ar = [];
  var J_Sun_text_ar = [];
  var K_Mon_text_ar = [];
  var K_Tues_text_ar = [];
  var K_Wed_text_ar = [];
  var K_Thur_text_ar = [];
  var K_Fri_text_ar = [];
  var K_Sat_text_ar = [];
  var K_Sun_text_ar = [];

  for (var i = 0; i < scheduleInfoList.length; i++) {
    // console.log(scheduleInfoList[i].scheduleId + "222222");
    if (scheduleInfoList[i].timePeriod == '9') {
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        A_Mon_text_ar = A_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        A_Tues_text_ar = A_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        A_Wed_text_ar = A_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        A_Thur_text_ar = A_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        A_Fri_text_ar = A_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        A_Sat_text_ar = A_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        A_Sun_text_ar = A_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '10') {
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        B_Mon_text_ar = B_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        B_Tues_text_ar = B_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        B_Wed_text_ar = B_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        B_Thur_text_ar = B_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        B_Fri_text_ar = B_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        B_Sat_text_ar = B_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        B_Sun_text_ar = B_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    } 
    else if (scheduleInfoList[i].timePeriod == '11'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        C_Mon_text_ar = C_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        C_Tues_text_ar = C_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        C_Wed_text_ar = C_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        C_Thur_text_ar = C_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        C_Fri_text_ar = C_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        C_Sat_text_ar = C_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        C_Sun_text_ar = C_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '12'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        D_Mon_text_ar = D_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        D_Tues_text_ar = D_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        D_Wed_text_ar = D_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        D_Thur_text_ar = D_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        D_Fri_text_ar = D_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        D_Sat_text_ar = D_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        D_Sun_text_ar = D_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '13'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        E_Mon_text_ar = E_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        E_Tues_text_ar = E_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        E_Wed_text_ar = E_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        E_Thur_text_ar = E_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        E_Fri_text_ar = E_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        E_Sat_text_ar = E_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        E_Sun_text_ar = E_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '14'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        F_Mon_text_ar = F_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        F_Tues_text_ar = F_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        F_Wed_text_ar = F_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        F_Thur_text_ar = F_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        F_Fri_text_ar = F_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        F_Sat_text_ar = F_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        F_Sun_text_ar = F_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '15'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        G_Mon_text_ar = G_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        G_Tues_text_ar = G_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        G_Wed_text_ar = G_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        G_Thur_text_ar = G_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        G_Fri_text_ar = G_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        G_Sat_text_ar = G_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        G_Sun_text_ar = G_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '16'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        H_Mon_text_ar = H_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        H_Tues_text_ar = H_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        H_Wed_text_ar = H_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        H_Thur_text_ar = H_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        H_Fri_text_ar = H_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        H_Sat_text_ar = H_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        H_Sun_text_ar = H_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '17'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        I_Mon_text_ar = I_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        I_Tues_text_ar = I_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        I_Wed_text_ar = I_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        I_Thur_text_ar = I_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        I_Fri_text_ar = I_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        I_Sat_text_ar = I_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        I_Sun_text_ar = I_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '18'){
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        J_Mon_text_ar = J_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        J_Tues_text_ar = J_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        J_Wed_text_ar = J_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        J_Thur_text_ar = J_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        J_Fri_text_ar = J_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        J_Sat_text_ar = J_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        J_Sun_text_ar = J_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else {
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        K_Mon_text_ar = K_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        K_Tues_text_ar = K_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        K_Wed_text_ar = K_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        K_Thur_text_ar = K_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        K_Fri_text_ar = K_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        K_Sat_text_ar = K_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        K_Sun_text_ar = K_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
  }

  var sch_listData = [{ "time_title": "9:00", "Mon_text": A_Mon_text_ar, "Tues_text": A_Tues_text_ar, "Wed_text": A_Wed_text_ar, "Thur_text": A_Thur_text_ar, "Fri_text": A_Fri_text_ar, "Sat_text": A_Sat_text_ar, "Sun_text": A_Sun_text_ar },
  { "time_title": "10:00", "Mon_text": B_Mon_text_ar, "Tues_text": B_Tues_text_ar, "Wed_text": B_Wed_text_ar, "Thur_text": B_Thur_text_ar, "Fri_text": B_Fri_text_ar, "Sat_text": B_Sat_text_ar, "Sun_text": B_Sun_text_ar },
  { "time_title": "11:00", "Mon_text": C_Mon_text_ar, "Tues_text": C_Tues_text_ar, "Wed_text": C_Wed_text_ar, "Thur_text": C_Thur_text_ar, "Fri_text": C_Fri_text_ar, "Sat_text": C_Sat_text_ar, "Sun_text": C_Sun_text_ar },
  { "time_title": "12:00", "Mon_text": D_Mon_text_ar, "Tues_text": D_Tues_text_ar, "Wed_text": D_Wed_text_ar, "Thur_text": D_Thur_text_ar, "Fri_text": D_Fri_text_ar, "Sat_text": D_Sat_text_ar, "Sun_text": D_Sun_text_ar },
  { "time_title": "13:00", "Mon_text": E_Mon_text_ar, "Tues_text": E_Tues_text_ar, "Wed_text": E_Wed_text_ar, "Thur_text": E_Thur_text_ar, "Fri_text": E_Fri_text_ar, "Sat_text": E_Sat_text_ar, "Sun_text": E_Sun_text_ar },
  { "time_title": "14:00", "Mon_text": F_Mon_text_ar, "Tues_text": F_Tues_text_ar, "Wed_text": F_Wed_text_ar, "Thur_text": F_Thur_text_ar, "Fri_text": F_Fri_text_ar, "Sat_text": F_Sat_text_ar, "Sun_text": F_Sun_text_ar },
  { "time_title": "15:00", "Mon_text": G_Mon_text_ar, "Tues_text": G_Tues_text_ar, "Wed_text": G_Wed_text_ar, "Thur_text": G_Thur_text_ar, "Fri_text": G_Fri_text_ar, "Sat_text": G_Sat_text_ar, "Sun_text": G_Sun_text_ar },
  { "time_title": "16:00", "Mon_text": H_Mon_text_ar, "Tues_text": H_Tues_text_ar, "Wed_text": H_Wed_text_ar, "Thur_text": H_Thur_text_ar, "Fri_text": H_Fri_text_ar, "Sat_text": H_Sat_text_ar, "Sun_text": H_Sun_text_ar },
  { "time_title": "17:00", "Mon_text": I_Mon_text_ar, "Tues_text": I_Tues_text_ar, "Wed_text": I_Wed_text_ar, "Thur_text": I_Thur_text_ar, "Fri_text": I_Fri_text_ar, "Sat_text": I_Sat_text_ar, "Sun_text": I_Sun_text_ar },
  { "time_title": "18:00", "Mon_text": J_Mon_text_ar, "Tues_text": J_Tues_text_ar, "Wed_text": J_Wed_text_ar, "Thur_text": J_Thur_text_ar, "Fri_text": J_Fri_text_ar, "Sat_text": J_Sat_text_ar, "Sun_text": J_Sun_text_ar },
  { "time_title": "19:00", "Mon_text": K_Mon_text_ar, "Tues_text": K_Tues_text_ar, "Wed_text": K_Wed_text_ar, "Thur_text": K_Thur_text_ar, "Fri_text": K_Fri_text_ar, "Sat_text": K_Sat_text_ar, "Sun_text": K_Sun_text_ar }]
  return sch_listData;
}

