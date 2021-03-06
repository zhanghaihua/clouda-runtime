define("device",function(module) {
    var lightapp = this;
    //定义 compass 空间，clouda.device.compass 
     /**
     * @object compass
     * @memberof clouda.device
     * @instance
     * @namespace clouda.device.compass
     */
    var it = module.compass = {};
    
    //需要device的compass模块
    // var boot = ['clearWatch','getCurrentHeading','watchHeading'];
    
    var getCurrentHeading = new delegateClass("device","compass","getCurrentHeading");
    var watchHeading = new delegateClass("device","compass","watchHeading");
    var clearWatch = new delegateClass("device","compass","clearWatch");
    
    
    /**
     * 获取当前指南针坐标，接收成功和失败的回调
     *
     * @function get
     * @memberof clouda.device.compass
     * @instance
     *
     * @param {{}} options 由onsuccess 和 onfail组成
     * @param {function} options.onsuccess 成功的回调
     * @param {function} [options.onfail] 失败的回调
     * @returns null
     * 
     */
    it.get = function(options){

        getCurrentHeading(function(obj){
            if ( typeof obj==='object' && typeof obj.magneticHeading !='undefined' && typeof obj.trueHeading !='undefined' ){
                options.onsuccess.apply(this,arguments);
            }else{
                lightapp.error(ErrCode.CPS_ERROR,ErrCode.UNKNOW_CALLBACK,options);
            }
        },function(nativeErr){
            lightapp.error(ErrCode.CPS_ERROR,nativeErr,options);
        },options);
    };
    
    /**
     * 已一定的频率，获取当前指南针坐标，接收成功，失败的回调和间隔
     *
     * @function startListen
     * @memberof clouda.device.compass
     * @instance
     *
     * @param {{}} options 由onsuccess 和 onfail组成
     * @param {function} options.onsuccess 成功的回调 
     * @param {function} [options.onfail] 失败的回调
     * @param {number} [options.frequency] 检查的间隔，默认100 ms
     * @returns null
     * 
     */
    var start_id;
    it.startListen = function(options){
        if(start_id){
            clearWatch(start_id);
        }
        installPlugin("device", function(device) {
            start_id = device.compass.watchHeading(function(obj){
                if ( typeof obj==='object' && typeof obj.magneticHeading !='undefined' && typeof obj.trueHeading !='undefined' ){
                    options.onsuccess.apply(this,arguments);
                }else{
                    lightapp.error(ErrCode.CPS_ERROR,ErrCode.UNKNOW_CALLBACK,options);
                }
            }, function(error) {
               lightapp.error(ErrCode.CPS_ERROR,error,options);
            });
        });
    };
    /**
     * 终止获取回调
     *
     * @function stopListen
     * @memberof clouda.device.compass
     * @instance
     * 
     * 
     * @param {function} [options.onfail] 失败的回调
     * @returns null
     * 
     */
    it.stopListen = function() {
        clearWatch(start_id);
    };
    return it;
});