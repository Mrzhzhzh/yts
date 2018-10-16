// pages/teacher/classnotes.js
import {Api} from '../../../../utils/api.js';
var api = new Api();


Page({


  data: {
    mainData:[],
    searchItem:{
      thirdapp_id:['=','70'],
      category_id:['=','356'],
    },
    time:'',
    user_no:'',
    web_show:false,
    FlowLogData:[],
    sForm:{
      allowance:''
    }
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
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.searchItem.passage1 = wx.getStorageSync('info').user_no;
    postData.searchItem.id = self.data.id;
    postData.getAfter = {
      
      FlowLog:{
        tableName:'FlowLog',
        middleKey:'product_no',
        key:'product_no',
        searchItem:{
          status:1
        },
        condition:'=',
        compute:{
          totalCount:[
            'count',
            'any',
            {
              status:1
            }
          ]         
        }   
      },

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
    }
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
        self.getFlowLogData(res.result)
     
        console.log(res.result);
            
      }
    })  
  },

  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    console.log(self.data.sForm)
    self.setData({
      web_sForm:self.data.sForm,
    });  
  },

  getFlowLogData(result){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      type:'6',   
      user_type:0,
      user_no:result,
      product_no:self.data.mainData.info.data[0].product_no,
    };
    const callback = (res)=>{
      self.data.FlowLogData = res;
      if(self.data.FlowLogData.info.data.length>0){
          api.showToast('该学生已上课','none');
          return
        };
        const c_callback = (child_res)=>{       
          var price = child_res.info.FlowLog.pricesum/child_res.info.FlowLog.countsum;
          const postData = {
            token:wx.getStorageSync('token'),
            data:{
              user_no:result,
              type:6,
              price:price,
              count:-1,
              trade_info:'已上课',
              product_no:self.data.mainData.info.data[0].product_no,
            
            },
            searchItem:{
              user_type:0
            }
          };
          const cc_callback = (res)=>{
            console.log(res)
            if(res.solely_code==100000){
              api.showToast('扫码成功','none');
              self.getMainData(true)
            }else{
              api.showToast('未知错误','none');
            } 
          }               
          api.flowLogAdd(postData,cc_callback)
        };
        self.getComputeData(res.result,c_callback); 
      };
    api.flowLogGet(postData,callback);
  },




  changeCourseStatus(e){
    const self = this;
    const postData = {
      token:wx.getStorageSync('token'),
      passage3:api.getDataSet(e,'passage'),
      product_no:self.data.mainData.info.data[0].product_no,
      allowance:self.data.sForm.allowance
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