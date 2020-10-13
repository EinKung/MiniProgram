// pages/category/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftCatesList: [],
    rightCatesList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCatesData();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCatesData();
      } else {
        this.Cates = Cates.data;
        let leftCatesList = this.Cates.map(v => v.cat_name);
        let rightCatesList = this.Cates[0].children;
        this.setData({
          leftCatesList,
          rightCatesList
        })
      }
    }
  },
  async getCatesData() {
    // request({
    //   url: "/categories"
    // })
    // .then(res => {
    //   this.Cates=res.data.message;
    //   wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});
    //   let leftCatesList = this.Cates.map(v=>v.cat_name);
    //   let rightCatesList = this.Cates[0].children;
    //   this.setData({
    //     leftCatesList,
    //     rightCatesList
    //   })
    // })
    const res = await request({ url: "/categories" });
    this.Cates = res.data.message;
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    let leftCatesList = this.Cates.map(v => v.cat_name);
    let rightCatesList = this.Cates[0].children;
    this.setData({
      leftCatesList,
      rightCatesList
    })
  },
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    let rightCatesList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightCatesList,
      scrollTop: 0
    })
  }
})