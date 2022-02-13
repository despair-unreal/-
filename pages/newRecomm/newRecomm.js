// pages/newRecomm/newRecomm.js
let data=require("../datas/recom")
Page({

  data: {
    newRcom:[]
  },
  like_data:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newRcom:data.newRecom
    })
    wx.getStorage({
      key: 'like',
      success:(res)=>{
        this.like_data=res.data
        for(let i=0;i<this.data.newRcom.length;i++){
          for(let j=0;j<this.like_data.length;j++){
            if(this.like_data[j].id==this.data.newRcom[i].id){
              this.setData({
                ["newRcom["+i+"].Islike"]:true
              })
              break;
            }else{
              this.setData({
                ["newRcom["+i+"].Islike"]:false
              })
            }
          }    
        }
      }
    })
    wx.showNavigationBarLoading()
  },
  Imgload:function(e){
    wx.hideNavigationBarLoading()
  },
  like:function(e){
    var index=e.currentTarget.dataset.index
    var Islike="newRcom["+index+"].Islike"
    var like=this.data.newRcom[index].Islike
    this.setData({
      [Islike]:!like
    })
    if(this.data.newRcom[index].Islike){
      var i=0;
      for(i;i<this.like_data.length;i++){
        if(this.like_data[i]['id']==e.currentTarget.dataset.id)
          break;          
      }
      if(i>=this.like_data.length){
        var tmp={}
        tmp['id']=e.currentTarget.dataset.id
        this.like_data.push(tmp)
        wx.setStorage({
          data: this.like_data,
          key: 'like',
        })
        wx.showToast({
          title: '追番成功',
          icon:'success'
        })
      }
    }else{
      this.like_data = this.like_data.filter(function(item) {
        return item.id != e.currentTarget.dataset.id
      });
      wx.setStorage({
        data: this.like_data,
        key: 'like',
      })
      wx.showToast({
        title: '取消成功',
        icon:'success'
      })
    }
    
  },
  toDetail:function(e){
    var pv = JSON.stringify(this.data.newRcom[e.currentTarget.dataset.index].pv);
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id+'&pv='+pv
    })
  },
  onShareAppMessage: function () {
    return{
      title:'四月新番推荐'
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