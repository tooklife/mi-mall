$(function(){

    // 获取地址
    $.ajax({
        type: "get",
        url: "http://localhost:10086/selectAddress",
        data: {
            userName:'18219106065'
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
        }
    });
    
})