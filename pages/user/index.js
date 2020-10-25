import { chooseAddress, getSetting, openSetting } from "../../utils/asyncwx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data:{
    userInfo: {},
    collectNum:0
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      collectNum:collect.length
    })
    this.setUserInfo(userInfo);
  },
  handleGetUserInfo(e){
    const {userInfo} = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    this.setUserInfo(userInfo);
  },
  setUserInfo(userInfo){
    this.setData({
      userInfo
    })
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
  }
})