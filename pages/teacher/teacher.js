
import {Api} from '../../utils/api.js';
var api = new Api();

Page({


  data: {

    userData:[],
    web_show:false
  },
    

  onLoad(){
    const self = this;
    
  },


  onShow(){
    const self = this;
    wx.showLoading();
    const pass = api.checkTeacherLogin();
    if(pass){
      self.setData({
        web_show:true
      })
      self.getUserData();
    };
  },


  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      self.data.userData = res;
      self.setData({
        web_user:res,
      });   
      wx.hideLoading();
    };
    api.userGet(postData,callback);   
  },

  removeStorageSync(){
    const self = this;
    api.logOff();
  },
  

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
 


 
})