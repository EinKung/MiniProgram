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
        this.setData({
          swiperList:result.data.message
        })
    })
  },
  getCatesData(){
    request({url:"/home/catitems"})
    .then(result=>{
        this.setData({
          catesList:result.data.message
        })
    })
  },
  getFloorData(){
    request({url:"/home/floordata"})
    .then(result=>{
        this.setData({
          floorList:result.data.message
        })
    })
  }
});