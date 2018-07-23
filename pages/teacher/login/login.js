// pages/teacher/login.js
import {Api} from '../../../utils/api.js';
var api = new Api();

import {Token} from '../../../utils/token.js';
var token = new Token();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    sForm:{
      login_name:'教师',
      password:'111111'
    }
    
  },



  submit(){
    const self = this;
    wx.setStorageSync('login',self.data.sForm);
    const callback = (res)=>{   
      if(wx.getStorageSync('token')&&res.data.info.type == 1){
        wx.redirectTo({
          url: '/pages/teacher/teacher'
        }) 
        api.showToast('登陆成功','success')
      }else{
        api.showToast('用户不存在','fail')
      }
    }

    token.getToken(callback);
  },

  bindInputChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });
  },


  check(e){
    const self = this;
      
    if(api.checkComplete(self.data.sForm)){
      self.submit();
    }else{
      api.showToast('请填写账号密码','fail')
    };

  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'tab');

  },
})