function userPay(that) {

    // 以下功能需改为直接从页面中获取地址
    // $('#adinfo').html();
    let orderSta = 1;
    let rcptname = JSON.parse(window.sessionStorage.getItem('rcptname'));
    let phonenumber = JSON.parse(window.sessionStorage.getItem('phonenumber'));
    let adressdetail = JSON.parse(window.sessionStorage.getItem('adressdetail'));
    // let tag = window.sessionStorage.getItem('tag'); //标签
    let username = JSON.parse(window.sessionStorage.getItem('username'));
    let paymethod = $(that).children('span').text();

    let nickname = JSON.parse(window.sessionStorage.getItem('nickname'));

    
    let arr = JSON.parse(window.sessionStorage.getItem('productlist'));

    let obj = {};
    let arrobj = [];

    
    
    
    console.log(arr);
    // console.log($('#odlist').children('li').text());

    for (let  i = 0; i < arr.length; i++) {
        let productlist = {};

        productlist['productMount'] = arr[i].currentPrice;
        productlist['productPicture'] = arr[i].picture1;
        productlist['productNumber'] = parseInt(arr[i].quantity);
        productlist['productName'] = arr[i].name.substring(0,arr[i].name.length-5);
        productlist['productColor'] = arr[i].name.substring(arr[i].name.length-4);
        arrobj.push(productlist);
    }
    

    

    obj.owner = username;
    obj.orderStatus = orderSta;
    obj.consign = rcptname;
    obj.consignPhone = phonenumber;
    obj.consignAddress = adressdetail;
    obj.payMethod = paymethod;
    obj.productList = arrobj;
    obj.nickName = nickname;

    console.log(obj);

    console.log(JSON.stringify(obj));
    $.ajax({
        type: "post",
        url: "http://localhost:10086/order/insertOrder",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            if(res != 0){
                alert('订单提交成功');
            }
        }
    });
}


$(function () {


    let rcptname = JSON.parse(window.sessionStorage.getItem('rcptname'));
    let phonenumber = JSON.parse(window.sessionStorage.getItem('phonenumber'));
    let adressdetail = JSON.parse(window.sessionStorage.getItem('adressdetail'));
    // let tag = window.sessionStorage.getItem('tag'); //标签
    // let username = JSON.parse(window.sessionStorage.getItem('username'));

    let arr = JSON.parse(window.sessionStorage.getItem('productlist'));
    
    
    $('.cright b').html(window.sessionStorage.getItem('totPrc'));

    console.log(rcptname, phonenumber, adressdetail, arr);

    $('.toggleadd').html('收货信息：' + rcptname + ' ' + phonenumber + ' ' + adressdetail)
    $('#adinfo').html(rcptname + ' ' + phonenumber + ' ' + adressdetail)
    for (let i = 0; i < arr.length; i++) {
        
        $('#odlist').append(`
            <li>${arr[i].name}</li>
        `)
    }
    
    $('.showmsg').click(function () {
        $('.infobt').slideToggle();
        $('.toggleadd').toggle();
    });

    // logo动画
    $('.logo').hover(function () {
        $('.logo>ul').stop().animate({
            'left': '0'
        }, 150)

    }, function () {
        $('.logo>ul').stop().animate({
            'left': '-45px'
        }, 150)
    });

    $('.logo').click(function(){
        window.location.href = '../index.html'
    })

})