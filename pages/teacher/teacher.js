// pages/teacher.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({


  data: {
    sForm:{
      username:'教师',
      password:'111111'
    },
    userData:[],
    web_show:false
  },
    

  onLoad(){
    const self = this;
    
    self.getUserData();
  },


  onShow(){
    const self = this;
    if(wx.getStorageSync('login')&&wx.getStorageSync('token')&&wx.getStorageSync('type')==1){   
      self.setData({
        web_show:true
      });
    }else{
      setTimeout(function(){
        api.pathTo('/pages/teacher/login/login','redi');
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