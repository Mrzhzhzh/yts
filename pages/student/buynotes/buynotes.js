// pages/student/buynotes.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({
  data: {
    paginate: {
        count: 0,
        currentPage:1,
        pagesize:10,
        is_page:true,
    },
    mainData:{},
    

  },


  onLoad(){
    const self = this;
    wx.showLoading();
    self.getMainData();
   
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      type:'2',   
    }
    postData.order = {
      create_time:'desc'
    }
    const callback = (res)=>{
      self.data.mainData = res;
      if(res.info.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      console.log(res)
    
      self.setData({
        web_mainData:self.data.mainData,
      });
      wx.hideLoading();
    };
    api.buyClassGet(postData,callback);
  },


  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },

 
})