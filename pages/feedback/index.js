// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index:0
  },
  bindPickerChange(e){
    this.setData({
      index:e.detail.value
    })
  }
})