import { requestPayment, showToast } from "../../utils/asyncwx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from "../../request/index.js"
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
  async handlePay(){
    wx.navigateTo({
      url: '/pages/order/index'
    });
    // try{
    //   const token = wx.getStorageSync("token");
    //   if(!token){
    //     wx.navigateTo({
    //       url: '/pages/auth/index'
    //     });
    //   }
    //   const header = {Authorization: token};
    //   const order_price = this.data.totalPay;
    //   const consignee_addr = this.data.address.all;
    //   const cart = this.data.cart;
    //   let goods = [];
    //   cart.forEach(v=>goods.push({
    //     goods_id:v.goods_id,
    //     goods_num:v.goods_num,
    //     goods_price:v.goods_price
    //   }))
    //   const orderParams = {order_price, consignee_addr, goods};
    //   const {order_number} = await request({url: "/my/orders/create", method:"POST", data:orderParams, header});
    //   const {pay} = await request({url:"/my/orders/req_unifiedorder", method:"POST", data:order_number, header});
    //   await requestPayment(pay);
    //   const res = await request({url:"/my/orders/chkOrder", method:"POST", data:order_number});
    //   await showToast({msg: "SuccesS"});
    //   wx.navigateTo({
    //     url: '/pages/order/index'
    //   });
    // }catch(err){
    //   await showToast({msg: "FalL"});
    //   console.log(err)
    // }
  }
});