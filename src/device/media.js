define("device",function(module) {
    var lightapp = this;
    //定义 camera 空间，clouda.device.media 支持退化
    var it = module.media = {};
    /**
     * @object media
     * @memberof clouda.device
     * @instance
     * @namespace clouda.device.media
     */
    
    //定义类型
    module.MEDIA_DESTINATION.DATA_URL = 0;
    module.MEDIA_DESTINATION.FILE_URI = 1;
    module.MEDIA_DESTINATION.NATIVE_URI = 2;
    
    module.MEDIA_ENCODEING.JPEG = 0;
    module.MEDIA_ENCODEING.PNG = 1;
    
    module.MEDIA_TYPE.PICTURE = 0;
    module.MEDIA_TYPE.VIDEO = 1;
    module.MEDIA_TYPE.ALLMEDIA = 2; //for function getMedia only
    module.MEDIA_TYPE.AUDIO = 3; //for function captureMedia only
    
    
    module.MEDIA_SOURCE.PHOTOLIBRARY = 0;
    module.MEDIA_SOURCE.CAMERA = 1;
    
    module.MEDIA_DIRECTION.BACK = 0;
    module.MEDIA_DIRECTION.FRONT = 1;
    
    
     
    var getPicture = new delegateClass("device","camera","getPicture");
    // var cleanup = new delegateClass("device","camera","cleanup");
    var captureAudio = new delegateClass("device","capture","captureAudio");
    var captureImage = new delegateClass("device","capture","captureImage");
    var captureVideo = new delegateClass("device","capture","captureVideo");
    
    
    /**
     * 启动canema，支持读取手机图库或者拍照
     *
     * @function getMedia
     * @memberof clouda.device.media
     * @instance
     *
     * @param {{}} options 可定义
     * @param {function} options.onSuccess 成功
     * @param {function} options.onFail 失败
     * @param {number} [options.quality] 
     * @param {number} [options.destinationType]
     * @param {number} [options.sourceType] 
     * @param {number} [options.mediaType]
     * @param {number} [options.mediaDirection]
     * @param {number} [options.encodingType]
     * @param {boolen} [options.saveToPhotoAlbum] 
     * @returns null
     * 
     */
    
    it.getMedia = function(options){
        getPicture(function(imageData){//success callback
            if (imageData && typeof imageData=='string'){
                options.onSuccess.apply(this,arguments);
            }else{
                lightapp.error(ErrCode.MEDIA_ERR,options);
            }
            
        },function(nativeErr){
            lightapp.error(ErrCode.MEDIA_ERR,nativeErr,options);
        },options);
    };
    
    /**
     *
     * Launch audio recorder application for recording audio clip(s).
     *
     * @function captureMedia
     * @memberof clouda.device.media
     * @instance
     *
     * @param {{}} options
     * @param {Function} options.onSuccess
     * @param {Function} options.onFail
     * @param {int} options.media_type=clouda.device.MEDIA_TYPE.PICTURE
     * @param {int} [options.limit=1]
     * @param {int} [options.duration=0]
     * @returns null
     * 
     */
    
    it.captureMedia = function(options){
        var func;
        if (options.media_type == clouda.device.MEDIA_TYPE.VIDEO){
            func=captureVideo;
        }else if (options.media_type == clouda.device.MEDIA_TYPE.AUDIO){
            func=captureAudio;
        }else{//默认 MEDIA_TYPE.PICTURE
            func=captureImage;
        }
        func(function(mediaFile){
            if (mediaFile && typeof mediaFile=='object'){
                options.onSuccess.apply(this,arguments);
            }else{
                lightapp.error(ErrCode.MEDIA_ERR,options);
            }
        },options.onSuccess,function(nativeErr){
            lightapp.error(ErrCode.MEDIA_ERR,nativeErr,options);
        },options);
    };
    
    return module;
});