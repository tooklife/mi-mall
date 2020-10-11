// 请求登录接口
function commit(that) {
	let username = $(that).parents().siblings('p').eq(1).children().val();
	let password = $(that).parents().siblings('p').eq(2).children().val();

    console.log(typeof(username));
    if (username != '' && password != ''){
        $.ajax({
        	url: 'http://localhost:10086/user/login',
        	type: 'get',
        	dataType: 'json',
        	data: {
        		userName: username,
        		passWord: password
        	},
        	success: data => {

        		// 将用户名存入本地存储
                console.log('返回的结果:' + data);
                // console.log(typeof (data));
        		if (data == 0) {
        			alert('用户名或密码错误');
        		}else{
        			window.sessionStorage.setItem('nickname', JSON.stringify(data.nickName));
        			window.sessionStorage.setItem('username', JSON.stringify(username));
        			window.location.href = `../index.html`;
        		}
        	}
        })
    }else{
        alert('请输入正确的用户名和密码')
    }
	
}


$(function () {

	// 获取用户注册时的默认账号
    let userName;
    let loginname;
    let loginpass;
	window.sessionStorage.getItem('username') == null ? userName = '' : userName = JSON.parse(window.localStorage.getItem('username'));
    
    
	
	// 账号登录与扫码登录的切换动画
	$('.title span').click(function () {
		$(this).addClass('check').siblings().removeClass('check');
		$('.login_msg>div').eq($('.title span.check').index()).css('display', 'block').siblings('div').css('display', 'none');
    });

    // 获取用户名和密码
    $('#username').blur(function () {
        loginname = $(this).val();
        console.log(loginname);
    })
    $('#password').blur(function () {
        loginpass = $(this).val();
        console.log(loginpass);
    })
    

    // 按enter键触发
    document.onkeydown = function (event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            if (username != '' && password != '') {
                $.ajax({
                    url: 'http://localhost:10086/user/login',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        userName: loginname,
                        passWord: loginpass
                    },
                    success: data => {

                        // 将用户名存入本地存储
                        console.log('返回的结果:' + data);
                        // console.log(typeof (data));
                        if (data == 0) {
                            alert('用户名或密码错误');
                        } else {
                            window.sessionStorage.setItem('nickname', JSON.stringify(data.nickName));
                            window.sessionStorage.setItem('username', JSON.stringify(loginname));
                            window.location.href = `../index.html`;
                        }
                    }
                })
            } else {
                alert('请输入正确的用户名和密码')
            }
        }
    };

	$('input[type="text"]').prop('value', userName);

})