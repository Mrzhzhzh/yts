import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
  
    
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  

  onLoad(){
    const self = this;
    wx.showLoading();
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
  },
  


  getMainData(isNew){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:['=','70'],
      menu_id:['=','351']
    } 
    const callback = (res)=>{
      if(res.info.data.length>0){
          self.data.mainData = res.info.data[0]
      } else{
        api.showToast('文章已被删除！','none')
      }
      wx.hideLoading();
      self.data.mainData.content = api.wxParseReturn(res.info.data[0].content).nodes;
      self.setData({
        web_mainData:self.data.mainData,
      });    
    };
    api.articleGet(postData,callback);
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
