// pages/column/column.js
let data=require("../datas/column")
Page({
  data: {
    select:"动漫杂谈",
    item:["动漫杂谈","动漫资讯"],
    content:{},
    current:0
  },
  select:function(e){
    this.setData({
      select:e.currentTarget.dataset.item,
      current:e.currentTarget.dataset.index
    })
  },
  current:function(e){
    this.setData({
      select:this.data.item[e.detail.current],
      current:e.detail.current
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail2/detail2?index='+e.currentTarget.dataset.index+'&current='+this.data.current,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content:{
        "动漫杂谈":data.miscellany,
        "动漫资讯":data.information
      }
    })
    wx.showNavigationBarLoading()
  },
  Imgload:function(e){
    wx.hideNavigationBarLoading()
  },
  onShareAppMessage: function () {
    
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