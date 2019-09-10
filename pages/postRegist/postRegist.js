// pages/postRegist/postRegist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postName: '',
    tel: '',
    addr: '',
    goods:'',
    consigneeName: '',
    consigneeTel: '',
    consigneeAddr: ''
  },

  bindinput_postName: function (e) {
    this.setData({
      postName: e.detail.value
    })
  },

  bindinput_tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  bindinput_addr: function (e) {
    this.setData({
      addr: e.detail.value
    })
  },

  bindinput_goods: function (e) {
    this.setData({
      goods: e.detail.value
    })
  },

  bindinput_consigneeName: function (e) {
    this.setData({
      consigneeName: e.detail.value
    })
  },

  bindinput_consigneeTel: function (e) {
    this.setData({
      consigneeTel: e.detail.value
    })
  },

  bindinput_consigneeAddr: function (e) {
    this.setData({
      consigneeAddr: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var postName = wx.getStorageSync("postName");
    var tel = wx.getStorageSync("tel");
    var addr = wx.getStorageSync("addr");
    var goods = wx.getStorageSync("goods");
    var consigneeName = wx.getStorageSync("consigneeName");
    var consigneeTel = wx.getStorageSync("consigneeTel");
    var consigneeAddr = wx.getStorageSync("consigneeAddr");

    wx.removeStorageSync("postName");
    wx.removeStorageSync("tel");
    wx.removeStorageSync("addr");
    wx.removeStorageSync("goods");
    wx.removeStorageSync("consigneeName");
    wx.removeStorageSync("consigneeTel");
    wx.removeStorageSync("consigneeAddr");

    this.setData({
      postName: postName,
      tel: tel,
      addr: addr,
      goods: goods,
      consigneeName: consigneeName,
      consigneeTel: consigneeTel,
      consigneeAddr: consigneeAddr,
    })
  },

  btnSave: function (param) {
    // 收件人check
    var userName = this.data.postName;
    var name = /^[u4E00-u9FA5]+$/;
    if (userName == '') {
      wx.showToast({
        title: '姓名不可以为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    // 寄件人电话check
    var mobile = this.data.tel;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (mobile == '') {
      wx.showToast({
        title: '寄件人手机号码不能为空',
        icon: 'none',
        duration: 1000
      })

      return false;
    } else if (mobile.length < 11) {
      wx.showToast({
        title: '寄件人手机号码长度有误！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    // 住址check
    var addr = this.data.addr;
    if (addr == '') {
      wx.showToast({
        title: '寄件人住址不可以为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    // 物品名称check
    var goods = this.data.goods;
    if (goods == '') {
      wx.showToast({
        title: '物品名称不可以为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    // 收件人名称check
    var consigneeName = this.data.consigneeName;
    if (consigneeName == '') {
      wx.showToast({
        title: '收件人名称不可以为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    // 收件人电话check
    var consigneeTel = this.data.consigneeTel;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (consigneeTel == '') {
      wx.showToast({
        title: '收件人手机号码不能为空',
        icon: 'none',
        duration: 1000
      })

      return false;
    } else if (consigneeTel.length < 11) {
      wx.showToast({
        title: '收件人手机号码长度有误！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    // 收件人地址check
    var consigneeAddr = this.data.consigneeAddr;
    if (consigneeAddr == '') {
      wx.showToast({
        title: '收件人地址不可以为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    wx.setStorageSync("postName", this.data.postName);
    wx.setStorageSync("tel", this.data.tel);
    wx.setStorageSync("addr", this.data.addr);
    wx.setStorageSync("goods", this.data.goods);
    wx.setStorageSync("consigneeName", this.data.consigneeName);
    wx.setStorageSync("consigneeTel", this.data.consigneeTel);
    wx.setStorageSync("consigneeAddr", this.data.consigneeAddr);

    wx.showModal({
      title: '保存成功',
      content: '',
      success: function (res) {
        if (res.confirm) {
          // API保存数据
        }
      }
    })
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

  }
})