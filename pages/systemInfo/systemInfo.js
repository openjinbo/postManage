// pages/systemInfo/systemInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos: [
      {
        name: '公告―市局',
        msg:'关于加强特性管理的通知！',
        date:'2019-08-22',
        icon: '/images/image-sysInfoList.png',
        details: '各寄递企业： \n' 
        +'    为贯彻落实新修订的《快递业务经营许可管理办法》，进一步规范快递业务经营许可管理，促进我市快递业健康发展，根据《中华人民共和国安全生产法》《中华人民共和国邮政法》《浙江省邮政业安全生产发展改革实施方案》等相关法律法规和文件相关精神，统筹推进“互联网+政务服务”、“互联网+监管”，现就有关事项通知如下：\n'
          +'        　　一、提升最多跑一次效能\n' 
          +'　　 以人为本，整体协同，对快递经营许可业务涉及杭州市局流程进行优化再造，将邮政业服务“最多跑一次”改革作为重大政治任务，深入推进“互联网+政务服务 + 寄递送达”，进一步创新服务方式，拓展服务领域，提升服务品质，在“让数据多跑路，百姓少跑腿”的基础上，努力让人民群众或企业“零跑腿”。\n'
          + '         　　二、加强许可的源头管理 \n' 
         + '利用大数据分析、探索引入第三方等手段在杭州市局核查环节加强对新许可企业安全保障能力及服务能力的评估，加强筛查力度，特别是对于下列情况的企业现场核查将不予通过：'
      },
      {
        name: '开会通知―邗上派出所',
        msg: '请本辖区日租房单位的前台负责人于2013年10月22日下午到邗上派出所开会！',
        date: '2019-08-22',
        icon: '/images/image-sysInfoList.png',
        details: '详细（略）' 
      },
      {
        name: '使用提示―神盾公司',
        msg: '手机网络保持畅通才能实时传输登记信息！',
        date: '2019-08-22',
        icon: '/images/image-sysInfoList.png',
        details: '详细（略）' 
      },
      {
        name: '通告―市局',
        msg: '注意消防安全！',
        date: '2019-08-22',
        icon: '/images/image-sysInfoList.png',
        details: '详细（略）' 
      },
      {
        name: '公告―神盾公司',
        msg: '日租房登记系统微信小程序V1.0发布！',
        date: '2019-08-22',
        icon: '/images/image-sysInfoList.png',
        details: '详细（略）' 
      }
    ]
  },

  showDetails: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    console.log(this.data.infos[index]);
    var info = JSON.stringify(that.data.infos[index])
    wx.navigateTo({
      url: '/pages/systemInfo/systemDetails?info=' + info
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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