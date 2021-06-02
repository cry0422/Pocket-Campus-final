import resource from '../../lib/resource';

const app = getApp();

Page({
  data: {
    userInfo: {},
    order: {
      icon: 'images/order.png',
      text: 'My Schedule',
      tip: '',
      url: '../shadule/index',

      
    },
    
    orderBadge: {
      unpaid: 0,
      undelivered: 0,
      unreceived: 0
    },
    // orderCell: [
    //   {
    //     icon: 'images/to-be-paid.png',
    //     text: 'My points',
    //     url: '../orders/orders?t=unpaid',
    //     class: 'order-cell-icon-small'
    //   }, {
    //     icon: 'images/to-be-delivered.png',
    //     text: 'Message',
    //     url: '../orders/orders?t=undelivered',
    //     class: 'order-cell-icon-small',
    //   }, {
    //     icon: 'images/to-be-received.png',
    //     text: 'Bus Schedule',
    //     url: '../orders/orders?t=unreceived',
    //     class: 'order-cell-icon-big'
    //   }
    // ],
    list: [
      {
        icon: 'images/address.png',
        text: 'Calendar',
        tip: '',
        cut: true,
        url: '../calendar/calendar'
      }, {
        icon: 'images/tel.png',
        text: 'Telphone',
        tip: '13736751598',
      }, {
        icon: 'images/feedback.png',
        text: 'FeedBack',
        tip: '',
        cut: true,
        url: '../feedback/feedback'
      }, {
        icon: 'images/about.png',
        text: 'About Us',
        tip: '',
        url: '../about/about'
      }
    ]
  },
  
  //点击触发
  onShow(){
    resource.fetchOrderList().then((res) => {
      const orderList = res.data;
      this.countOrder(orderList);
    });
     this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    // 订单列表
    resource.fetchOrderList().then((res) => {
      console.log(233);
      console.log(res);
      const orderList = res.data;
      this.countOrder(orderList);
    });
  },

  
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    if (e.currentTarget.dataset.urlType) {
      wx.navigateTo({
        url: 'user-info/user-info'
      });
    } else {
      if (url === undefined) {
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.tip
        });
      } else {
        wx.navigateTo({
          url
        });
        
      }
    }
  }
});
