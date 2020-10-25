Page({
  data: {
    tabs:[
      {
        id:0,
        value:"GoodS",
        isActive:true
      },
      {
        id:1,
        value:"BranD",
        isActive:false
      },
      {
        id:2,
        value:"StorE",
        isActive:false
      },
      {
        id:3,
        value:"HistorY",
        isActive:false
      }
    ],
    collect: []
  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    this.changeTabsChosenItem(index);
  },
  changeTabsChosenItem(index){
    let {tabs} = this.data;
    tabs.forEach((v, i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  onShow(){
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      collect
    })
  }
})