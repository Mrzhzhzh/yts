
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
   
    self.getUserData();
   
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

  intoPathRediIndex(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'redi');
  },

  intoPathRedi(e){
    const self = this;
    var id = api.getDataSet(e,'id')
    console.log(id)
    if(id==1){
      var pass = api.checkTeacherLogin();
      if(pass){
        wx.redirectTo({
          url:'/pages/teacher/teacher'
        });
      }else{
        wx.redirectTo({
          url:'/pages/teacher/login/login'
        });
      }
    }else if(id==2){
      var pass = api.checkStudentLogin();
        if(pass){
        wx.redirectTo({
          url:'/pages/student/student'
        });
      }else{
        wx.redirectTo({
          url:'/pages/student/login/login'
        });
      }
    }    
  },

 


 
})