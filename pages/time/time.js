// pages/time/time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekly:{'一':'Mon','二':'Tue','三':'Wed','四':'Thu','五':'Fri','六':'Sat','日':'Sun'},
    weekly_index:['一','二','三','四','五','六','日'],
    //calendar
    arr:[],
    none:'暂无信息',
    select:'一',
    current:0
  },
  select:function(e){
    this.setData({
      select:e.currentTarget.dataset.index,
    })
    var index=0
    switch(this.data.select){
      case '一':index=0;break;
      case '二':index=1;break;
      case '三':index=2;break;
      case '四':index=3;break;
      case '五':index=4;break;
      case '六':index=5;break;
      case '日':index=6;break;
    }
    this.setData({
      current:index
    })
  },
  current:function(e){
    this.setData({
      select:this.data.weekly_index[e.detail.current]
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://api.bgm.tv/calendar',
      success:(res)=>{
        this.setData({
          arr:res.data
        })
      }
    })
    wx.showNavigationBarLoading()
  },
  Imgload:function(e){
    wx.hideNavigationBarLoading()
  },
  onShareAppMessage: function () {
    return{
      title:'时间表'
    }
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
})