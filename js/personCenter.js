function changeLink(link) {
    $('iframe').attr('src', link);
}

$(function () {




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




})
