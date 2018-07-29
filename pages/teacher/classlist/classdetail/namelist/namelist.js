// pages/teacher/classlist/completeddetail/namelist.js
import {Api} from '../../../../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    join:{},
    mainData:[],
    searchItem:{
      thirdapp_id:['=','70'],
      type:['=','6']
    },
    web_show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    wx.showLoading();
    const pass = api.checkTeacherLogin();
      if(pass){
        self.setData({
          web_show:true
        })
    };
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.data.product_no = options.product_no;
    console.log(options)
    self.getMainData()
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex();
    };
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.searchItem.product_no = self.data.product_no;
    postData.order = {
      create_time:'desc',
    }; 
    if(JSON.stringify(self.data.join) != "{}"){
      postData.join = api.cloneForm(self.data.join);
    };
    postData.joinAfter = {
      user_info:{
        relation_key:'user_no',
        relation_final_key:'user_no',
        relation_condition:'=',
        relation_info:['name']      
      },

      product:{
        relation_key:'product_no',
        relation_final_key:'product_no',
        relation_condition:'=',
        relation_info:['title']      
      }
    };

    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });
      console.log(self.data.mainData)
      wx.hideLoading();
    };
 
    api.flowLogGet(postData,callback);
  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },
})