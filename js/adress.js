$(function(){

    // 获取地址
    $.ajax({
        type: "get",
        url: "http://10.168.0.196/selectAddress",
        data: {
            userName:'18219106065'
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
        }
    });
    
})