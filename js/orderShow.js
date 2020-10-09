let productVersion;
let productColor;
let productPackage;
// 产品查询
function Search(that) {
    let value = $(that).siblings('.sea_content').children('input').val();

    $.ajax({
        type: "get",
        url: "",
        data: {
            proid: value
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
        }
    });
}

// 加入购物车
function addShortcar() {
    let productname = $('.order h3').html();
    let price = parseInt($('.order p .price').html());
    let name = JSON.parse(window.sessionStorage.getItem('username'));
    let pic1 = $('.order_pic img').attr('src');

    window.sessionStorage.setItem('productName', productname);
    window.sessionStorage.setItem('productVersion', productVersion);
    window.sessionStorage.setItem('color', productColor);
    window.sessionStorage.setItem('productPicture1', pic1);

    // console.log(productname, productVersion, productColor);

    console.log(productname);
    if(name == null){
        alert('请登录')
    }else{
        $.ajax({
            type: "get",
            url: "http://mimall.natapp1.cc/user/addShoppingCart",
            data: {
                name: name,
                productName: productname,
                picture1: pic1,
                currentPrice: price,
                color: productColor,
                version: productVersion,
                conf: productPackage
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res == 1) {
                    // console.log(1);
                    window.location.href = "../html/success.html";
                } else {
                    alert('添加失败');
                }
            }
        });
    }

}


$(function () {



    let orderName = window.sessionStorage.getItem('orderName');
    let province = JSON.parse(window.sessionStorage.getItem('province'));
    let city = JSON.parse(window.sessionStorage.getItem('city'));
    // let district = JSON.parse(window.sessionStorage.getItem('district'));
    // let township = JSON.parse(window.sessionStorage.getItem('township'));
    $('.adressch').append(`
        <span>${province}</span>
        <span>${city}</span>
    `)
    $.ajax({
        type: "get",
        url: "http://mimall.natapp1.cc/product/selectByProductName",
        data: {
            productName: orderName
        },
        dataType: "json",
        success: function (res) {
            console.log(res);

            let originalPrice = res.originalPrice + "元";
            let currentPrice = res.currentPrice + "元";
            let version = res.conf;
            let color = res.color;
            let package = res.meal;

            $('.order h3').html(res.name);
            $('.order p i').html(res.rednote);
            $('.order p b').html(res.graynote);
            $('.order p .price').html(currentPrice);
            $('.order p s').html(originalPrice);

            $('.order_pic ul').append(`
                    <li>
                        <img src="http://mimall.natapp1.cc/picture/${res.picture1}">
                    </li>
                `)

            for (let i = 0; i < version.length; i++) {
                $('.version').append(`<dd>${version[i].conf}</dd>`);
            }
            for (let i = 0; i < color.length; i++) {
                $('.color').append(`<dd>${color[i].color}</dd>`);
            }
            for (let i = 0; i < package.length; i++) {
                $('.package').append(`<dd>${package[i].meal}</dd>`);
            }

            $('.version dd').eq(0).css({
                'color': '#ff6700',
                'border-color': '#ff6700'
            });
            $('.color dd').eq(0).css({
                'color': '#ff6700',
                'border-color': '#ff6700'
            });
            $('.package dd').eq(0).css({
                'color': '#ff6700',
                'border-color': '#ff6700'
            });

            let edition = $('.version dd');
            let phoneColor = $('.color dd');
            let phonePackage = $('.package dd');
            productColor = $(phoneColor[0]).html();
            productPackage = $(phonePackage[0]).html();
            productVersion = $(edition[0]).html();
            for (let i = 0; i < edition.length; i++) {

                edition[i].onclick = function () {
                    $(this).css({
                        'color': '#ff6700',
                        'border': 'solid 1px #ff6700'
                    }).siblings('dd').css({
                        'color': '#000',
                        'border': 'solid 1px #ccc'
                    });
                    productVersion = $(this).html();
                }

            }

            for (let i = 0; i < phoneColor.length; i++) {

                phoneColor[i].onclick = function () {
                    $(this).css({
                        'color': '#ff6700',
                        'border': 'solid 1px #ff6700'
                    }).siblings('dd').css({
                        'color': '#000',
                        'border': 'solid 1px #ccc'
                    });
                    productColor = $(this).html();

                }

            }

            for (let i = 0; i < phonePackage.length; i++) {

                phonePackage[i].onclick = function () {
                    $(this).css({
                        'color': '#ff6700',
                        'border': 'solid 1px #ff6700'
                    }).siblings('dd').css({
                        'color': '#000',
                        'border': 'solid 1px #ccc'
                    });
                    productPackage = $(this).html();
                }

            }

            // logo动画
            $('.logo').hover(function () {
                $('.logo>ul').stop().animate({
                    'left': '0'
                }, 150)

            }, function () {
                $('.logo>ul').stop().animate({
                    'left': '-55px'
                }, 150)
            });

            $('.logo').click(function(){
                window.location.href = '../index.html'
            })

        }
    })

})
