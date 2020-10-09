$(function(){

    // 获取地址
    $.ajax({
        type: "get",
        url: "http://mimall.natapp1.cc/selectAddress",
        data: {
            userName:'18219106065'
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
        }
    });
    
})