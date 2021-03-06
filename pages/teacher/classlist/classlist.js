// pages/teacher/classlist.js
import {Api} from '../../../utils/api.js';
var api = new Api();

Page({


  data: {
    mainData:[],
    num:'',
    searchItem:{
      thirdapp_id:['=','70'],
      category_id:['=','356'],  
      
    },
    join:{},
 
   
    startTime:'',
    endTime:'',
    web_areaId:{},
    web_subjectId:{},
    web_index:-1,
    join:{},
    time:'',
    web_show:false,
  
  },
   
  

  onLoad(options){
    const self = this;
    console.log(options.num)
    if(options.num){
      this.setData({
        num: options.num
      });
      self.data.searchItem.passage3 = options.num
    };
    wx.showLoading();
    const pass = api.checkTeacherLogin();
    if(pass){
        self.setData({
          web_show:true
        })
    }else{
      wx.reLaunch({
        url:'/pages/teacher/login/login'
      });
    };
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getLabelData();

  },

  getLabelData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:['=','70'],
      type:['in',['7','8']],

    };
    const callback = (res)=>{
      self.data.labelData = res
      wx.hideLoading();
      self.setData({
        web_labelData:self.data.labelData,
      });
    };

    api.labelGet(postData,callback);
    
  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },


  onPullDownRefresh:function(){
    const self = this;
    wx.showNavigationBarLoading();
    delete self.data.searchItem.deadline;
    delete self.data.searchItem.view_count;
    delete self.data.searchItem.discount;
    self.data.startTime = '';
    self.data.endTime = '';
    
    
    self.setData({
       web_startTime:self.data.startTime,
       web_endTime:self.data.endTime, 
       web_areaId:'',
       web_subjectId:''
    })

    self.getMainData(true);
  },


  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.searchItem.passage1 = wx.getStorageSync('info').user_no;
    postData.getAfter = {
      spuOne:{
        tableName:'label',
        middleKey:'view_count',
        key:'id',
        condition:'=',
        searchItem:{
          status:1
        },
        info:['title']
      },
    
      spuTwo:{
        tableName:'label',
        middleKey:'discount',
        key:'id',
        condition:'=',
        searchItem:{
          status:1
        },
        info:['title']
      }
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      console.log(self.data.mainData)
      self.setData({
        web_mainData:self.data.mainData, 
      });
      setTimeout(function()
      {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },300);
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });     
    };
    api.productGet(postData,callback);
  },



  menuClick: function (e) {
    const self = this;
    const num = e.currentTarget.dataset.num;
    self.changeSearch(num);
  },


  changeSearch(num){
    const self = this;
    self.setData({
      num: num
    });
    if(num==0){
      self.data.searchItem={
        thirdapp_id:['=','70'],
        category_id:['=','356'],  
      }
    }else{
      self.data.searchItem.passage3 = num;
    }
    self.getMainData(true);
  },


  searchItemChange(e){
    const self = this;   
    console.log(e);
    var index = api.getDataSet(e,'index');
    var itemId = api.getDataSet(e,'id');
    console.log(index+'/'+itemId);
    if(itemId){
      console.log(666)
      if(index==0){
        self.data.searchItem.discount = itemId
        self.setData({
          web_areaId:self.data.searchItem.discount
        })  
      }else{
        self.data.searchItem.view_count = itemId
        self.setData({
          web_subjectId:self.data.searchItem.view_count
        })  
      }
      self.getMainData(true)
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


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },



  bindTimeChange: function(e) {
    const self = this;
    var label = api.getDataSet(e,'type');
    this.setData({
      ['web_'+label]: e.detail.value
    });
    self.data[label+'stap'] = new Date(self.data.date+' '+e.detail.value).getTime();
    if(self.data.endTimestap&&self.data.startTimestap){
      self.data.searchItem.deadline = ['between',[self.data.startTimestap,self.data.endTimestap]];
    }else if(self.data.startTimestap){
      self.data.searchItem.deadline = ['>',self.data.startTimestap];
    }else{
      self.data.searchItem.deadline = ['<',self.data.endTimestap];
    };
    self.getMainData(true);   
  },

  

})






