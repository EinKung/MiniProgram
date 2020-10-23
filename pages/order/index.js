import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data: {
    orders: [],
    tabs:[
      {
        id:0,
        value:"AlL",
        isActive:true
      },
      {
        id:1,
        value:"PayinG",
        isActive:false
      },
      {
        id:2,
        value:"RecivinG",
        isActive:false
      },
      {
        id:3,
        value:"RefunD",
        isActive:false
      }
    ]
  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    this.changeTabsChosenItem(index);
  },
  onShow(){
    // const token = wx.getStorageSync("token");
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    let pages =  getCurrentPages();
    let curPages = pages[pages.length-1];
    const {type} = curPages.options;
    this.changeTabsChosenItem(type-1);
    this.getOrders(type);
  },
  changeTabsChosenItem(index){
    let {tabs} = this.data;
    tabs.forEach((v, i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  async getOrders(type){
    const res = await request({url:"/my/orders/all", data:{type}});
    this.setData({
      orders:res.orders
    })
  }
})