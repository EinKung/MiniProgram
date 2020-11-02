// components/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表e
   */
  methods: {
    handleItemRemove(){
      const value = this.data.src;
      this.triggerEvent("itemRemove", {value})
    }
  }
})
