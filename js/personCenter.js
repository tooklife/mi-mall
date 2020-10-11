function changeLink(link) {
    $('iframe').attr('src', link);
}

$(function () {

    let username = JSON.parse(window.sessionStorage.getItem('username'));
    let nickname = JSON.parse(window.sessionStorage.getItem('nickname'));

    //顶部图标效果----------------------------------------------------
    $('.logo').hover(function () {
        $('.logo>ul').stop().animate({
            'left': '0'
        }, 150)

    }, function () {
        $('.logo>ul').stop().animate({
            'left': '-55px'
        }, 150)
    });

    //左侧导航栏效果----------------------------------------------------
    $('dd span').click(function () {
        $('dl dd span').css('color', '#666');

        $(this).css('color', '#f60');

        // $(this).parents('dd').siblings().children('span').hover(function () {
        //     $(this).css('color', '#000');

        // }, function () {
        //     $(this).css('color', '#666');

        // });
    })

    $('.logo').click(function(){
        window.location.href = '../index.html'
    })

    console.log(username)
    if (username == null) {
        $('.loginmsg').empty();
        $('.loginmsg').append(`
            <div class="shortcar">
					<i class="iconfont icon-gouwuche2"></i>
					<b>购物车</b>
					<span>(0)</span>
					<div class="shortlist">
						<p>购物车中还没有商品，赶紧选购吧</p>
						<ul></ul>
					</div>
				</div>
				<ul class="right">
					<li><a href="./html/login.html">登录</a></li>
					<li><a href="./html/register.html">注册</a></li>
					<li><a href="#">消息通知</a></li>
				</ul>

			</div>
        `)
    } else {
        $('.loginmsg').empty();
        $('.loginmsg').append(`
            <div class="shortcar">
					<i class="iconfont icon-gouwuche2"></i>
                <b>购物车</b>
                <span>(0)</span>
                <div class="shortlist">
                    <ul></ul>
                </div>
            </div>
            <ul class="right">
                <li class="userid">
                    ${nickname}<i class="iconfont icon-xjiantou"></i>
                    <ol>
                        <li><a href="./html/personCenter.html">个人中心</a><li>
                        <li><a href="#">评价晒单</a><li>
                        <li><a href="./html/personCenter.html">我的喜欢</a><li>
                        <li><a href="#">小米账号</a><li>
                        <li><a href="#" onclick="drpOut()">退出登录</a><li>
                    </ol>
                </li>
                <li><a href="./html/register.html">消息通知</a></li>
                <li><a href="#">我的订单</a></li>
            </ul>
        `)

        let num = 0;

        $.ajax({
            type: "get",
            url: "http://localhost:10086/user/getShoppingCard",
            data: {
                name: username,
            },
            dataType: "json",
            success: function (res) {
                $('.shortlist p').remove();
                for (let i in res) {
                    console.log(res[i]);
                    $('.shortlist ul').append(`
                        <li onclick="window.location.href='./html/shopCart.html'">
                            <img src="${res[i].picture1}" alt="">
                            <div>
                                ${res[i].productName}
                                <p>${res[i].color}</p>
                            </div>
                            <span>${res[i].currentPrice} x ${res[i].quantity}</span>
                        </li>
                    `)
                    num = parseInt(i) + 1;

                }
                $('.shortcar>span').html('(' + num + ')');
            }
        });

    }

    // 右侧个人信息展示动画----------------------------------------------
    $('.userid').hover(function () {
        $(this).css({
            'background-color': '#fff',
            'color': '#f60'
        });
        $(this).children('ol').slideDown(300);
        $(this).children('ol').css('color', '#424242');

    }, function () {
        $(this).css({
            'background-color': '#333',
            'color': '#b0b0b0'
        });
        $(this).children('ol').slideUp(300);
    });

    $('.userid ol li').hover(function () {
        $(this).css({
            'background-color': '#ccc',
            'color': '#f60'
        })

    }, function () {
        $(this).css({
            'background-color': '#fff',
            'color': '#424242'
        })
    });


    // 右侧购物车动画------------------------------------------------
    $('.shortcar').hover(function () {
        $('.shortlist').css('display', 'block');
        $('.shortcar>i').css('color', '#f60');
        $('.shortcar>b').css('color', '#f60');
        $('.shortcar>span').css('color', '#f60');
    }, function () {
        $('.shortlist').css('display', 'none');
        $('.shortcar>i').css('color', '#b0b0b0');
        $('.shortcar>b').css('color', '#b0b0b0');
        $('.shortcar>span').css('color', '#b0b0b0');
    });


})
