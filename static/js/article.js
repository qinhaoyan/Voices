
$('#addcomment_input').focus(function(){
	$('#addcomment_comn').fadeOut(100);
	$('#addcomment_liken').fadeOut(100);
	$('#fasong').fadeIn(100);
	$(this).css('width','7.0rem');
	
})
.blur(function(e){
	$('#addcomment_comn').fadeIn(100);
	$('#addcomment_liken').fadeIn(100);
	$('#fasong').fadeOut(100);
	$(this).css('width','5.666667rem');
	console.log('dasda')
	$('#addcomment_input').attr('placeholder',"想说点什么？");
	$('#fasong').attr('data-user', '')
	.attr('data-userid', '')
	.attr('data-com', '');
})
.bind('input propertychange',function(){     //实时监听input

	if($(this).val().length>=1){
		console.log($(this).val().length)
		$('#fasong').css('background-color','#17bcbd').attr('data-fasong', '1');;
	}
	else {
		$('#fasong').css('background-color','#828282').attr('data-fasong', '0');
	}
})


$('.comment_word_span').on('touchstart',function(){
	$('#addcomment_input').blur();
	$('#addcomment_input').val('').attr('placeholder',"回复"+$(this).attr('data-user')+"：");
	console.log($(this).attr('data-sub'))
	if($(this).attr('data-sub') == '1'){
		$('#fasong').attr('data-userid', $(this).attr('data-userid'))
		.attr('data-user', $(this).attr('data-user'))
		.attr('data-com', $(this).attr('data-comid'));
	}
	else {
		$('#fasong').attr('data-user', $(this).attr('data-user'))
		.attr('data-userid', $(this).attr('data-userid'))
		.attr('data-com', $(this).attr('data-comid'));
	}
	setTimeout(function(){
		$('#addcomment_input').focus();
	}, 200)
})

$('#addcomment_liken').on('touchstart',function(e){
	liketime =e.timeStamp;
	liketimeflag = 1;
})
.on('touchend',function(e){
	if(e.timeStamp - liketime<200&&liketimeflag){
		var thislike = $(this);
		if(thislike.attr('data-like')=='0'){
			$.ajax({
				url: '/like',
				type: 'post',
				dataType: 'json',
				data: {
					type : '1',
					id : $(this).attr('data-articleid')
				},
				success:function(data){
					if(data.re == '1'){
						thislike.attr('data-like','1');
						var liken = parseInt(thislike.attr('data-liken'))+1;
						thislike.attr('data-liken',liken);
						thislike.children('.article_fun_like_wordn').text(liken);
						thislike.children('.article_fun_like_span').html('&#xe60e')
						.css({'transform':'scale(1.5)','color':'#fc5655'});
						setTimeout(function(){
							thislike.children('.article_fun_like_span').css('transform','scale(1)')
						}, 200)
					}
					if(data.re=='2'){
						window.location.href = '/alogin';
					}
				}
			})
		}
		else{
			$.ajax({
				url: '/like',
				type: 'post',
				dataType: 'json',
				data: {
					type : '0',
					id : $(this).attr('data-articleid')
				},
				success:function(data){
					if(data.re=='1'){
						thislike.attr('data-like','0');
						var liken = parseInt(thislike.attr('data-liken'))-1;
						thislike.attr('data-liken',liken);
						thislike.children('.article_fun_like_wordn').text(liken);
						thislike.children('.article_fun_like_span').html('&#xe631')
						.css({'transform':'scale(1.5)','color':'#949191'});
						setTimeout(function(){
							thislike.children('.article_fun_like_span').css('transform','scale(1)')
						}, 200)
					}
					if(data.re=='2'){
						window.location.href = '/alogin';
					}
				}
			})
		}
	}
})
.on('touchstart',function(e){
	liketimeflage = 0;
})

$('#article_user_fun').on('touchstart',function(){
	var page = $(this);
	if(page.attr('data-fun')=='1'){
		$.ajax({
			url: '/isyou',
			type: 'post',
			dataType: 'json',
			data: {
				id : page.attr('data-id')
			},
			success:function(data){
				if(data.re == '1'){
					if(window.confirm('确定已解决?')){
						$.ajax({
							url: '/soveld',
							type: 'post',
							dataType: 'json',
							data: {
								articleid : page.attr('data-articleid')
							},
							success:function(data){
								if(data.re == '1'){
									page.attr('data-type',2);
									page.children('div').eq(0).attr('class', 'article_user_fun_icon2')
									.css('transform','scale(1.2)');
									page.children('div').eq(1).attr('class', 'article_user_fun_word2').html('已解决');
									setTimeout(function(){
										page.children('div').eq(0).css('transform','scale(1)')
									}, 200)
								}
							}
						})
						
						

					}
				}
			}
		})
		
	}
})

$('#fasong').on('touchstart',function(){
	if($(this).attr('data-fasong') == '1'){
		var commentid = '';
		var user = $('#article_user_word_name').text();
		var userid = $('#article_user_word_name').attr('data-id'); 
		if($(this).attr('data-com')){
			commentid = $(this).attr('data-com');
			user = $(this).attr('data-user');
			userid = $(this).attr('data-userid');
		}
		$.ajax({
			url: '/comment',
			type: 'post',
			dataType: 'json',
			data: {
				cont : $('#addcomment_input').val(),
				articleid : $(this).attr('data-articleid'),
				commentid : commentid,
				user : user ,
				userid : userid
			},
			success:function(data){
				if(data.re == '1'){
					window.location.reload()
				}
			}
		})
	}
})