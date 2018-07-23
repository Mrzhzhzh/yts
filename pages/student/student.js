// pages/student.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  web_show:false
  },
    

  onLoad(){
    const self = this;

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



  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

  
})