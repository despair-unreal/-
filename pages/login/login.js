// index.js
// 获取应用实例
Page({
  data: {
    userInfo:{},
    hasUserInfo: false,
  },
  getUserProfile:function (e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      lang:'zh_CN',
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({
          key:"userMsg",
          data:this.data.userInfo
        })
      }
    })
    
  },
  onLoad:function(e){

  },
  navigateTo:function(e){
    wx.switchTab({
      url:'/pages/index/index'
    })
  }
  
})
