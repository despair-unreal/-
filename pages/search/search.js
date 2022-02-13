// pages/search/search.js
Page({
  data: {
    nothing:false,
  },
  start:0,list_length:0,arr:[],keyword:'',
  onLoad: function (options) {
    console.log(this.data.nothing)
  },
  search:function(e){
    if(e.detail.value==''){
      this.setData({
        Allitems:[],
        more:false
      })
      wx.hideNavigationBarLoading()
    }else{
      this.arr=[];
      this.start=0;
      this.keyword=e.detail.value;
      this.result();
    }
    wx.showNavigationBarLoading()
  },
  result:function(e){
    wx.request({
      url: 'https://api.bgm.tv/search/subject/'+this.keyword+'?start='+this.start+'&responseGroup=large',
      header: {
        'content-type': 'application/json'
      },
      success:(res)=>{
        if(res.data.code!=404){
          this.list_length=res.data.list.length
            this.setData({
              more:true
            })
            for(let i=0;i<res.data.list.length;i++){
              var tmp={};
              tmp['id']=res.data.list[i].id;
              if(res.data.list[i].type!=null){
                switch(res.data.list[i].type){
                  case 1:tmp['type']='书籍/漫画';break;
                  case 2:tmp['type']='动画';break;
                  case 3:tmp['type']='音乐';break;
                  case 4:tmp['type']='游戏';break;
                  case 6:tmp['type']='三次元';break;
                }
                tmp['image']=res.data.list[i].images.large;
              }
              if(res.data.list[i].images!=null){
                tmp['image']=res.data.list[i].images.large;
              }
              if(res.data.list[i].rank!=null){
                tmp['rank']=res.data.list[i].rank;
              }else{
                tmp['rank']='';
              }
              if(res.data.list[i].rating){
                tmp['score']=res.data.list[i].rating.score;
                tmp['total']=res.data.list[i].rating.total;
              }else{
                tmp['score']='暂无评分';
                tmp['total']='0';
              }
              if(res.data.list[i].eps){
                tmp['eps']=res.data.list[i].eps;
              }
              if(res.data.list[i].name_cn!=""){
                tmp['title_cn']=res.data.list[i].name_cn;
              }else{
                tmp['title_cn']=res.data.list[i].name;
              }
              tmp['title']=res.data.list[i].name;
              if(res.data.list[i].air_date=='0000-00'){
                tmp['year']='暂无';
                tmp['month']='暂无';
              }else{
                var air_date=res.data.list[i].air_date.split("-");
                tmp['year']=air_date[0];
                tmp['month']=air_date[1];
              }
              this.arr.push(tmp);
              this.setData({
                Allitems:this.arr
              })
            }
        }else{
          this.setData({
            more:false
          })
        }
      }
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
      +'&type='+e.currentTarget.dataset.type
    })
  },
  loadingmore:function(e){
    this.start+=this.list_length+1;
    if(this.data.more!=false)
      this.result();
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