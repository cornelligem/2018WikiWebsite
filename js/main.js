$(document).ready(function(){
	// Add smooth scrolling to home description when you click on down chevron arrow
	$("#chevron-button").on('click', function(event) {
		if (this.hash !== "") {
		  event.preventDefault();

		  var hash = this.hash;

		  $('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 800, function(){
		    window.location.hash = hash;
		  });
		}
	});

	// $("#button1").on('click', function(event) {
	// 	$("#div1").removeClass("hide-div");
	// 	$("#div1").addClass("show-div");
	// 	$("#div2").addClass("hide-div");
	// });

	// $("#button1").click(function() {
 //    	$("#div1").toggle();
	// });
	// $("#button2").click(function() {
	// 	$("#div2").toggle(); 
	// });
	$('#showAll').click(function() {
	  $('.practices-text-wrapper').show();
	});
	$('.button-single').click(function() {
	  $('.practices-text-wrapper').hide();
	  $('#div' + $(this).attr('id')).show();
	});
});