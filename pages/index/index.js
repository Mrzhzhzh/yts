//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
  
    
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  

  onLoad(){
    const self = this;
    wx.showLoading();
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();


  },

  getMainData(isNew){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:['=','70']
    } 
    const callback = (res)=>{
      self.data.mainData = res
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });
      console.log(self.data.mainData)
      
    };
    api.articleGet(postData,callback);
  }

})
