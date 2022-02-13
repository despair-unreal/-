// pages/modify/modify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'',
    username:'',
    gender:'',
    bgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F07%2F20151007161256_LEtwx.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626167697&t=c70a4bb5de1453a425bf14c08a93c1ef'
    
  },
  userInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  Imgload:function(e){
    wx.hideNavigationBarLoading()
  },
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'userMsg',
      success (res) {
        console.log(res.data)
        that.setData({
          imageUrl:res.data.avatarUrl,
          username:res.data.nickName,
          gender:res.data.gender
        })
        that.userInfo=res.data
        if(res.data.bgUrl){
          that.setData({
            bgUrl:res.data.bgUrl
          })
        }
      }
    })
    wx.showNavigationBarLoading()
  },
  onShow:function(e){
  },
  changeAvatar:function(e){
    wx.chooseImage({
      count:1,
      sourceType:['album'],
      success:(res)=>{
        this.setData({
          imageUrl:res.tempFiles['0'].path
        })
      }
    })
  },
  changeBg:function(e){
    wx.chooseImage({
      count:1,
      sourceType:['album'],
      success:(res)=>{
        this.setData({
          bgUrl:res.tempFiles['0'].path
        })
      }
    })
  },
  formSubmit:function(e){
    console.log(e)
    this.setData({
      username:e.detail.value.username,
      gender:e.detail.value.gender==="女"?2:e.detail.value.gender==="男"?1:0
    })
    this.userInfo.nickName=this.data.username,
    this.userInfo.gender=this.data.gender,
    this.userInfo.avatarUrl=this.data.imageUrl,
    this.userInfo.bgUrl=this.data.bgUrl
    console.log(this.userInfo)
    wx.setStorage({
      key:"userMsg",
      data:this.userInfo
    })
    wx.showToast({
      title: '保存成功',
    })
  }
})