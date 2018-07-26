// pages/student.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    web_show:false,
    userData:[]

  },
    

  onLoad(){
    const self = this;
    self.getUserData()
  },


  onShow(){
    const self = this;
    if(wx.getStorageSync('login')&&wx.getStorageSync('token')&&wx.getStorageSync('type') == 0){   
      self.setData({
        web_show:true
      });
    }else{
      setTimeout(function(){
        api.pathTo('/pages/student/login/login','redi');
      },500);             
    };   
  },


  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res);
      self.data.userData = res;
      self.setData({
        web_user:res,
      });
     
      wx.hideLoading();
    };
    api.userGet(postData,callback);
    
  },



  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  
})