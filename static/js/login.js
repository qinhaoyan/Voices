$('#login').on('touchstart', function(e) {
	console.log('dasdasd')
	$.ajax({
		url: '/login',
		type: 'post',
		dataType: 'json',
		data: {
			stu_id:$('#stu_id').val(),
			password:$('#password').val()
		},
		success:function(data){
			if(data.result == '1'){
				window.history.go(-1);
			}
			else {
				alert('用户或密码错误')
			}
		}
	})	
});
$('#register').on('touchstart',function(){
	$('#loginmain').fadeOut('100');
	$('#registermain').fadeIn('100');
})
$('#rregister').on('touchstart',function(){
	if($('#rstu_id').val()&&$('#rname').val()&&$('#rhname').val()&&$('#rpassword').val()){
		$.ajax({
			url: '/register',
			type: 'post',
			dataType: 'json',
			data: {
				stu_id:$('#rstu_id').val(),
				name:$('#rname').val(),
				hname:$('#rhname').val(),
				password:$('#rpassword').val()
			},
			success:function(data){
				if(data.result == '1'){
					window.history.go(-1);
				}
				else {
					alert('用户或密码错误')
				}
			}
		})
	}
	else {
		alert('请填写完整');
	}
		
})

$('#fanhui').on('touchstart',function(){
	$('#loginmain').fadeIn('100');
	$('#registermain').fadeOut('100');
})