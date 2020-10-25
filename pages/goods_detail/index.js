import { request } from "../../request/index.js"
import { showToast } from "../../utils/asyncwx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    collected:false
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow(){
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const goodsId = options.goods_id;
    this.getGoodsDetail(goodsId);
  },
  async getGoodsDetail(goods_id){
    const res = await request({url:"/goods/detail", data:{goods_id}});
    this.GoodsInfo = res.data.message;
    let collect = wx.getStorageSync("collect")||[];
    let collected = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics:res.data.message.pics
      },
      collected
    })
  },
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  handleAddToCart(){
    let cart = wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=false;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: 'AddeD',
      icon: 'success',
      mask: true
    });
  },
  handleCollect(){
    let collected = false;
    let collect = wx.getStorageSync("collect")||[];
    let index = collect.findIndex(v=>v.goods_id==this.GoodsInfo.goods_id);
    if(index!==-1){
      collect.splice(index, 1);
      collected = false;
      showToast({msg: "CanceL"});
    }else{
      collect.push(this.GoodsInfo);
      collected = true;
      showToast({msg: "CollecteD"});
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      collected
    })
  }
})