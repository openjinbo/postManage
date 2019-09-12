// pages/clueReport/clueReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postNo: '',
    goods: '',
    comment: '',
    tempFilePaths: ''
  },

  bindinput_postNo: function (e) {
    this.setData({
      postNo: e.detail.value
    })
  },

  bindinput_goods: function (e) {
    this.setData({
      goods: e.detail.value
    })
  },

  bindinput_comment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var postNo = wx.getStorageSync("postNo");
    var goods = wx.getStorageSync("goods");
    var comment = wx.getStorageSync("comment");
    var tempFilePaths = wx.getStorageSync("tempFilePaths");

    wx.removeStorageSync("postNo");
    wx.removeStorageSync("goods");
    wx.removeStorageSync("comment");
    wx.removeStorageSync("tempFilePaths");

    this.setData({
      postNo: postNo,
      goods: goods,
      comment: comment,
      tempFilePaths: tempFilePaths
    })
  },

  getImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
    /*
    这里说说sourcetype.默认是从相册获取和使用相机拍照,跟微信现在选择图片的界面一样,第一格是拍照,后面的是相册照片.
    这里注意:返回的是图片在本地的路径.如果需要将图片上传到服务器,需要用到另一个API.
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user': 'test'
          },
          success: function(res){
            var data = res.data
            //do something
          }
        })
      }
    })
    */
  },

  btnSave: function (param) {

    // 快递单号check
    var postNo = this.data.postNo;
    if (postNo == '') {
      wx.showToast({
        title: '快递单号不可以为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    // 照片check
    var tempFilePaths = this.data.tempFilePaths;
    if (tempFilePaths == '' || tempFilePaths == '/images/image_default.png') {
      wx.showToast({
        title: '请采集怀疑物品照片',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    wx.setStorageSync("postNo", this.data.postNo);
    wx.setStorageSync("goods", this.data.goods);
    wx.setStorageSync("comment", this.data.comment);
    wx.setStorageSync("tempFilePaths", this.data.tempFilePaths);

    wx.showModal({
      title: '提交成功',
      content: '',
      success: function (res) {
        if (res.confirm) {
          // API保存数据
        }
      }
    })
  },

  /**
   * 扫描条形码或二维码（相册和相机都可）
   */
  getQRCode: function () {
    var that = this;
    var show;
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode'],
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        console.log(this.show);
        this.setData({
          postNo: res.result
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.tempFilePaths == '') {
      this.setData({
        tempFilePaths: '/images/image_default.png'
      })
      wx.removeStorageSync("tempFilePaths");
    }
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