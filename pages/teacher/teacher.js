// pages/teacher.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({


  data: {

    userData:[],
    web_show:false
  },
    

  onLoad(){
    const self = this;
    self.getUserData();
  },

  onShow(){
    const self = this;
    self.getUserData();
    const pass = api.checkTeacherLogin();
    if(pass){
      self.setData({
        web_show:true
      })
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