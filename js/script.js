$(document).ready(function() {
	$('#my-portfolio').on('click', 'li', function(e) {
		replacePortfolioContent(e);
		$('#portfolioModal').modal('show');
	});

	function replacePortfolioContent(e) {
		var item = $(e.target).closest('li').get(0);

		//replace title, description and image with data-attribtes from li clicked
		$('[data-modal=title]').html($(item).data('title'));
		$('[data-modal=description]').html($(item).data('description'));
		$('[data-modal=img]').attr('src', $(item).data('img'));

		// replace the demo and source, if applicaable
		var demo = $(item).data('demo');
		var source = $(item).data('source');
		
		if (demo) {
			$('[data-modal=demo]').attr('href', $(item).data('demo'));
			$('[data-modal=demo]').text($(item).data('demo'));
			$('[data-modal=demo-display]').show();
		} else {
			$('[data-modal=demo-display]').hide();
		}

		if (source) {
			$('[data-modal=source]').attr('href', $(item).data('source'));
			$('[data-modal=source]').text($(item).data('source'));
			$('[data-modal=source-display]').show();
		} else {
			$('[data-modal=source-display]').hide();
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