import {Api} from '../../../utils/api.js';
const api = new Api();

Page({


  data: {
    userData:[],
    web_show:false
  },


  onLoad: function (options) {
    const self = this;
    const pass = api.checkStudentLogin();
    if(pass){
      self.setData({
        web_show:true
      })
    };
    self.getUserData();
    self.getComputeData()
  },


  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      self.data.userData = res;
      self.setData({
        web_userData:self.data.userData,
      });   
      wx.hideLoading();
    };
    api.userGet(postData,callback);   
  },
  

  getComputeData(){
    const self = this;
    const postData = {};
    postData.data = {
      FlowLog:{
        compute:{
          count:'sum',
        },
        
        searchItem:{
          user_no:wx.getStorageSync('info').user_no,
          type:['in','6,2'],
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.computeData = res;
      self.setData({
        web_computeData:self.data.computeData,
      });
      wx.hideLoading();
    };
    api.flowLogCompute(postData,callback);
  },


})