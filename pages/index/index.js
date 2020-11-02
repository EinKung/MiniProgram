//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    // swiper list
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    // send request to get swiper data
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperData();
    this.getCatesData();
    this.getFloorData();
  },
  getSwiperData(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      let swiper = result.data.message;
      swiper.forEach(v => v.navigator_url = v.navigator_url.replace("main", "index"));
        this.setData({
          swiperList:swiper
        })
    })
  },
  getCatesData(){
    request({url:"/home/catitems"})
    .then(result=>{
      const cates = result.data.message;
        this.setData({
          catesList:cates
        })
    })
  },
  getFloorData(){
    request({url:"/home/floordata"})
    .then(result=>{
      let floor = result.data.message;
      for(var i=0;i<floor.length;i++){
        floor[i].product_list.forEach(v=>v.navigator_url=v.navigator_url.replace("goods_list", "goods_lis/index"));
      }
        this.setData({
          floorList:floor
        })
    })
  }
});