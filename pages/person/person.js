// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like:[],
    bgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F07%2F20151007161256_LEtwx.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626167697&t=c70a4bb5de1453a425bf14c08a93c1ef'
  },
  like_id:[],
  arr:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  Imgload:function(e){
  },
  onShow: function () {
    wx.getStorage({
      key: 'userMsg',
      success:(res)=>{
        this.setData({
          userAvatar:res.data.avatarUrl,
          userName:res.data.nickName,
          gender:res.data.gender==1?'男':res.data.gender==2?'女':'秀吉',
          site:res.data.country+' '+res.data.province+' '+res.data.city
        })
        if(res.data.bgUrl){
          this.setData({
            bgUrl:res.data.bgUrl
          })
        }
      }
    })
    wx.getStorage({
      key: 'like',
      success:(res)=>{
        this.arr=[]
        this.like_id=res.data
        this.setData({
          like:this.arr
        })
        for(let i=0;i<this.like_id.length;i++){
          this.coverImage(this.like_id[i].id).then((res) => {
            var temp={}
            if(res.data.images!=null){
              temp['img']=res.data.images.large
            }
            if(res.data.name_cn!=""){
              temp['title']=res.data.name_cn;
            }else{
              temp['title']=res.data.name;
            }
            temp['id']=this.like_id[i].id
            this.arr.push(temp)
            this.setData({
              like:this.arr
            })
          })
        }
      }
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
    })
  },
  coverImage:function(id){
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://api.bgm.tv/subject/'+id,
        header: {
          'content-type': 'application/json'
        },
        success: function(res){
          resolve(res);
        }
      })
    })
  },
  update:function(e){
    wx.navigateTo({
      url: '/pages/modify/modify',
    })
  },
  site:function(e){
    wx.navigateTo({
      url: '/pages/site/site',
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