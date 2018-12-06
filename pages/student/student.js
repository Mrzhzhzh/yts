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
    self.getUserData();
    self.getComputeData()
  
    
  },


  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.userData = res;
      }else{
        api.showToast('网络故障')
      }
      
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