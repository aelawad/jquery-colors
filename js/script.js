$(document).ready(function () {
	var winWidth = $(window).width() - 1;
	var winHeight = $(window).height() - 1;
	var factor = 0;
	var duration = 1500;	
	var scale = 100;
	
	/*var scale = Math.min((winWidth-100), (winHeight-100));
	console.log(scale); */
	
	var easingArray = [
		"linear",
		"swing",
		"easeInQuad",
		"easeOutQuad",
		"easeInOutQuad",
		"easeInCubic",
		"easeOutCubic",
		"easeInOutCubic",
		"easeInQuart",
		"easeOutQuart",
		"easeInOutQuart",
		"easeInSine",
		"easeOutSine",
		"easeInOutSine",
		"easeInExpo",
		"easeOutExpo",
		"easeInOutExpo",
		"easeInQuint",
		"easeOutQuint",
		"easeInOutQuint",
		"easeInCirc",
		"easeOutCirc",
		"easeInOutCirc",
		"easeInElastic",
		"easeOutElastic",
		"easeInOutElastic",
		"easeInBack",
		"easeOutBack",
		"easeInOutBack",
		"easeInBounce",
		"easeOutBounce",
		"easeInOutBounce"
	];

	$('.box').width(winWidth / 2);
	$('.box').height(winHeight / 2);

	/*$('.box').each(function (index) {
		$(this).css('background-color', $(this).data('color'));
	});*/

	$('.box').on('mouseenter', function () {
		animateEnter($(this));
	});

	function animateEnter(obj) {
		$('.box').stop();		
		var $obj = $(obj);
		
		if ($obj.width() <= scale && $obj.height() <= scale) {
			return;
		}
		
		var wDif = ($obj.width() - scale);
		var hDif = ($obj.height() - scale);
		var newWidth = 0;
		var newHeight = 0;				
		var sameRow = '.top';
		var otherRow = '.bottom';
		var sameColumn = '.left';
		var otherColumn = '.right';
		
		if ($obj.hasClass('bottom')) {
			sameRow = '.bottom';
			otherRow = '.top';
		}
		
		if ($obj.hasClass('right')) {
			sameColumn = '.right';
			otherColumn = '.left';
		}

		$obj.css("text-indent", 0);
		
		$obj.animate({
			textIndent: scale			
		}, {
			duration: duration,			
			easing: randomFrom(easingArray),
			step: function (currentStep, fx) {
				factor = (scale - currentStep) / scale;				
				newWidth = Math.round((factor * wDif) + scale);
				newHeight = Math.round((factor * hDif) + scale);
				
				/*var op = Math.max(0, (scale-currentStep));				
				$obj.css({opacity : op});				
				$(otherRow).css({opacity : scale - op});
				$(otherColumn).css({opacity : scale - op});
				console.log(fx.options.easing); */
				
				$(sameRow).height(newHeight);
				$(sameColumn).width(newWidth);

				$(otherRow).height(winHeight - newHeight);
				$(otherColumn).width(winWidth - newWidth);
			}
			/*, complete: function() {
				console.log('callback');
			} */
		});
	}
	
	function randomFrom (array) {
		return array[Math.floor(Math.random() * array.length)];
	}
});