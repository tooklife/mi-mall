$(function(){
    // 获取商品 
    $.ajax({
        type: "get",
        url: "http://sdfsdfsdf.xyz/selectByUsername",
        data: {
            userName : 18814233835,
            orderNumber : 0,
            product : 0
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
        }
    });
})