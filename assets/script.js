$(document).ready(function() {

	// cache page elements
	var $title = $($('[data-modal=title]')),
		$description = $($('[data-modal=description]')),
		$demo = $($('[data-modal=demo]')),
		$source = $($('[data-modal=source]')),
		$modal = $('#portfolioModal'),
		$image = $($('[data-modal=img]'));

	// respond to portfolio click
	$('.portfolio').on('click', 'li', function(e) {
		replacePortfolioContent(e);
		$modal.modal('show');
	});

	// replace modal content depending on the portfolio item clicked
	function replacePortfolioContent(e) {
		var $item = $($(e.target).closest('li').get(0));
		var demoText = $item.data('demo');
		var sourceText = $item.data('source');

		//replace title, description and image with data-attribtes from li clicked
		$title.html($item.data('title'));
		$description.html($item.data('description'));
		$image.attr('src', $item.data('img'));

		// replace the demo and source, if applicable
		if (demoText) {
			$demo.attr('href', demoText);
			$demo.text(demoText);
		}

		if (sourceText) {
			$source.attr('href', sourceText);
			$source.text(sourceText);
		}
	}

	// smooth scroll between internal anchors
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
});
});