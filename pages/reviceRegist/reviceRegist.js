// pages/postRegist/postRegist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    identityNo: '',
    tel: '',
    goods:'',
    postNo: '',
    consigneeTel:'',
    defaultImage: '',
    showCompanyModal: false,
    companyArray: '',
    screenHeight: 0,
    protocolkbn:'',
    orCodeImage:''
  },

  unProtocolBtn: function (e) {
    this.setData({
      protocolkbn: '0'
    })
  },

  protocolBtn: function (e) {
    this.setData({
      protocolkbn: '1'
    })
  },

  bindinput_identity: function (e) {
    this.setData({
      identityNo: e.detail.value
    })
  },

  bindinput_tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  bindinput_goods: function (e) {
    this.setData({
      goods: e.detail.value
    })
  },

  bindinput_postNo: function (e) {
    this.setData({
      postNo: e.detail.value
    })
  },

  bindinput_consigneeTel: function (e) {
    this.setData({
      consigneeTel: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var identityNo = wx.getStorageSync("identityNo");
    var tel = wx.getStorageSync("tel");
    var goods = wx.getStorageSync("goods");
    var postNo = wx.getStorageSync("postNo");
    var consigneeTel = wx.getStorageSync("consigneeTel");
    var defaultImage = wx.getStorageSync("defaultImage");

    wx.removeStorageSync("identityNo");
    wx.removeStorageSync("tel");
    wx.removeStorageSync("goods");
    wx.removeStorageSync("postNo");
    wx.removeStorageSync("consigneeTel");
    wx.removeStorageSync("defaultImage");
    var screenHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.screenHeight;
      },
    });

    this.setData({
      identityNo: identityNo,
      tel: tel,
      goods: goods,
      postNo: postNo,
      consigneeTel: consigneeTel,
      defaultImage: defaultImage,
      screenHeight: screenHeight
    })
  },

  getImage: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
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

  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },

  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  btnSave: function (param) {

    // 身份证号check
    var ts = this;
    var code = this.data.identityNo;
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (code == '') {
      tip = "请输入身份证号";
      pass = false;
    } else if (!code || !code.match(reg)) {
      tip = "身份证号格式错误";
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      tip = "身份证号地址编码错误"; pass = false;
    } else {
      //18位身份证需要验证最后一位校验位 
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)  
        //加权因子  
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位  
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          tip = "身份证号校验位错误";
          pass = false;
        }
      }
    }
    if (!pass) {
      wx.showToast({
        title: tip,
        icon: 'none',
        duration: 1000
      })
      return pass;
    }


    // 寄件人手机号码check
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

    // // 物品名称check
    // var goods = this.data.goods;
    // if (goods == '') {
    //   wx.showToast({
    //     title: '物品名称不可以为空',
    //     icon: 'none',
    //     duration: 1000,
    //     mask: true
    //   })
    //   return false;
    // }

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

    // 收件人电话check
    var consigneeTel = this.data.consigneeTel;
    if (consigneeTel == '') {
      wx.showToast({
        title: '收件人电话不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (consigneeTel.length < 11) {
      wx.showToast({
        title: '收件人电话长度有误！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    // 照片check
    var tempFilePaths = this.data.tempFilePaths;
    if (tempFilePaths == '' || tempFilePaths == '/images/image_default.png') {
      wx.showToast({
        title: '请采集开箱验视照片',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }

    wx.setStorageSync("identityNo", this.data.identityNo);
    wx.setStorageSync("tel", this.data.tel);
    wx.setStorageSync("goods", this.data.goods);
    wx.setStorageSync("postNo", this.data.postNo);
    wx.setStorageSync("consigneeTel", this.data.consigneeTel);
    wx.setStorageSync("defaultImage", this.data.defaultImage);

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
   * 扫描条形码或二维码（相册和相机都可）
   */
  getQRCode: function () {
    var that = this;
    var show;
    var tmpImage;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表
        tmpImage = res.tempFilePaths
        wx.scanCode({
          onlyFromCamera: false,
          scanType: ['barCode', 'qrCode'],
          success: (res) => {
            this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
            that.setData({
              postNo: res.result,
              orCodeImage: tmpImage
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
      }
    })
  },

  // 预览图片
  previewOrCodeImg: function () {
    var tmpImg = this.data.orCodeImage;
    wx.previewImage({
      current: tmpImg,
      urls: tmpImg,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.defaultImage == '') {
      this.setData({
        defaultImage: '/images/image_default.png'
      })
      wx.removeStorageSync("defaultImage");
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