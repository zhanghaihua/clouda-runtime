define("device",function(module) {
    var lightapp = this;
    //定义 globalization 空间，clouda.device.globalization 
    var it = module.globalization = {};
    
    //需要device的globalization模块
    var boot = ['dateToString','getCurrencyPattern','getDateNames','getDatePattern','getFirstDayOfWeek',
    'getLocaleName','getNumberPattern','getPreferredLanguage','isDayLightSavingsTime','numberToString',
    'stringToDate','stringToNumber'];
    
    for(var i=0,len=boot.length;i<len;i++){
        try{
            it[boot[i]] = device.globalization[boot[i]];
        }catch(e){
            it[boot[i]] = this.error;
        }
    }
    
    return module;
});