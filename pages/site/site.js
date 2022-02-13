// pages/site/site.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:118.540866,
    latitude:24.904501,
    mark:[{
      id:0,
      longitude:118.540866,
      latitude:24.904501,
      iconPath:'/imgs/位置.png',
      width:'40px',
      height:'40px'
    }] 
  },
  userInfo:{},
  address:'',
  name:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success:(res)=>{
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success:(res)=>{
              wx.getLocation({
                type:'gcj02',
                success:(res)=>{
                  this.getAddress(res.latitude, res.longitude)
                }
              })
            }
          })
        }else{
          wx.getLocation({
            type:'gcj02',
            success:(res)=>{
              this.getAddress(res.latitude,res.longitude)
            }
          })
        }
      }
    })
    wx.getStorage({
      key: 'userMsg',
      success:(res)=>{
        this.userInfo=res.data
      }
    })
    wx.showNavigationBarLoading()
  },
  getAddress:function(latitude, longitude){
    var markLongi='mark[0].longitude'
    var markLati='mark[0].latitude'
    this.setData({
      longitude:longitude,
      latitude:latitude, 
      [markLongi]:longitude,
      [markLati]:latitude
    })
    wx.request({
      url: 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=n3qvIzoLtqDDd0q9dlTUZScrlCU6zAIq&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude,
      success:(res)=>{
        this.userInfo.city=res.data.result.addressComponent.city
        this.userInfo.country=res.data.result.addressComponent.country
        this.userInfo.province=res.data.result.addressComponent.province
        this.name=this.userInfo.province+this.userInfo.city+res.data.result.addressComponent.district+res.data.result.addressComponent.town+res.data.result.addressComponent.street+res.data.result.addressComponent.street_number+res.data.result.addressComponent.direction
        this.address=res.data.result.formatted_address
        wx.setStorage({
          data: this.userInfo,
          key: 'userMsg',
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  markerTap:function(e){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name:this.name,
      address:this.address
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