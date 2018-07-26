// pages/teacher/password.js
import {Api} from '../../../utils/api.js';
var api = new Api();

 

 
Page({

  data: {
    sForm:{
      password1:'',
      password:'',
      password2:'', 
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
    if(self.data.sForm.password != self.data.sForm.password2){
      console.log(self.data.sForm.password)
      api.showToast('新密码不一致','fail')
    }else if(self.data.sForm.password1 != wx.getStorageSync('login').password){
      console.log(wx.getStorageSync('login').password)
       api.showToast('原密码错误','fail')
    }else{
      const postData = {};
      postData.token = wx.getStorageSync('token');
      postData.searchItem = {};
      postData.searchItem.user_no = self.data.userData.info.data[0].user_no;

      postData.data = api.cloneForm(self.data.sForm.password1);
       
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
    }
  },



  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
  },



  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
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