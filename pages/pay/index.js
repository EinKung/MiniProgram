import { chooseAddress, getSetting, openSetting, showModal, showToast } from "../../utils/asyncwx.js";
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
  }
});