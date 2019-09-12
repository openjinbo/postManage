//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    routers: [
      {
        name: '揽件登记',
        url: '/pages/reviceRegist/reviceRegist',
        icon: '/images/image-postRegist.png',
        code: '10'
      },
      {
        name: '派件登记',
        url: '/pages/postRegist/postRegist',
        icon: '/images/image-post.png',
        code: '11'
      },
      {
        name: '线索报查',
        url: '/pages/clueReport/clueReport',
        icon: '/images/image-report.png',
        code: '14'
      },
      {
        name: '单位信息',
        url: '/pages/companyInfo/companyInfo',
        icon: '/images/image-company.png',
        code: '12'
      },
      {
        name: '揽件核查',
        url: '/pages/companyInfo/companyInfo',
        icon: '/images/image-check.png',
        code: '12'
      },
      {
        name: '员工信息',
        url: '/pages/employeeInfo/employeeInfo',
        icon: '/images/image-people.png',
        code: '13'
      },

      {
        name: '通知通告',
        url: '/pages/systemInfo/systemInfo',
        icon: '/images/image-helpInfo.png',
        code: '15'
      },
      {
        name: '法律法规',
        url: '/pages/lawInfo/lawInfo',
        icon: '/images/image-lawInfo.png',
        code: '16'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  bindGetuserinfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showHelpInfo: function (e) {
    wx.showModal({
      title: '帮助信息',
      content: '本软件由神盾软件开发有限公司开发，如有问题请拨打电话：\r\n0519-89880786',
      showCancel: false
    })
  }
})
