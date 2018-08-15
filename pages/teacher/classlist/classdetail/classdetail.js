// pages/teacher/classnotes.js
import {Api} from '../../../../utils/api.js';
var api = new Api();


Page({


  data: {
    join:{},
    mainData:[],
    searchItem:{
      thirdapp_id:['=','70'],
      category_id:['=','356'],
    },
    time:'',
    user_no:'U719050804405287',
    web_show:false
  },



  onLoad(options) {
    const self = this;
    const pass = api.checkTeacherLogin();
      if(pass){
        self.setData({
          web_show:true
        })
    };
    self.data.paginate = api.cloneForm(getApp().globalData.paginate)
    self.data.id = options.id;
    self.getMainData();
  },



  getMainData(isNew){
    const self = this;
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.searchItem.passage1 = wx.getStorageSync('info').user_no;
    postData.searchItem.id = self.data.id;
    if(JSON.stringify(self.data.join) != "{}"){
      postData.join = api.cloneForm(self.data.join);
    };
    postData.joinAfter = {
      FlowLog:{
        relation_key:'product_no',
        relation_final_key:'product_no',
        relation_condition:'=',
        
        relation_compute:{
          All:'count',
        },
      }
      
    };
    const callback = (res)=>{
      self.data.mainData = res;
      self.setData({
        web_mainData:self.data.mainData,
      });
      console.log(self.data.mainData)
      
    };
    api.productGet(postData,callback);
  },


  getComputeData(user_no,callback){
    const self = this;
    const postData = {};
    postData.data = {
      FlowLog:{
        compute:{
          price:'sum',
          count:'sum',
        },
        
        searchItem:{
          user_no:user_no,
          type:2,
          count:['>',0]
        }
      }
    };
    
    const child_callback = (res)=>{
      callback&&callback(res);    
    };
    api.flowLogCompute(postData,child_callback);
  },


  scan(){
    const self = this;
    wx.scanCode({
      success: (res) => {
        console.log(res.result);
        const callback = (child_res)=>{
          
          var price = child_res.info.FlowLog.pricesum/child_res.info.FlowLog.countsum;
          const postData = {
            token:wx.getStorageSync('token'),
            data:{
              user_no:res.result,
              type:6,
              price:price,
              count:-1,
              trade_info:'已上课',
              product_no:self.data.mainData.info.data[0].product_no
            }
          };
          const callback = (res)=>{
            api.dealRes(res);
          };
          api.flowLogAdd(postData,callback)
        };
        self.getComputeData(res.result,callback);     
      }
    })  
  },


  changeCourseStatus(e){
    const self = this;
    const postData = {
      token:wx.getStorageSync('token'),
      passage3:api.getDataSet(e,'passage'),
      product_no:self.data.mainData.info.data[0].product_no
    };
    const callback = (res)=>{
      api.dealRes(res);
      self.getMainData(true)
    };

    api.changeCourseStatus(postData,callback);
    
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },



})