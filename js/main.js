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
});

