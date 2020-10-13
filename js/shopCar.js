let name = '';
let totPrc = 0;
let allNum = 0;
let allPrc = 0;
let allProNum = 0;

function pay() {
    let arr = [];

    for (let i = 0; i < $('.tcontent').length; i++) {
        if ($($('.tcontent')[i]).find('input[type="checkbox"]')[0].checked) {
            let obj = {};
            obj.name = $($('.tcontent')[i]).children('.oName').text();
            obj.currentPrice = parseInt($($('.tcontent')[i]).children('.price').text());
            obj.quantity = parseInt($('.tcontent').eq(i).children('.oNum').find('input').val());
            obj.totalPrice = parseInt($($('.tcontent')[i]).children('.tPrice').text());
            obj.picture1 = $($('.tcontent')[i]).find('img').attr('src')

            arr.push(obj);
        }
    }

    window.sessionStorage.setItem('productlist', JSON.stringify(arr));
}

function del(that) {
    let keys = $(that).siblings('.hid').html();
    let ordername = $(that).siblings('.oName').text();
    ordername = ordername.substring(0,ordername.length-5)
    // console.log(arr);
    let rel = name + ordername + keys;

    console.log(rel);

    $.ajax({
        type: "get",
        url: "http://sdfsdfsdf.xyz/user/removeShoppingCard",
        data: {
            key: rel
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res == 1) {
                $(that).parent().remove();
            }
        }
    });
}

function add(that) {
    let res = parseInt($(that).siblings('input').val());
    res += 1;
    let totprice = parseInt($(that).parent().parent().siblings('.price').html()) * res;

    allProNum ++ ;
    console.log(totprice);
    $('.count').html(allProNum);
    $(that).siblings('input').val(res);
    $(that).parent().parent().siblings('.tPrice').html(totprice + "元");

    if($(that).parent().parent().parent().find('input[type="checkbox"]').prop('checked')){
       allPrc += parseInt($(that).parent().parent().siblings('.price').html());
         allNum ++;
         // allProNum ++;
        $('#allprc').html(allPrc);
        $('.pieces').html(allNum);

    }else{

        console.log(allPrc);
    }
}

function sub(that) {
    let res = parseInt($(that).siblings('input').val());
    res -= 1;
    let totprice = parseInt($(that).parent().parent().siblings('.price').html()) * res;

    allProNum --;
    $('.count').html(allProNum);
    $(that).siblings('input').val(res);
    $(that).parent().parent().siblings('.tPrice').html(totprice + "元");

    if($(that).parent().parent().parent().find('input[type="checkbox"]').prop('checked')){
        allPrc -= parseInt($(that).parent().parent().siblings('.price').html());
        allNum --;
        // allProNum --;
        $('#allprc').html(allPrc);
        $('.pieces').html(allNum);
    }
}

function checkNum(that) {
    if ($(that).is(':checked')) {

        allNum += parseInt($(that).parent().siblings('.oNum').find('input').val());
        allPrc += parseInt($(that).parent().siblings('.tPrice').html());

        $('.pieces').html(allNum);
        $('#allprc').html(allPrc);
    } else {
        allNum -= parseInt($(that).parent().siblings('.oNum').find('input').val());
        allPrc -= parseInt($(that).parent().siblings('.tPrice').html());
        //
        $('.pieces').html(allNum);
        $('#allprc').html(allPrc);
    }
}

function shouye() {
    window.location.href = "../index.html";
}

function checkAll(that){
    let trArr = $('table').children('.tcontent');

    if($(that).is(':checked')){
        for (let i = 0; i < trArr.length; i++) {
            $(trArr[i]).find('.myCheck').prop('checked',true)
        }
    }else if($(that).is(':checked') == false){
        for (let i = 0; i < trArr.length; i++) {
            $(trArr[i]).find('.myCheck').prop('checked',false)

        }
    }
    console.log($(that).is(':checked'));

}


$(function () {
    console.log(allPrc);

    name = JSON.parse(window.sessionStorage.getItem('username'));
    let num = 0;

    $.ajax({
        type: "get",
        url: "http://sdfsdfsdf.xyz/user/getShoppingCard",
        data: {
            name: name,
        },
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i = 0; i < res.length; i++) {
                totPrc = res[i].currentPrice * res[i].quantity;
                console.log(res[i].picture1);

                $('table').append(`
                <tr class="tcontent">
                    <td class="oCheck"><input type="checkbox" class="myCheck" onclick="checkNum(this)"></td>
                    <td class="oName"><img src="${res[i].picture1}" alt="">${res[i].productName} ${res[i].color}</td>
                    <td class="price">${res[i].currentPrice}元</td>
                    <td class="oNum">
                        <div class="num_btn">
                            <a href="javascript:void(0)" onclick="sub(this)">-</a> <input type="text" readonly="readonly" value="${res[i].quantity}"> <a href="javascript:void(0)" onclick="add(this)">+</a>
                        </div>
                    </td>

                    <td class="tPrice">${totPrc}元</td>
                    <td onclick="del(this)"><i class="iconfont icon-iconzhengli-"></i></td>
                    <td class="hid">${res[i].shoppingCartId}</td>
                </tr>
                `);

                window.sessionStorage.setItem('id', res[i].shoppingCartId);
                num = i;
            }
            num += 1;
            $('.count').html(num);
            allProNum = num;
            $('.pieces').html(allNum);
        }
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
