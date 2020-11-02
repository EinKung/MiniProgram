import { showToast } from "../../utils/asyncwx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PTypeList: ['使用体验/反馈', '使用体验/优化', '客服投诉'],
    index:0,
    chosenPics: [],
    textVal:""
  },
  TimeId:-1,
  bindPickerChange(e){
    this.setData({
      index:e.detail.value
    })
  },
  handleImgChoose(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          chosenPics:[...this.data.chosenPics,...result.tempFilePaths]
        })
      }
    });
  },
  handleRemovePic(e){
    const {value} = e.detail;
    let {chosenPics} = this.data;
    const index = chosenPics.findIndex(v=>v===value);
    chosenPics.splice(index, 1);
    this.setData({
      chosenPics
    })
  },
  handleTextInput(e){
    const {value} = e.detail;
    this.setData({
      textVal:value
    })
  },
  handleFormCommit(){
    const {textVal} = this.data;
    if(!textVal.trim()){
      showToast({msg:"IllegeL InpuT!"});
    }else{
      this.setData({
        textVal:"",
        chosenPics:[]
      })
      showToast({msg:"CommiT SuccessfullY"});
      clearTimeout(this.TimeId);
      this.TimeId=setTimeout(()=>{
        wx.navigateBack({
          delta: 1
        });
      }, 1000);
    }
  }
})