// pages/student/qr-code.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({


  data: {
    userData:[],
    web_show:false
  },


  onLoad: function (options) {
    const self = this;
    const pass = api.checkStudentLogin();
    if(pass){
      self.setData({
        web_show:true
      })
    };
    self.getUserData();
  },


  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      self.data.userData = res;
      self.setData({
        web_userData:self.data.userData,
      });

     
      wx.hideLoading();
    };
    api.userGet(postData,callback);
    
  },


})