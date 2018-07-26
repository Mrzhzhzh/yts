// pages/teacher/message.js
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
    self.getMainData();  
  },


  getMainData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      menu_id:'365',
      thirdapp_id:'70'
    }
    postData.order = {
      create_time:'desc'
    }
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.setData({
        web_mainData:self.data.mainData,
      });
      wx.hideLoading();
    };
    api.articleGet(postData,callback);
  },

  

  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },

})