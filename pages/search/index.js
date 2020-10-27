import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data: {
    goods: []
  },
  handleInput(e){
    const {value} = e.detail;
    if(!value.trim()){
      this.setData({
        goods: []
      })
      return;
    }else{
      this.qseacrh(value);
    }
  },
  async qseacrh(query){
    const res = await request({url: "/goods/qsearch", data: {query}});
    this.setData({
      goods:res.data.message
    })
  }
})