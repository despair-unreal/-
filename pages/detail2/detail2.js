// pages/detail2/detail2.js
let data=require("../datas/column")
Page({

  data: {
    isMusicPlay:false,
    isLike:false,
    isCollect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    switch(options.current){
      case '0':this.setData({content:data.miscellany[options.index]});break;
      case '1':this.setData({content:data.information[options.index]});break;
    }
    wx.setNavigationBarTitle({
      title: this.data.content.title,
    })
    this.musicPlay()
    wx.onBackgroundAudioPlay((res) => {
      this.setData({
        isMusicPlay:true
      })
    })
    wx.onBackgroundAudioPause((res) => {
      this.setData({
        isMusicPlay:false
      })
    })
    wx.showNavigationBarLoading()
  },
  musicPlay:function(e){
    this.setData({
      isMusicPlay:!this.data.isMusicPlay
    })
    if(this.data.isMusicPlay){
      wx.playBackgroundAudio({
        dataUrl: this.data.content.music,
        title: this.data.content.musicTitle
      })
      wx.onBackgroundAudioStop(()=>{this.setData({isMusicPlay:false})})
    }else{
      wx.pauseBackgroundAudio()
    }
  },
  onUnload: function (e) {
    if(this.data.isMusicPlay)
      wx.pauseBackgroundAudio()
  },
  collect:function(e){
    var collect='content.collect'
    this.setData({
      isCollect:!this.data.isCollect
    })
    if(this.data.isCollect){
      this.setData({
        [collect]:this.data.content.collect+1
      })
      wx.showToast({
        title: '收藏成功',
        icon:'success'
      })
    }else{
      this.setData({
        [collect]:this.data.content.collect-1
      })
      wx.showToast({
        title: '取消成功',
        icon:'success'
      })
    }
  },
  toPv:function(e){
    var pv = JSON.stringify(this.data.content.pv);
    wx.navigateTo({
      url: '/pages/pv/pv?pv='+pv,
    })
    if(this.data.isMusicPlay)
      wx.pauseBackgroundAudio()
  }
  ,
  like:function(e){
    var like='content.like'
    this.setData({
      isLike:!this.data.isLike,
    })
    if(this.data.isLike){
      this.setData({
        [like]:this.data.content.like+1
      })
      wx.showToast({
        title: '点赞成功',
        icon:'success'
      })
    }else{
      this.setData({
        [like]:this.data.content.like-1
      })
      wx.showToast({
        title: '取消成功',
        icon:'success'
      })
    }
  },
  Imgload:function(e){
    wx.hideNavigationBarLoading()
  },
  onShareAppMessage: function () {
    return{
      title:this.data.content.title
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