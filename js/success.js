$(function () {
    let productName = window.sessionStorage.getItem('productName');
    let productVersion = window.sessionStorage.getItem('productVersion');
    let color = window.sessionStorage.getItem('color');

    $('.hint').append(`
        <span>${productName} ${productVersion} ${color}</span>
    `);

    $('button').click(function (e) { 
        window.history.back();
        
    });

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
})