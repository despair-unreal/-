// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    Islike:false,
    none:'暂无信息',
    show:[true,true,true,true,true,true]
  },
  toPv:'',
  like_data:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.pv){
      var pv=JSON.parse(options.pv);
      this.toPv=pv
      this.setData({
        pv:pv.pv
      })
      console.log(this.data.pv)
    }
    wx.request({
      url: 'https://api.bgm.tv/subject/'+options.id+'?responseGroup=large',
      success:(res)=>{
        this.setData({
          arr:res.data,
          type:options.type,
          lang:options.lang,
        })
        wx.getStorage({
          key: 'like',
          success:(res)=>{
            this.like_data=res.data
              for(let j=0;j<this.like_data.length;j++){
                if(this.like_data[j].id==options.id){
                  this.setData({
                    Islike:true
                  })
                  break;
                }
              }
          }
        })
      }
    })
    wx.showNavigationBarLoading()
  },
  like:function(e){
    this.setData({
      Islike:!this.data.Islike
    })
    if(this.data.Islike){
        var tmp={}
        tmp['id']=this.data.arr.id
        this.like_data.push(tmp)
        wx.setStorage({
          data: this.like_data,
          key: 'like',
        })
        wx.showToast({
          title: '追番成功',
          icon:'success'
        })
    }else{
      this.like_data = this.like_data.filter((item)=>{
        return item.id != this.data.arr.id
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
  Imgload:function(e){
    wx.hideNavigationBarLoading()
  },
  toDetail:function(e){
    var pv = JSON.stringify(this.toPv);
    wx.navigateTo({
      url: '/pages/pv/pv?pv='+pv,
    })
  },
  //控制展开和收缩
  show:function(e){
    var index=e.currentTarget.dataset.index
    var showItem="show["+index+"]"
    this.setData({
      [showItem]:!this.data.show[index]
    })
  },
  onShareAppMessage: function () {
    return{
      title:this.data.arr.name_cn==''?this.data.arr.name==''?'暂无':this.data.arr.name:this.data.arr.name_cn
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