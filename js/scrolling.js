// $(document).ready(function() {
	// var radius = 500; // adjust to move out items in and out 
	// var fields = $('.modeling-description'),
	//   container = $('.modeling-content-wrapper'),
	//   width = container.width(),
	//   height = container.height();
	// var angle = 0,
	//   step = (2 * Math.PI) / fields.length;
	// fields.each(function() {
	//   var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
	//   var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
	//   if (window.console) {
	//     console.log($(this).text(), x, y);
	//   }
	//   $(this).css({
	//     left: x + 'px',
	//     top: y + 'px'
	//   });
	//   angle += step;
	// });

	$(window).scroll(function() {
		console.log("here");
		checkY();
	});

	function checkY() {
		// var radius = 50;
		// var offset = $("nav").height() + $('no-pic-banner').height(); // nav + banner
		// var scrollLen = radius;

		// console.log($(window).scrollTop());

		// if (($(window).scrollTop() > offset) && ($(window).scrollTop() <= scrollLen + offset)) {
		// 	console.log("show");
		// 	$('.modeling-description').show();
		// } else {
		// 	console.log("hide");
		// 	$('.modeling-description').hide();
		// }

		// while(true) {
		// 	console.log($(window).scrollTop());
		// }
	}

	checkY();
// });