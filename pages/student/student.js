import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    computeData:[],
    web_show:false,
    userData:[]

  },
    

  onLoad(){
    const self = this;

  },

  

  onShow(){
    const self = this;
    wx.showLoading();
    const pass = api.checkStudentLogin();
    if(pass){
      self.setData({
        web_show:true
      });
      self.getUserData();
      self.getComputeData()
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
        web_user:self.data.userData,
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
      self.data.computeData = res;
      self.setData({
        web_computeData:self.data.computeData,
      });
      wx.hideLoading();
    };
    api.flowLogCompute(postData,callback);
  },

  removeStorageSync(){
    const self = this;
    api.logOff();
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  
})