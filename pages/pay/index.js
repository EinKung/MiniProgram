import { } from "../../utils/asyncwx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data:{
    address:{},
    cart:[],
    totalPay:0
  },
  onShow(){
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("checkedCart");
    let totalPay = 0;

    cart.forEach(v => {
      totalPay += v.num * v.goods_price;
    });
    
    this.setData({
      totalPay,
      cart,
      address
    })
  },
  handlePay(){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
    console.log("123");
  }
});