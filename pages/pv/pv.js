// pages/pv/pv.js
Page({
  VideoContext:[],
  all:[],
  danmu:'',
  data: {
    id:0,
    select:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pv=JSON.parse(options.pv);
    this.setData({
      pv:pv.pv
    })
    this.setData({
      videoUrl:this.data.pv[0].url
    })
    for(let i=0;i<pv.pv.length;i++)
    {
      this.all[i]=[];//初始化数组
    }
    wx.request({
      url: 'https://api.bgm.tv/subject/'+pv.id,
      header: {
        'content-type': 'application/json'
      },
      success:(res)=>{
              var arr={};
              arr['id']=res.data.id;
              if(res.data.type!=null){
                switch(res.data.type){
                  case 1:arr['type']='书籍/漫画';break;
                  case 2:arr['type']='动画';break;
                  case 3:arr['type']='音乐';break;
                  case 4:arr['type']='游戏';break;
                  case 6:arr['type']='三次元';break;
                }
                arr['image']=res.data.images.large;
              }
              if(res.data.images!=null){
                arr['image']=res.data.images.large;
              }
              if(res.data.rank!=null){
                arr['rank']=res.data.rank;
              }else{
                arr['rank']='';
              }
              if(res.data.rating){
                arr['score']=res.data.rating.score;
                arr['total']=res.data.rating.total;
              }else{
                arr['score']='暂无评分';
                arr['total']='0';
              }
              if(res.data.eps){
                arr['eps']=res.data.eps;
              }
              if(res.data.name_cn!=""){
                arr['title_cn']=res.data.name_cn;
              }else{
                arr['title_cn']=res.data.name;
              }
              arr['title']=res.data.name;
              if(res.data.air_date=='0000-00'){
                arr['year']='暂无';
                arr['month']='暂无';
              }else{
                var air_date=res.data.air_date.split("-");
                arr['year']=air_date[0];
                arr['month']=air_date[1];
              }
              this.setData({
                items:arr
              })
              wx.setNavigationBarTitle({
                title: this.data.items.title_cn,
              })
          wx.hideNavigationBarLoading()
      }
    })
    wx.showNavigationBarLoading()
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
      +'&type='+e.currentTarget.dataset.type
    })
  },
  videoChange:function(e){
    this.setData({
      videoUrl:this.data.pv[e.currentTarget.dataset.index].url,
      id:e.currentTarget.dataset.index,
      select:e.currentTarget.dataset.index
    })

  },
  getValue:function(e){
    this.danmu=e.detail.value
  },
  send:function(e){
    var tmp={}
    tmp.text=this.danmu
    tmp.color=this.getColor()
    tmp.time=parseInt(this.currentTime)
    this.all[this.data.id].push(tmp)//不同的视频对应不同的弹幕数组
    var danmulist='danmulist['+this.data.id+']'
    this.setData({
      [danmulist]:this.all[this.data.id]
    })
  },
  bindtimeupdate:function(e){
    this.currentTime = e.detail['currentTime']
  },
  getColor:function(){
    let color="rgb(";
    for(let i=0;i<3;i++){
      let rgb = Math.floor(Math.random() * 256).toString();
      if(i==2){
        color=color+rgb+")";
      }else
        color=color+rgb+",";
    }
    return color;
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