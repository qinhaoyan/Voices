window_heihgt = $(window).height()
$("#main").height(window_heihgt);
$('#publish').on('touchstart',function(){
	if($('#ta_publish').val().length == 0){
		alert('还是说点什么吧');
	}
	else {
		var formdata = new FormData();
		for(var i=0;i<burls.length;i++){
			formdata.append('img',burls[i]);      //坑   formdata直接打印是取不到值的
		}
		formdata.append('article',$('#ta_publish').val());
		formdata.append('noname',$('#noname_icon').attr('data-no'));
		$.ajax({
			url: '/publish_article',
			type: 'post',
			dataType: 'json',
			data: formdata,
			processData : false, 
			contentType : false,
			success:function(data){
				if(data.re == '1'){
					window.location.href='/';
				}
				
			}
		})
	}
	
	
})



//监听图片上传
var urls = [];
var burls = [];
var delimgheight = $('#deletimg').height();
$('#inputimg').change(function(){
	if(urls.length==9){
		alert('只能上传9张图片');
		$('#img_bg').fadeOut(100);
		return;
	}
	if(urls.length==8){
		$('#img_bg').fadeOut(100);
	}
	function getObjectURL(file) {
	    var url = null;
	    if (window.createObjectURL != undefined) { // basic
	        url = window.createObjectURL(file);
	    } else if (window.URL != undefined) { // mozilla(firefox)
	        url = window.URL.createObjectURL(file);
	    } else if (window.webkitURL != undefined) { // webkit or chrome
	        url = window.webkitURL.createObjectURL(file);
	    }
	    return url;
	}
	function reads(fil){
		var reader = new FileReader();
		reader.readAsDataURL(fil);
		reader.onload = function()
		{	
			burls.push(reader.result);
		};
	}
	reads(this.files[0]);
	var objUrl = getObjectURL(this.files[0]);
	var name = /(\\.*\\)(.*)(\.)(.*)$/.exec($(this).val());
	if(urls.indexOf(name[2]+'.'+name[4],urls)>=0){
		alert('这张图片已经添加啦！');
	}
	else {
		urls.push(name[2]+'.'+name[4]);
		var img = $("<img src="+objUrl+">");
		img.load(function(){             //坑   图片加载  异步影响  
			if(img[0].height>img[0].width){
				var html = $("<div class='newimg mimg' data-n = "+(urls.length-1)+"><img src="+objUrl+" class='himg addimg'></div>");
			}
			else {
				var html = $("<div class='newimg mimg' data-n = "+(urls.length-1)+"><img src="+objUrl+" class='wimg addimg'></div>");
			}
			$('#img_bg').before(html);
			new Hammer( $('#img').children('div').eq(urls.length-1)[0], {
			      domEvents: true
			});
			imgmoveflag = 0;
			$('#img').children('div').eq(urls.length-1).on('press',function(e){
				console.log('adasd');
				e.preventDefault();
				imgmoveflag = 1;
				$(this).css({'transform':'scale(1.1)','z-index':'10'});
				$("#deletimg").show(100);
			})
			.on('pressup',function(e){
				e.preventDefault();
				$(this).css('transform','scale(1)');
				imgmoveflag = 0;
			})                              //坑   用touchstart 的e.preventDefault()来阻止默认行为
			.on('pan',function(e){
				e.preventDefault();
				try {
					if(imgmoveflag){
						$(this).css('transform',"translate("+e.originalEvent.gesture.deltaX+"px,"+e.originalEvent.gesture.deltaY+"px)");
						tran = /^matrix\((.*),(.*),(.*),(.*),(.*),(.*)\)$/.exec($(this).css('transform'));
						if(tran[6]+this.offsetTop>window_heihgt-delimgheight){
							$('#deletimg').height(delimgheight*1.5)
						}
					}
				} catch(e) {
				}
			})
			.on('touchend',function(e){
				e.preventDefault();
				n = parseInt($(this).attr('data-n'));
				tran = /^matrix\((.*),(.*),(.*),(.*),(.*),(.*)\)$/.exec($(this).css('transform'))
				try {
					var move = Math.floor(parseInt(tran[5])/$(this).width())+1;
					if(n>3&&tran[6]<0){
						move-=4;
						if(n>5){
							move-=4;
						}
					}
					if(n<3&&tran[6]>0&&tran[6]+this.offsetTop<window_heihgt-$('#deletimg').height()){
						move+=4;
					}
					//alert(tran[6]+","+this.offsetTop+","+$(window).height()+","+$('#deletimg').height())
					if(tran[6]+this.offsetTop>window_heihgt-delimgheight*1.5-20){
						$(this).remove();
						urls.splice(n, 1);
						burls.splice(n,1);
						for(var i=0;i<$('.mimg').length-1;i++){
							$('.mimg').eq(i).attr('data-n', i);
						}
					}
					if(move!=0){
						$('.mimg').eq(move+n).before($(this));
						urls.splice(move+n, 0, urls[n]);
						urls.splice(n,1);
						burls.splice(move+n, 0, urls[n]);
						burls.splice(n,1);
						for(var i=0;i<$('.mimg').length-1;i++){
							$('.mimg').eq(i).attr('data-n', i);
						}
					}
				} catch(e) {}
				$(this).css({'transform':'scale(1)','z-index':'0'});
				$('#deletimg').hide(100);
			})
			.on('touchstart',function(e){
				e.preventDefault();
			})
		})
	}
});

$('#noname').on('touchstart',function(){
	if($('#noname_icon').attr('data-no') == '0'){
		$('#noname_icon').css('background','#17bcbd');
		$('#noname_icon').attr('data-no','1');
	}
	else {
		$('#noname_icon').css('background','none');
		$('#noname_icon').attr('data-no','0')
	}
})









