// index.js
Page({
  data: {
    Allitems:[],
    type:{'全部':null,'OVA':'ova','TV':'tv','剧场版':'movie','WEB':'web'},
    lang:{'全部':null,'日语':'ja','国语':'zh-Hans','英语':'en'},
    year:['全部'],
    month:['全部'],
    selectTypeItem:'全部',selectLangItem:'全部',
    selectYearItem:0,selectMonthItem:0,
    nothing:false,
    show:true
  },
  selectType:null,selectLang:null,selectYear:null,selectMonth:null,
  arrList:[],
  loadingItems:20,
  onLoad: function (options) {
    //年份数组设置
    var Yearindex=1
    for (let i = 2021; i > 1959; i--) {
      var year='year['+Yearindex+']'
      this.setData({
        [year]:i
      })
      Yearindex+=1
    }
    var Monthindex=1
    for (let i = 1; i < 13; i++) {
      var month='month['+Monthindex+']'
      this.setData({
        [month]:i+'月'
      })
      Monthindex+=1
    }
    //获取番剧数据
    wx.request({
      url:'https://cdn.jsdelivr.net/npm/bangumi-data@0.3/dist/data.json',
      header: {
        'content-type': 'application/json'
      },
      success:(res)=>{
        this.select() //显示数据
      }
    })
  },
  Imgload:function(e){
    wx.hideNavigationBarLoading()
    wx.hideLoading()
    console.log(1)
  },
  //根据bangumi-data的id获取bangumiApi的封面-异步
  type:function(e){
    var index=e.currentTarget.dataset.index
    this.selectType=this.data.type[index]
    this.loadingItems=20
    this.setData({
      selectTypeItem:index
    })
    this.pageScrollTo();
    this.select();
  },
  lang:function(e){
    var index=e.currentTarget.dataset.index
    this.selectLang=this.data.lang[index]
    this.loadingItems=20
    this.setData({
      selectLangItem:index
    })
    this.pageScrollTo();
    this.select(this);
  },
  year:function(e){
    var index=e.currentTarget.dataset.index
    if(index==0)
      this.selectYear=null;
    else
      this.selectYear=this.data.year[index]
    this.loadingItems=20
    this.setData({
      selectYearItem:index
    })
    this.pageScrollTo();
    this.select(this);
  },
  month:function(e){
    var index=e.currentTarget.dataset.index
    if(index==0)
      this.selectMonth=null;
    else
      this.selectMonth='0'+index
    this.loadingItems=20
    this.setData({
      selectMonthItem:index
    })
    this.pageScrollTo();
    this.select(this);
  },
  show:function(e){
    this.setData({
      show:!this.data.show
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
      +'&type='+e.currentTarget.dataset.type +'&lang='+e.currentTarget.dataset.lang,
    })
  },
  loadingmore: function (e) {
    this.loadingItems+=20
    this.select(this)
  },
  select:function(){
    // 初始化内容（显示的数组）
    this.arrList=[]
    wx.request({
      url:'https://cdn.jsdelivr.net/npm/bangumi-data@0.3/dist/data.json',
      header: {
        'content-type': 'application/json'
      },
      success:(res)=>{
        for(let i=0;i<res.data.items.length;i++){
          //选项分类
          if(this.selectType!=null){
            if(this.selectType!=res.data.items[i].type)
              continue;
          }
          if(this.selectLang!=null){
            if(this.selectLang!=res.data.items[i].lang)
              continue;
          }
          if(this.selectYear!=null){
            if(this.selectYear!=res.data.items[i].begin.substring(0,4))
              continue;
          }
          if(this.selectMonth!=null){
            if(this.selectMonth!=res.data.items[i].begin.substring(5,7))
              continue;
          }
          //初次加载仅显示20项
          if(this.arrList.length<this.loadingItems){
            var tmp={}
            for(let j=0;j<res.data.items[i].sites.length;j++){
              if(res.data.items[i].sites[j].site=="bangumi"){
                tmp['id']=res.data.items[i].sites[j].id;
                break;
              }
            }
            if(tmp['id']){
              //遍历数组获取键名作为动画类型（type）的值
              for(var key in this.data.type){
                if(this.data.type[key]==res.data.items[i].type)
                  tmp['type']=key;
              }
              //获取语言
              for(var key in this.data.lang){
                if(this.data.lang[key]==res.data.items[i].lang)
                  tmp['lang']=key;
              }
              //tmp['titleTranslate']=res.data.items[i].titleTranslate;
              //解决request异步处理，先执行coverImage
              var coverCount=0
              this.arrList.push(tmp)
              this.coverImage(tmp['id']).then((res) => { //最后执行
                if(this.arrList[coverCount]){
                  if(res.data.images!=null){
                    this.arrList[coverCount]['image']=res.data.images.large+'??v='+Math.floor((Math.random())*100);
                  }
                  if(res.data.rank!=null){
                    this.arrList[coverCount]['rank']=res.data.rank;
                  }else{
                    this.arrList[coverCount]['rank']='';
                  }
                  if(res.data.rating){
                    this.arrList[coverCount]['score']=res.data.rating.score;
                    this.arrList[coverCount]['total']=res.data.rating.total;
                  }else{
                    this.arrList[coverCount]['score']='暂无评分';
                    this.arrList[coverCount]['total']='0';
                  }
                  if(res.data.eps){
                    this.arrList[coverCount]['eps']=res.data.eps;
                  }
                  if(res.data.name_cn!=""){
                    this.arrList[coverCount]['title_cn']=res.data.name_cn;
                  }else{
                    this.arrList[coverCount]['title_cn']=res.data.name;
                  }
                  this.arrList[coverCount]['title']=res.data.name;
                  var air_date=res.data.air_date.split("-");
                  this.arrList[coverCount]['year']=air_date[0];
                  this.arrList[coverCount]['month']=air_date[1];
                  if(coverCount==this.arrList.length-1){
                    this.setData({
                      Allitems:this.arrList
                    })
                  }
                  coverCount++
                }
              }).catch((res) => { 
                console.log(res) 
              })
            }
          }else break;
        }
        if(this.arrList.length==0){
          this.setData({
            Allitems:[],
            nothing:true
          })
          wx.hideNavigationBarLoading()
          wx.hideLoading()
        }else{
          this.setData({
            nothing:false
          })
          if(this.loadingItems-this.data.Allitems.length>20){
            this.setData({
              more:false
            })
          }else{
            this.setData({
              more:true
            })
          } 
        }
        //回到顶部
      }
    })
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
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
   pageScrollTo:function(e){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})
