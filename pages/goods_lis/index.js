import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"AlL",
        isActive:true
      },
      {
        id:1,
        value:"SalE",
        isActive:false
      },
      {
        id:2,
        value:"PricE",
        isActive:false
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList();
  },
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    const total = res.data.message.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    });
    wx.stopPullDownRefresh();
  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v, i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: 'HaS ReacH BottoM',
        icon:"none"
      });
    }
    else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh(e){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})