// pages/auth/index.js
import { request } from "../../request/index.js"
import { login } from "../../utils/asyncwx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  async handleGetUserInfo(e){
    try{
      const {encryptedData, rawData, iv, signature} = e.detail;
      const {code} = await login();
      const loginParams = {encryptedData, rawData, iv, signature, code}
      const {token} = await request({url: "/users/wxlogin", data: loginParams, method: "post"});
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    }catch(err){
      console.log(err);
      wx.navigateBack({
        delta: 1
      });
    }
  }
})