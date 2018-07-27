// pages/teacher/message.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({
  data: {

    mainData:{},
    web_show:false
  },


  onLoad(){
    const self = this;
    const pass = api.checkStudentLogin();
    if(pass){
      self.setData({
        web_show:true
      })
    };
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();  
  },


  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      menu_id:'365',
      thirdapp_id:'70'
    }
    postData.order = {
      create_time:'desc'
    }
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.setData({
        web_mainData:self.data.mainData,
      });
      wx.hideLoading();
    };
    api.articleGet(postData,callback);
  },

  

  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },


 
})