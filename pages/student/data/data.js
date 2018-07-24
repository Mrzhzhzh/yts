// pages/teacher/data.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      name:'',
      phone:'',
      email:'',
      passage1:'',

     
    },
    mainData:{},
    

  },


  onLoad(){
    const self = this;
    self.getMainData();
    /*self.userInforAdd();*/
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.data.sForm.name = res.info.data[0].name;
      self.data.sForm.phone = res.info.data[0].phone;
      self.data.sForm.email = res.info.data[0].email;
      self.data.sForm.passage1 = res.info.data[0].passage1;
      self.setData({
        web_sForm:self.data.sForm,
      });
      wx.hideLoading();
    };
    api.userInfoGet(postData,callback);
  },

/*  userInforAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {
      name:111
    }
    const callback = (res)=>{
   
      wx.hideLoading();
    };
    api.userInfoAdd(postData,callback);
  },*/

  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    console.log(self.data.sForm);
    self.setData({
      web_sForm:self.data.sForm,
    });
    
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  edit(user){
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

  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      wx.showLoading();
      const callback = (user,res) =>{
        console.log(user,res)
        self.edit(user);
      };
      api.getAuthSetting(callback);
    }else{
      api.showToast('请补全信息','fail');
    };
  },
})