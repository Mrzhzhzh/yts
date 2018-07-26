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
      passage1:wx.getStorageSync('info').user_no,
      id:''
    },
    time:'',
  
  },

  onLoad(options) {
   const self = this;
   self.data.searchItem.id = options.id;
   self.getMainData()
  },

  getMainData(isNew){
    const self = this;
    const postData = {};
    postData.paginate = self.data.paginate;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    if(JSON.stringify(self.data.join) != "{}"){
      postData.join = api.cloneForm(self.data.join);
    };
    const callback = (res)=>{
      self.data.mainData = res;
      self.data.time = parseInt(res.info.data[0].deadline);
      
      self.setData({
        web_mainData:self.data.mainData,
        web_time:self.data.time
      });
      console.log(self.data.mainData)
      
    };
    api.productGet(postData,callback);
  },
})