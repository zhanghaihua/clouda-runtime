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
     * @function getCurrentHeading
     * @memberof clouda.device.compass
     * @instance
     *
     * @param {{}} options 由onSuccess 和 onFail组成
     * @param {function} options.onSuccess 成功的回调
     * @param {function} [options.onFail] 失败的回调
     * @returns null
     * 
     */
    it.getCurrentHeading = function(options){
        getCurrentHeading(options.onSuccess,function(){
            if (options && typeof options.onFail == 'function'){
                options.onFail(ErrCode.ACC_GET_ERR);
            }else{
                lightapp.error(ErrCode.ACC_GET_ERR);
            }
        },options);
    };
    
    /**
     * 已一定的频率，获取当前指南针坐标，接收成功，失败的回调和间隔
     *
     * @function listen
     * @memberof clouda.device.compass
     * @instance
     *
     * @param {{}} options 由onSuccess 和 onFail组成
     * @param {function} options.onSuccess 成功的回调 
     * @param {function} [options.onFail] 失败的回调
     * @param {number} [options.frequency] 检查的间隔，默认100 ms
     * @returns null
     * 
     */
    var start_id;
    it.listen = function(options){
        start_id = watchHeading(options.onSuccess,function(){
            if (options && typeof options.onFail == 'function'){
                options.onFail(ErrCode.ACC_GET_ERR);
            }else{
                lightapp.error(ErrCode.ACC_GET_ERR);
            }
            
        },options);
    };
    /**
     * 终止获取回调
     *
     * @function stop
     * @memberof clouda.device.compass
     * @instance
     *
     * @param {{}} options 由onSuccess 和 onFail组成
     * @param {function} options.onSuccess 
     * @param {function} [options.onFail] 失败的回调
     * @returns null
     * 
     */
    it.stop = function() {
        clearWatch(start_id);
    };
    return it;
});