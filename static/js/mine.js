$('#loginout').on('touchstart',function() {
	$.ajax({
		url: '/loginout',
		type: 'POST',
		dataType: 'json',
		success:function(data){
			if(data.re == '1'){
				window.location.href='/'
			}
			
		}
	})
	
})

$('#headbg').height($(window).height())

$('#user_head').on('touchstart',function(){
	$('#headbg').fadeIn(500);
})

$('#quxiaoshangchuan').on('touchstart',function(){
	$('#headbg').fadeOut(500);
})

$('#addimginput').change(function(){
	function reads(fil){
		var reader = new FileReader();
		reader.readAsDataURL(fil);
		reader.onload = function()
		{	
			var headimg = $('#changeheadimg');
			var headliang = $('#headliang');
			headimg.attr('src',reader.result);
			var can = document.getElementById('imgcanvas').getContext('2d');
			var img = new Image();
			can.canvas.height= 250;
			can.canvas.width = 250;
			img.src = reader.result;
			img.onload = function(){
				if(headimg.height()<headliang.height()){
					headimg.css({'height':'6.666667rem',
								 'width':'auto'})
					headimg.css({'left':-(headimg.width() - $('#headbg').width())/2,
								 'top':'2.666667rem'});
				}
				else {
					headimg.css({'top':parseInt(headliang.css('top'))-(headimg.height()-headliang.height())/2});
				}
				canx = -(headimg.width()-headliang.width())/2;
				cany = -(headimg.height()-headliang.height())/2
				can.drawImage(img,canx,cany,headimg.width(),headimg.height());
				var hammertime = new Hammer(document.getElementById("headbg"));
				hammertime.get('pinch').set({ enable: true });
				hammertime.on("pinchmove pinchstart pinchin pinchout", function (e) {
					alert(e.scale)
					$('#int').html(e.scale)
					if(e.type == "pinchstart"){
					    caleIndex = transform.scale || 1;
					}
					transform.scale = scaleIndex * e.scale;
					headimg.css('transform',"scale(" + (scaleIndex * e.scale)+ ")");
				});
			}
		};
	}
	reads(this.files[0]);
});
