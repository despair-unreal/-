let data=require("../datas/index")
Page({
  data: {
    userAvatar:'',
    block:{},
    icon:{},
    swiper:[],
    hot:{},
    hot_icon:['/imgs/排行榜-第1.png','/imgs/排行榜-第2.png','/imgs/排行榜-第3.png']
  },
  url:['/pages/all/all','/pages/time/time','/pages/newRecomm/newRecomm','/pages/oldRecomm/oldRecomm','/pages/search/search'],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      swiper:data.swiper,
      block:{
        '兴趣推荐':data.interest,
        '日常·番剧':data.daily,
        '少女·番剧':data.girl,
        '智斗·番剧':data.wits
      },
      icon:{
        '全部番剧':data.icon[0],
        '时间表':data.icon[1],
        '新番推荐':data.icon[2],
        '老番推荐':data.icon[3]
      },
      hot:{
        "热门番剧":data.ja,
        "热门国创":data.ch,
        "热门完结":data.over
      }
    })
    wx.showNavigationBarLoading()
  },
  onShow: function () {
    wx.getStorage({
      key: 'userMsg',
      success:(res)=>{
        this.setData({
          userAvatar:res.data.avatarUrl
        })
      }
    })
  },
  toOther:function(e){
    var index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: this.url[index]
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
    })
  },
  Imgload:function(e){
    wx.hideNavigationBarLoading()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  

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