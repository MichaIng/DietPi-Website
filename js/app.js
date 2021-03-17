'use strict';
// https://github.com/MichaIng/DietPi-Website
$(function () {
	// Hide triangles to match animation start
	$('svg.triangle').css('opacity', '0');

	// Hide portfolio descriptions
	$('div.toggleDiv').hide();

	// Show portfolio filter buttons and tiles
	document.getElementById('downloadinfo').removeAttribute('style');
	document.getElementById('portfolio-grid').removeAttribute('style');

	// Initialise home slider: https://github.com/Le-Stagiaire/jquery.cslider
	// Check first if function exist to allow skipping it on dietpi-software site
	if (typeof $.fn.cslider === 'function') {
		$('#home').cslider({
			bgincrement: 100,
			autoplay: true,
			interval: 6000
		});
	}

	// Map navigation bar scroll links and targets
	var lastId,
	    $navbar = $('div.navbar-collapse'),
	    navbarHeight = 60, //$navbar.outerHeight() leads to wrong scroll offset when menu is expanded
	    // Navigation bar links
	    $navbarLinks = $navbar.find('a[href^="#"]'),
	    // Navigation bar targets
	    $navbarTargets = $navbarLinks.map(function () {
		return $(this.hash);
	    });

	// Bind to scroll
	$(window).on('scroll', function () {
		// Get current scroll offset
		var scrollTop = $(this).scrollTop();

		// Mark navbar link, related to scroll position, as active
		// - Get targets until current scroll position
		var cur = $navbarTargets.map(function () {
			if ($(this).offset().top < scrollTop + navbarHeight + 50)
				return this;
		});
		// - Get id of the current target
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';
		// - If id changed, change links active class accordingly
		if (lastId !== id) {
			lastId = id;
			$navbarLinks.removeClass('active');
			$navbarLinks.filter('[href="#' + id + '"]').addClass('active');
		}

		// Animate triangles once, when they come in view
		$('svg.triangle').each(function () {
			// Element has not been animated yet and is in view
			if (!$(this).hasClass('fadeInDown') && (scrollTop + $(window).innerHeight() > $(this).offset().top) && (scrollTop < $(this).offset().top + $(this).outerHeight())) {
				// Add animate classes
				$(this).addClass('fadeInDown');
			}
		});

		// Display or hide scroll to top button
		if (scrollTop > 80) {
			$('a.scrollup').fadeIn();
		} else {
			$('a.scrollup').fadeOut();
		}
	});

	// Trigger scroll event once to set initial element states
	$(window).trigger('scroll');

	// Initialise MixItUp for animated portfolio tile filtering
	mixitup('div.mixitup', {
		controls: { scope: 'local' },
		callbacks: {
			// Close open portfolio project when resorting
			'onMixStart': function () {
				$('div.toggleDiv').hide();
			}
		}
	});

	// Show or hide portfolio description on click
	$('.show_hide').on('click', function () {
		$('div.toggleDiv').slideUp(500, '');
		$($(this).attr('rel')).slideToggle(500, '');
	});

	// Function for smooth scrolling links
	$('a[href^="#"]').each(function () {
		// Scroll to top offset
		var targetOffset;
		if (this.hash === '') {
			targetOffset = 0;
		// Scroll target
		} else {
			var $target = $(this.hash);
		}
		$(this).on('click', function () {
 			// Collapse navbar when scrolling
			$navbar.removeClass('show');
			// Get section offset
			if (targetOffset !== 0)
				targetOffset = $target.offset().top - navbarHeight;
			// Scroll in 0.8 seconds
			$('html, body').animate({
				scrollTop: targetOffset
			}, 750);
			// Omit browser link processing
			return false;
		});
	});
});
