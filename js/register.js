function commit(that) {

	let username = $(that).siblings('div').eq(0).children('input').val();
	let nickname = $(that).siblings('div').eq(1).children('input').val();
    let password = $(that).siblings('div').eq(2).children('input').val();
    console.log(username, nickname, password);
	$.ajax({
		url: 'http://mimall.natapp1.cc/user/register',
		type: 'post',
		dataType: 'json',
		data: {
			userName: username,
			nickName: nickname,
			passWord: password
		},
		success: (data) => {
			console.log(data);
			if (data == 0) {
				alert('注册失败');
			} else if (data == 2) {
				alert('账号已存在');
			} else {
				alert('注册成功');
				window.sessionStorage.setItem('username', JSON.stringify(username));
				
				window.location.href = `../html/login.html?username`;
			}
		}
	})
}

$(function(){
    let loginname = '';
    let nickname = '';
    let loginpass = '';

    $('#username').blur(function () {
        loginname = $(this).val();
        console.log(loginname);
    })
    $('#nickname').blur(function () {
        nickname = $(this).val();
        console.log(nickname);
    })
    $('#password').blur(function () {
        loginpass = $(this).val();
        console.log(loginpass);
    })


    document.onkeydown = function (event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        
        if (e && e.keyCode == 13) {
            console.log('1');
            $.ajax({
                url: 'http://mimall.natapp1.cc/user/register',
                type: 'post',
                dataType: 'json',
                data: {
                    userName: loginname,
                    nickName: nickname,
                    passWord: loginpass
                },
                success: (data) => {
                    console.log(data);
                    if (data == 0) {
                        alert('注册失败');
                    } else if (data == 2) {
                        alert('账号已存在');
                    } else {
                        alert('注册成功');
                        window.sessionStorage.setItem('username', JSON.stringify(loginname));

                        window.location.href = `../html/login.html?username`;
                    }
                }
            })
        }
    };
})