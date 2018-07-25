// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头


class Token {

    constructor() {
    }

    verify() {

        var token = wx.getStorageSync('token');
        if (!token) {
            this.getUserInfo();
        };
            
    }

    _veirfyFromServer(token) {
        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function (res) {
                var valid = res.data.isValid;
                if(!valid){
                    //that.getTokenFromServer();
                }
            }
        })
    }

    getUserInfo(params,callback){
        var self = this;
        var wxUserInfo = {};
        if(wx.canIUse('button.open-type.getUserInfo')){
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) { 
                        wx.getUserInfo({
                            success: function(res) {                     
                                   wxUserInfo = res.userInfo;
                                /*self.getTokenFromServer(wxUserInfo,params,callback);*/
                                self.getToken(callback,params)
                            }
                        });
                    }else{
                        /*self.getTokenFromServer(wxUserInfo,params,callback);*/
                        self.getToken(callback,params)
                    }
                },
                fail: res=>{
                    wx.showToast({
                        title:'拉取微信失败',
                        icon:'fail',
                        duration:2000,
                        mask:true
                    })
                }
            });
        }else{
            wx.getUserInfo({
                success: function(res) {
                    wxUserInfo = res.userInfo;
                    /*self.getTokenFromServer(wxUserInfo,params,callback);*/
                    self.getToken(callback,params)   
                    
                }
            });
        };
        
        

    }

    getTokenFromServer(data,params,callback) {
        var self  = this;
        wx.login({
            success: function (res) {
                var postData = {};
                postData.thirdapp_id = getApp().globalData.thirdapp_id;
                postData.code = res.code;
                if(data.nickName&&data.avatarUrl){
                    postData.nickname = data.nickName;
                    postData.headimgurl = data.avatarUrl;
                };
                if(wx.getStorageSync('openidP')){
                    postData.openid = wx.getStorageSync('openidP');
                };
                postData.headimgurl = data.avatarUrl;
                wx.request({
                    url: 'https://solelytech.iicp.net/public/index.php/api/v1/token/user',
                    method:'POST',
                    data:postData,
                    success:function(res){
                        if(res.data&&res.data.token){
                            wx.setStorageSync('token', res.data.token);
                            wx.setStorageSync('openid', res.data.openid);
                            if(params&&callback){
                                params.data.token = res.data.token;
                                callback && callback(params);
                            }
                            
                        }else{
                            wx.showToast({
                                title: '获取token失败',
                                icon: 'fail',
                                duration: 1000,
                                mask:true
                            })
                        }
                        
                        
                    }
                })
                
            }
        })
        
    }


    getToken(callback,params){

        if(wx.getStorageSync('login').login_name&&wx.getStorageSync('login').password){
            var postData = {
                login_name:wx.getStorageSync('login').login_name,
                password:wx.getStorageSync('login').password,
            }

            wx.request({
                url: 'http://solelytech.iicp.net/yts/public/api/v1/Func/Common/loginByUp',
                method:'POST',
                data:postData,
                success:function(res){
                    console.log(res)
                    if(res.data&&res.data.token){
                        wx.setStorageSync('token', res.data.token);
                        var login = wx.getStorageSync('login');   
                        wx.setStorageSync('login',login);
                        wx.setStorageSync('info',res.data.info);
                        wx.setStorageSync('type',res.data.info.type);
                        if(params&&callback){  
                            params.data.token = res.data.token;
                             
                            callback && callback(params);
                        }else if(callback){
                            callback && callback(res);
                        };

                        
                    }else{
                        setTimeout(function(){
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'fail',
                                duration: 1000,
                                mask:true
                            });
                        },500);

                       
                        wx.removeStorageSync('token');
                        wx.removeStorageSync('login');
/*                        wx.redirectTo({
                            url:'/pages/teacher/login/login'
                        })*/
                    }
                    
                    
                }
            })
        }else{
            wx.redirectTo({
              url: '/pages/teacher/login/login'
            });
        };
        

    }
}

export {Token};