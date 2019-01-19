// pages/teacher/data.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({
  data: {

    sForm:{
      name:'',
      phone:'',
      email:'',
    },

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
    }else{
      wx.reLaunch({
        url:'/pages/student/login/login'
      });
    };
    self.getUserData();
  },


  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res.info.data[0];
      self.data.sForm.name = res.info.data[0].info.name;
      self.data.sForm.phone = res.info.data[0].info.phone;
      self.data.sForm.email = res.info.data[0].info.email;
      self.setData({
        web_mainData:self.data.mainData,
        web_sForm:self.data.sForm,
      });
      wx.hideLoading();
    };
    api.userGet(postData,callback);
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });  
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


  userInfoUpdate(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoUpdate(postData,callback);
  },


  userInfoAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoAdd(postData,callback);
  },


  submit(){
    const self = this;
    var phone = self.data.sForm.phone;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
          api.showToast('手机格式错误','fail')
        }else{
          if(JSON.stringify(wx.getStorageSync('info').info)=='[]'){
            wx.showLoading();
            self.userInfoAdd();
          }else{
            wx.showLoading();
            self.userInfoUpdate();
          }
          setTimeout(function(){
            api.pathTo('/pages/student/student','tab')
          },1000); 
        }
    }else{
      api.showToast('请补全信息','fail');
    };
  }

  
})