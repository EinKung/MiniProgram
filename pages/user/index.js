// pages/user/index.js
Page({
  data:{
    userInfo: {}
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
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
  }
})