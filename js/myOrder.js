$(function(){
    // 获取商品 
    $.ajax({
        type: "get",
        url: "http://10.168.0.196/selectByUsername",
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