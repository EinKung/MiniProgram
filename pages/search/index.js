import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data: {
    goods: []
  },
  TimeId:-1,
  handleInput(e){
    const {value} = e.detail;
    if(!value.trim()){
      this.setData({
        goods: []
      })
      return;
    }else{
      clearTimeout(this.TimeId);
      this.TimeId=setTimeout(()=>{
        this.qseacrh(value);
      }, 1000);
    }
  },
  async qseacrh(query){
    const res = await request({url: "/goods/qsearch", data: {query}});
    this.setData({
      goods:res.data.message
    })
  }
})