import { chooseAddress, getSetting, openSetting, showModal, showToast } from "../../utils/asyncwx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPay:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];

    const checkedCart = wx.getStorageSync("checkedCart")||[];

    this.setData({
      address
    })
    if(checkedCart.length!==0){
      for(var i=0;i < checkedCart.length;i++){
        const checkedId = cart.findIndex(v=>v.goods_id===checkedCart[i].goods_id);
        cart[checkedId].checked = true;
      }
      wx.setStorageSync("checkedCart", []);
    }
    this.checkAllChoose(cart);
  },
  onHide(){
    // set all unchecked when page cart hide
    let {cart} = this.data;
    cart.forEach(v=>v.checked=false);
    this.setData({
      cart
    })
    wx.setStorageSync("cart", cart);
  },
  async handleAddressSet(){
    try{
      const res = await getSetting();
      const scopeAddr = res.authSetting["scope.address"];
      if(scopeAddr===false){
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      wx.setStorageSync("address", address);
    }catch(error){
      console.log(error);
    }
  },
  handleItemChange(e){
    const goods_id=e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.checkAllChoose(cart);
  },
  checkAllChoose(cart){
    // all checked
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    let totalPay = 0;
    let totalNum = 0;
    let allChecked=true;
    cart.forEach(v => {
      if(v.checked){
        totalPay += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allChecked=false;
      }
    });
    allChecked = cart.length!=0?allChecked:false;

    this.setData({
      allChecked,
      totalPay,
      totalNum,
      cart
    })
    wx.setStorageSync("cart", cart);
  },
  handleItemAllCheck(){
    let {cart, allChecked} = this.data;
    allChecked =! allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.checkAllChoose(cart);
  },
  async handleItemNumEdit(e){
    const {id, operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);

    // delete item?
    if(cart[index].num===1&&operation===-1){
      const res = await showModal({msg: "'ArE YoU WanT TO DeletE ThiS ProdcuT?'"});
      if(res.confirm){
        cart.splice(index, 1);
        this.checkAllChoose(cart);
      }else if(res.cancel){
        console.log("cancel");
      }
    }else{
      cart[index].num += operation;
      this.checkAllChoose(cart);
    }
  },
  async handlePay(){
    const {address, totalNum} = this.data;
    if(!address.userName){
      await showToast({msg: "AddresS NoT SeT YeT"});
    }else if(totalNum===0){
      await showToast({msg: "NO GoodS ChoseN"});
    }else{
      const cart = wx.getStorageSync("cart")||[];
      let checkedCart = cart.filter(v=>v.checked);
      wx.setStorageSync("checkedCart", checkedCart);
      wx.navigateTo({
        url: '/pages/pay/index',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  }
});