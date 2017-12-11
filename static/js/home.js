//翻页动画
var page = $('#page');
$("#hot").on('touchstart',function(){
	$("#nav").removeClass('nav2 nav3');
	$(this).addClass('active');
	$(this).siblings('div').removeClass('active');
	page.css('transform','translate(0,0)');
	$('#page1').css('height','auto').siblings().height(1);
});
$("#nosolve").on('touchstart',function(){
	getData(2);
	$("#nav").removeClass('nav3').addClass('nav2');
	$(this).addClass('active');
	$(this).siblings('div').removeClass('active');
	page.css('transform','translate(-10.0rem,0)');
	$('#page2').css('height','auto').siblings().height(1);
});
$("#solved").on('touchstart',function(){
	getData(3);
	$("#nav").removeClass('nav2').addClass('nav3');
	$(this).addClass('active');
	$(this).siblings('div').removeClass('active');
	if($('#page2').html()){
		page.css('transform','translate(-20.0rem,0)');
		$('#page3').css('height','auto').siblings().height(1);
	}
	else{
		page.css('transform','translate(-10.0rem,0)');
		$('#page3').css('height','auto').siblings().height(1);
	}
});
$('#pageout').on('touchstart',function(e){
	startX = e.originalEvent.changedTouches[0].pageX,
    startY = e.originalEvent.changedTouches[0].pageY;
    $('#text2').html(startX);
})
.on('touchend', function(e) {
	endX = e.originalEvent.changedTouches[0].pageX,
    endY = e.originalEvent.changedTouches[0].pageY;
    distanceX = endX-startX;
    distanceY = endY-startY;
    //判断滑动方向
    if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
        if(page.css('transform')!='none'){
        	var pagemove = parseInt(page.css('transform').substring(19,23))
        	if(pagemove==-parseInt($('#pageout').width())){
        		page.css('transform',"translate("+'0rem'+",0)");
        		$("#nav").removeClass('nav2').addClass('nav1');
        		$('#hot').addClass('active');
        		$('#hot').siblings('div').removeClass('active');
        		$('#page1').css('height','auto').siblings().height(1);
        	}
        	if(pagemove==2*-parseInt($('#pageout').width())){
        		getData(2);
        		page.css('transform',"translate("+'-10rem'+",0)");
        		$("#nav").removeClass('nav3').addClass('nav2');
        		$('#nosolve').addClass('active');
        		$('#nosolve').siblings('div').removeClass('active');
        		$('#page2').css('height','auto').siblings().height(1);
        	}
        }
    }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
        if(page.css('transform')!='none'){
        	var pagemove = parseInt(page.css('transform').substring(19,23))
        	if(pagemove==0){
        		getData(2);
        		page.css('transform',"translate("+'-10rem'+",0)");
        		$("#nav").removeClass('nav1').addClass('nav2');
        		$('#nosolve').addClass('active');
        		$('#nosolve').siblings('div').removeClass('active');
        		$('#page2').css('height','auto').siblings().height(1);
        	}
        	if(pagemove==-parseInt($('#pageout').width())){
        		getData(3);
        		page.css('transform',"translate("+'-20rem'+",0)");
        		$("#nav").removeClass('nav2').addClass('nav3');
        		$('#solved').addClass('active');
        		$('#solved').siblings('div').removeClass('active');
        		$('#page3').css('height','auto').siblings().height(1);
        	}
        }
        else {
        	getData(2);
        	page.css('transform',"translate("+'-10rem'+",0)");
        	$("#nav").removeClass('nav1').addClass('nav2');
        	$('#nosolve').addClass('active');
        	$('#nosolve').siblings('div').removeClass('active');
        	$('#page2').css('height','auto').siblings().height(1);
        }
    }/*else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY<0){
        console.log('往上滑动');
    }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY>0){
        console.log('往下滑动');
    }else{
        console.log('点击未滑动');
    }*/
});

$(function(){
	$("#nav").addClass('nav1');
	getData(1);
})

//加载数据
function getData(type){
	var addpage;
	if($("#page"+type+"").length!=0){
		return;
	}
	else {
		addpage = $("<div class='page"+type+"' id='page"+type+"'></div>");
		if($("#page3").length==1){
			console.log(addpage);
			$("#page1").after(addpage);
		}
		else{
			page.append(addpage);
		}
		$.ajax({
			url: '/gethome',
			type: 'get',
			dataType: 'json',
			data:{
				type:type
			},
			success:function(data) {
				console.log(data)
				createPage(type,data.result,addpage);
			}
		})
	}

	
}

function createPage(type,data,addpage){
	$.each(data,function(i,cont){
		var type = '1';
		if(cont.type=='已解决'){
			type = '2'
		}
		var likeo = '&#xe631';
		var like_d = '0';
		if(cont.likeo == '1'){
			likeo = '&#xe60e';
			like_d = '1'
		}

		var article = $("<div class='article'><div class='article_user'><div class='article_user_head'><img src='/static/"+cont.userhead+"></div><div class='article_user_word'><div class='article_user_word_name'>"+cont.username+"</div><div class='article_user_word_time'>"+cont.time+"</div></div><div class='article_user_fun'><div class='article_user_fun_icon"+type+"'></div><div class='article_user_fun_word"+type+"'>"+cont.type+"</div></div></div><a href='/article/"+cont.url+"'><p class='article_p'>"+cont.article+"</p></a><div class='article_fun'><div class='article_fun_comment'>评论</div><div class='article_fun_like' data-like="+like_d+" data-liken="+cont.liken+" data-articleid = "+cont.url+"><span class='article_fun_like_span'>"+likeo+"</span><span class='article_fun_like_word'>赞</span>（<span class='article_fun_like_wordn'>"+cont.liken+"</span>）</div></div></div>");
		var comments = $("<div class='article_comment'></div>");
		var j=0,k=0;
		if(cont.img.length>0){
			var img_div = $("<div class='article_img'></div>");
			$.each(cont.img,function(x,img){
				if((x+1)%3==0){
					var imgs = $("<div class='article_img_noma article_img_div' data-img='' data-n="+(x+1)+"><img src='/media/"+img+"'></div>");
				}
				else {
					var imgs = $("<div class='article_img_div' data-img='' data-n="+(x+1)+"><img src='/media/"+img+"'></div>");
				}
				img_div.append(imgs);
			});
			article.append(img_div);
		}
		if(cont.comment.length>0){
			$.each(cont.comment,function(j,com){
				var comments_content = $("<div class='article_comment_content'><div class='article_comment_user'>"+com.comuser+": </div><a href='/article/"+cont.url+"'><div class='article_comment_main'>"+com.cont+"</div></a></div>");
				$.each(com.subcomment,function(k,subcom){
					var comments_subcontent = $("<div class='article_comment_content'><div class='article_comment_user'>"+subcom.subcomuser+"<span style='color:#000000'> 回复 </span>"+com.comuser+": </div><a href=''><div class='article_comment_main'>"+subcom.cont+"</div></a></div>");
					comments_content.append(comments_subcontent);
				})
				comments.append(comments_content);
			});
			if(k+j>15){
				var showmore = $("<div class='article_comment_content'><a href='/article/"+cont.url+"'><div class='article_comment_content_all'>展开</div></a></div>");
				comments.append(showmore);
			}
			var jiantou = $("<div class='article_jiaotou'></div>");
			article.append(jiantou)
				   .append(comments);
		}
		addpage.append(article);
	});
}

//点赞
$(document).on('touchstart','#page .article_fun_like',function(e){
	liketime =e.timeStamp;
	liketimeflag = 1;
})
.on('touchend','#page .article_fun_like',function(e){
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
						.css('transform','scale(1.5)');
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
						.css('transform','scale(1.5)');
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
.on('touchstart','#page .article_fun_like',function(e){
	liketimeflage = 0;
})



//查看图片
$(document).on('touchstart','#page .article_img_div',function(e){
	imgshowtime = e.timeStamp;	
	imgshowtimeflag = 1;
})
.on('touchend','#page .article_img_div',function(e){
	img_divthis = $(this);
	if(e.timeStamp - imgshowtime<200&&imgshowtimeflag){
		/*$('#showimg').fadeIn(200).height($(window).height());
		gethightimg(img,parseInt(img_divthis.attr('data-n')))*/
		//console.log(wx.previewImage());

		wx.previewImage({
		      current: 'http://mmbiz.qpic.cn/mmbiz_jpg/yNkhGMRtHFYsiaG0pt0udvvYnZu23dKHCpFG6AcB4vjUiaQVQicHib8ff2XK03oXtlecLBH9y5vbOiaACCZszwXK1yA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
		      urls: [
		        'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
		        'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
		        'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
		      ]
		    });
	}
})
.on('touchmove','#page .article_img_div',function(e){
	imgshowtimeflag = 0;
})

//获取高清照片
imgflag = 0;
function gethightimg(img,n){
	pushHistory(); 
	imgflag = 1;
	$.each(img,function(i,cont){
		var left = (i+1-n)*$(window).width()+'px';
		var top = ($(window).height()-cont.height/cont.width*$(window).width())/2+'px';
		var imgs = $("<img src="+cont.src+" class='showimg_img' style = 'left:"+left+";top:"+top+"'/>");
		$('#showimg').append(imgs);
	})
}

//关闭图片页
$('#showimg').on('touchstart', function(e) {
	imgstartime = e.timeStamp;
	imgstartimeflag = 1;
	imgstartfigers = e.originalEvent.touches.length;
})
.on('touchend',function(e){
	if(e.timeStamp - imgstartime<200&&imgstartimeflag){
		setTimeout(function(){
			if(imgstartfigers==1){
				$('#showimg').fadeOut(200).html('');
				imgflag = 0;
			}
		}, 100)
	}

})
.on('touchmove',function(e){
	imgstartimeflag = 0;
})

//监听返回键

pushHistory();

window.addEventListener("popstate", function(e) { 
	if(imgflag){
		pushHistory(); 
		$('#showimg').fadeOut(200).html('');
		imgflag = 0;
	}
	else {
		if(window.confirm('确定退出？')){    
			wx.closeWindow();     
		    
		}else{
		    pushState();
		}
	}
}, false); 
function pushHistory() { 
	var state = { 
		title: "title", 
		url: "" 
	}; 
	window.history.pushState(state, "", ""); 
}

//图片操作







