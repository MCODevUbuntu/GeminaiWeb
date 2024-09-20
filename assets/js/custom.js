$(document).ready(function () {
	/*********** Nav menu ***************/
	$('.bar-icon').click(function () {
		$('.header-menubar').toggleClass('offcanvas-menu');
		$('.bar-icon').toggleClass('toggle');
		return false;
	});
	$('.header-menubar ul li a').click(function () {
		$('.header-menubar').toggleClass('offcanvas-menu');
		$('.bar-icon').toggleClass('toggle');
	});
	$('a[href*=#]').bind('click', function(e) {
		e.preventDefault();
		var target = $(this).attr("href");
		$('html, body').stop().animate({
				scrollTop: $(target).offset().top
		}, 600, function() {
				location.hash = target;
		});
			return false;
	});


});