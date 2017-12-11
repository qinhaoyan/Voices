
var main = $('#main');
main.height($(window).height());
function createarticle(argument) {
	var imgi = 0;
	$.each(argument,function(i,cont){

		var a = $("<a href='/article/"+cont.url+"'></a>");
		var article = $("<div class='article'><div class='user_head'><img src='/static/img/head"+cont.user_head+".jpg'></div></div>");
		var article_cont = $("<div class='cont'><div class='cont_word'><div class='user'><span class='user_name'>"+cont.user_name+"</span><span>"+cont.type+"</span></div><div class='time'>"+cont.time+"</div><p class='cont_words'>"+cont.word+"</p></div></div>")
		if(cont.img){
			var img = $("<div class='img'><img src='/static/img/"+cont.img+".jpg'/></div>");
			article_cont.append(img);
		}
		else {
			var can = document.createElement('canvas');
			can.setAttribute('class', 'cont_img');
			canvas = can.getContext('2d');
			canvas.canvas.height=100;
			canvas.canvas.width=100;             //坑   canvas会自带宽高   需要自己设置否则内容比例会有问题
			var article_word = cont.article.split('');
			var article_line = [],j=0;
			article_line[0]='';
			for(var i=0,k=0;i<article_word.length;i++){
				article_line[j]+=article_word[i];
				if(k>6) {j++;k=0;article_line[j]='';}
				k++;

			}
			for(var i = 0;i<article_line.length;i++){
				if(i>4) break;
				canvas.fillText(article_line[i],5,17*i+19);
			}
			canvas.font="10px Georgia";
			article_cont.append(can);
		}
		article.append(article_cont);
		a.append(article);
		main.append(a);
	});
}

$.ajax({
	url: '/getmessage',
	type: 'get',
	dataType: 'json',
	success:function(data){
		console.log(data);
		createarticle(data);
	}
})


