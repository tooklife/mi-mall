let flag = 0;

function settlement() {
    console.log(flag);
    if(flag == 1){
        window.location.href = "../html/orderSuccess.html";
    }else{
        alert('请选择地址');
    }

}

function deladress(that){
    let addressId = $(that).siblings('div').children('span').text();
    $.ajax({
        url: 'http://localhost:10086/address/deleteAddress',
        type: 'get',
        dataType: 'json',
        data: {
            addressId
        }
    })
    .done(function(res) {
        if(res == 1){
            $(that).parent().parent('li').remove();
        }
    })
    .fail(function() {
        console.log("error");
    })


}

function modifyAdress(that){
   
    $('#edtAdress').removeAttr('hidden');

    let addressId = $(that).siblings('div').children('span').html();
    let name = $(that).siblings('div').children('h3').html();
    let phoneNumber = $(that).siblings('div').children('#adressPhone').html();
    let adressdetail = $(that).siblings('div').children('#adressDetail').html();
    console.log(phoneNumber, adressdetail);
    $('#edtAdress .container').children('.name').val(name);
    $('#edtAdress .container').children('.phonenumber').val(phoneNumber);
    $('#edtAdress .container').children('.adressdetail').val(adressdetail);



    $('.determine').click(function(){
        let owner = JSON.parse(window.sessionStorage.getItem('username'));
        // let addressId = $(that).siblings('div').children('span').html();
        let consignee = $('#edtAdress .container').children('.name').val();
        let phone = $('#edtAdress .container').children('.phonenumber').val();
        let address = $('#edtAdress .container').children('.adressdetail').val()
        console.log(1);
        console.log(consignee, phone, address);
        $.ajax({
            url: 'http://localhost:10086/address/updateAddress',
            type: 'get',
            dataType: 'json',
            data : {
                addressId,
                owner,
                consignee,
                phone,
                address
            }
        })
        .done(function(res) {
            if(res == 1){
                $('#edtAdress').attr('hidden', 'hidden');
                alert('修改成功');
               
                let name = $('#edtAdress .container').children('.name').val();
                let phone = $('#edtAdress .container').children('.phonenumber').val();
                let address = $('#edtAdress .container').children('.phonenumber').val();
                $(that).siblings('div').children('h3').html(name);
                $(that).siblings('div').children('#adressPhone').html(phone);
                $(that).siblings('div').children('#adressDetail').html(address);
                
                window.location.reload();
            }
        })
        .fail(function() {
            console.log("error");
        })

    })
}



$(function () {

    let username = JSON.parse(window.sessionStorage.getItem('username'))

    $.ajax({
        type: "get",
        url: "http://localhost:10086/address/selectAddress",
        dataType: "json",
        data: {
            userName: username
        },
        success: function (res) {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
                $('.content .adresslist').prepend(`
                    <li class="adli">
                        <div class="adressmsg">
                            <i class="iconfont icon-iconzhengli-" onclick="deladress(this)"></i>
                            <div>
                                <span>${res[i].addressId}</span>
                                <h3>${res[i].consignee}</h3>
                                <p id="adressPhone">${res[i].phone}</p>
                                <p id="adressDetail">${res[i].address}</p>
                            </div>
                            <span onclick="modifyAdress(this)">修改</span>
                        </div>
                    </li>
                `);
            }

            

            for (let i = 0; i < $('.adresslist .adli').length + 1; i++) {

                console.log(i);


                $('.adresslist .adli').eq(i).click(function (e) {

                    flag = 1;
                    console.log(flag);

                    let rcptname = $(this).find('h3').html();
                    let phonenumber = $(this).find('p').eq(0).html();
                    let adressdetail = $(this).find('p').eq(1).html();

                    $(this).children('.adressmsg').css('border-color', '#f60').parents('.adli').siblings().children('.adressmsg').css('border-color', '#e0e0e0');
                    $(this).children('.adressmsg').children('span').css('display','block').parents('.adli').siblings().children('.adressmsg').children('span').css('display','none');
                    $(this).children('.adressmsg').children('i').css('display','block').parents('.adli').siblings().children('.adressmsg').children('i').css('display','none');


                    window.sessionStorage.setItem('rcptname', JSON.stringify(rcptname));
                    window.sessionStorage.setItem('phonenumber', JSON.stringify(phonenumber));
                    window.sessionStorage.setItem('adressdetail', JSON.stringify(adressdetail));
                    // window.sessionStorage.setItem('tag', JSON.stringify(tag));
                });

            }
        }
    });

    let productlist = JSON.parse(window.sessionStorage.getItem('productlist'));
    let totPrc = 0;
    let num = 0;

    console.log(productlist);
    for (let i = 0; i < productlist.length; i++) {
        $('.order_list ul').append(`
            <li >
                <img src="${productlist[i].picture1}">
                <i>${productlist[i].name}</i>
                <span>${productlist[i].currentPrice} x ${productlist[i].quantity}</span>
                <span>${productlist[i].totalPrice}元</span>
            </li>
        `)
        totPrc += productlist[i].totalPrice;
        num = i + 1;
    }

    $('#count').html(num+'件');
    $('#allprc').html(totPrc);
    $('.prclist').html(totPrc + '元');



    window.sessionStorage.setItem('totPrc', totPrc)

    $('.adress').click(function () {
        $('#window').removeAttr('hidden');
    });

    $('.save').click(function () {
        // 地址添加

        console.log('添加成功');

        let consignee = $('.name').val();
        let phone = $('.phonenumber').val();
        let adressdetail = $('.adressdetail').val();
        let tag = $('.tag').val();
        let owner = JSON.parse(window.sessionStorage.getItem('username'));

        console.log(consignee,owner);


        $.ajax({
            type: "get",
            url: 'http://localhost:10086/address/insertAddress',
            data:{
                owner, //所属人
                consignee, //收货人
                phone, //电话
                address: adressdetail
                // postalcode, //邮编
                // note //标签
            },
            dataType: "json",
            success: res => {
                console.log(res);
                if(res == 1){
                    $('.content .adresslist').prepend(`
                        <li class="adli">
                            <div class="adressmsg">
                                <i class="iconfont icon-iconzhengli-" onclick="deladress(this)"></i>
                                <div>
                                    <h3>${consignee}</h3>
                                    <p id="adressPhone">${phone}</p>
                                    <p id="adressDetail">${adressdetail}</p>
                                </div>
                                <span onclick="modifyAdress(this)">修改</span>
                            </div>
                        </li>
                    `);
                    

                    for (let i = 0; i < $('.adresslist .adli').length + 1; i++) {

                        $('.adresslist .adli').eq(i).click(function (e) {

                            let consignee = $(this).find('h3').html();
                            let phone = $(this).find('p').eq(0).html();
                            let adressdetail = $(this).find('p').eq(1).html();

                            $(this).children('.adressmsg').css('border-color', '#f60').parents('.adli').siblings().children('.adressmsg').css('border-color', '#e0e0e0');
                            $(this).children('.adressmsg').children('span').css('display', 'block').parents('.adli').siblings().children('.adressmsg').children('span').css('display', 'none');
                            $(this).children('.adressmsg').children('i').css('display', 'block').parents('.adli').siblings().children('.adressmsg').children('i').css('display', 'none');

                            window.sessionStorage.setItem('rcptname', JSON.stringify(consignee));
                            window.sessionStorage.setItem('phonenumber', JSON.stringify(phone));
                            window.sessionStorage.setItem('adressdetail', JSON.stringify(adressdetail));
                            // window.sessionStorage.setItem('tag', JSON.stringify(tag));
                        });

                    }
                    for (let i = 0; i < $('.adresslist .adli').length + 1; i++) {

                        console.log(i);


                        $('.adresslist .adli').eq(i).click(function (e) {

                            flag = 1;
                            console.log(flag);

                            let rcptname = $(this).find('h3').html();
                            let phonenumber = $(this).find('p').eq(0).html();
                            let adressdetail = $(this).find('p').eq(1).html();

                            $(this).children('.adressmsg').css('border-color', '#f60').parents('.adli').siblings().children('.adressmsg').css('border-color', '#e0e0e0');
                            $(this).children('.adressmsg').children('span').css('display', 'block').parents('.adli').siblings().children('.adressmsg').children('span').css('display', 'none');
                            $(this).children('.adressmsg').children('i').css('display', 'block').parents('.adli').siblings().children('.adressmsg').children('i').css('display', 'none');


                            window.sessionStorage.setItem('rcptname', JSON.stringify(rcptname));
                            window.sessionStorage.setItem('phonenumber', JSON.stringify(phonenumber));
                            window.sessionStorage.setItem('adressdetail', JSON.stringify(adressdetail));
                            // window.sessionStorage.setItem('tag', JSON.stringify(tag));
                        });

                    }
                }else{
                    alert('添加失败')
                }
            }
        })



    $('#window').attr('hidden', 'hidden');



    });
    $('#window .cancle').click(function () {
        // 取消操作
        $('#window').attr('hidden', 'hidden');
    });
    $('#window .close').click(function (e) {
        $('#window').attr('hidden', 'hidden');
    });

    $('#edtAdress .cancle').click(function () {
        // 取消操作
        
        $('#edtAdress').attr('hidden', 'hidden');
    });
    $('#edtAdress .close').click(function (e) {
        $('#edtAdress').attr('hidden', 'hidden');
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
