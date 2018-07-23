// pages/teacher/password.js
import {Api} from '../../../utils/api.js';
var api = new Api();

 

 
Page({

  data: {
    sForm:{
      	password:'',
      n_password:'',
      c_password:'',  
    },

    userData:[]
  
  },




  onLoad(){
    const self = this;
    self.getMainData();
  },


  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res.info.data[0].user_no)
      self.data.userData = res;
      self.setData({
        web_userData:self.data.userData,
      });
      wx.hideLoading();
    };
    api.userInfoGet(postData,callback);
  },


  passwordChange(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
    	user_no:['=','U719035760193892']
    }
    console.log(self.data.userData.info.data[0].user_no)
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (res) => { 
      wx.hideLoading();
      const pass = api.dealRes(res);
      if(pass){
        setTimeout(function(){
          api.logOff();
        },500);
        
      }
    };
    api.userUpdate(postData,callback);
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
  },


  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass||!pass){
      wx.showLoading();
      const callback = (user,res) =>{
        console.log(user,res)
        self.passwordChange(user);
      };
      api.getAuthSetting(callback);
    }else{
      api.showToast('请补全信息','fail');
    };
  },

})