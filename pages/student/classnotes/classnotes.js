// pages/student/classnotes.js
import {Api} from '../../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchItem:{
      thirdapp_id:70
    }
  
  },
    

  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getLabelData();
    self.getMainData();
  },



  intoPath(e){

    const self = this;

    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  getLabelData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:['=','70'],
      type:
        ['in',['7','8']]
    };

    const callback = (res)=>{
      self.data.labelData = res
      wx.hideLoading();
      self.setData({
        web_labelData:self.data.labelData,
      });
      console.log(self.data.labelData)
      
    };
    api.labelGet(postData,callback);
  },


  spuChange(e){
    const self = this;   
    console.log(e);
    var index = api.getDataSet(e,'index');
    var itemId = api.getDataSet(e,'id');
    console.log(index+'/'+itemId);
    if(itemId){
      
      self.data.spuItem[self.data.web_index] = itemId;
      self.setData({
        web_spuItem:self.data.spuItem
      });
      var spuItem = [];
      for (var i in self.data.spuItem) {
        spuItem.push(self.data.spuItem[i])
      };
      if(JSON.stringify(self.data.join) == "{}"){
        self.data.join = {
          relation:{
            searchItem:{
              relation_two:['in',spuItem]
            },
            s_key:'relation_one',
            key:'product_no',
            condition:'in',
          },
        };
      }else{
        self.data.join.relation.searchItem.relation_two[1] = spuItem;
      };
      console.log(self.data.join);
      self.getMainData(true);
    };

    if(index||index==0){
      if(self.data.web_index>=0){
        self.data.web_index = -1;
      }else{
        self.data.web_index = index;
      };
      self.setData({
        web_index:self.data.web_index
      }); 
    };     

  },


  getMainData(isNew){
    const self = this;
    console.log(wx.getStorageSync('info').user_no);
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.join = {
      FlowLog:{
        searchItem:{
          user_no:['=',[wx.getStorageSync('info').user_no]],
          type:['=',[6]]
        },
        s_key:'product_no',
        key:'product_no',
        condition:'in',
      },
      relation:{
        searchItem:{
          relation_two:['in',[353]]
        },
        s_key:'relation_one',
        key:'product_no',
        condition:'in',
      },
    };
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    /*if(JSON.stringify(self.data.join) != "{}"){
      postData.join = api.cloneForm(self.data.join);
    };*/
    postData.joinAfter = {
      userInfo:{
        relation_key:'passage1',
        relation_final_key:'user_no',
        relation_condition:'=',
        relation_info:['name']
      }
    };

    const callback = (res)=>{
      self.data.time = parseInt(res.info.data.deadline);
      console.log(res.info.data.deadline)
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      console.log(self.data.mainData)
      self.setData({
        web_mainData:self.data.mainData,
        web_time:self.data.time
      });

      setTimeout(function()
      {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },300);

      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading(); 

      self.setData({
        web_mainData:self.data.mainData,
      });
      console.log(self.data.mainData)
      
    };
    api.productGet(postData,callback);
  },




})