import {Api} from '../../../utils/api.js';
const api = new Api();

Page({


  data: {
    QrData:[],
    web_show:false
  },


  onLoad: function (options) {
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
    self.getQrData();
    self.getComputeData()
  },


  getQrData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.param = wx.getStorageSync('info').user_no;
    postData.output = 'url';
    postData.ext = 'png';
    const callback = (res)=>{
      console.log(res);
      self.data.QrData = res;
      self.setData({
        web_QrData:self.data.QrData,
      });
     
      wx.hideLoading();
    };
    api.getQrCommonCode(postData,callback);
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