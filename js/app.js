'use strict';
// https://github.com/MichaIng/DietPi-Website
$(function () {
	// Map navigation bar scroll locations
	var lastId,
	topMenu = $('.navbar-collapse'),
	topMenuHeight = 60, //topMenu.outerHeight(),
	// All list items
	menuItems = topMenu.find('a'),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function () {
		var href = $(this).attr('href');
		if (href.indexOf('#') === 0) {
			var item = $(href);
			if (item.length) {
				return item;
			}
		}
	});

	// Initialize home slider: https://github.com/Le-Stagiaire/jquery.cslider
	// Check first if function exist to allow skipping it on dietpi-software site
	if (typeof $.fn.cslider === 'function') {
		$('#home').cslider({
			bgincrement: 100,
			autoplay: true,
			interval: 6000
		});
	}

	// Show portfolio navigation, now that js is enabled
	document.getElementById('downloadinfo').removeAttribute('style');
	document.getElementById('portfolio-grid').removeAttribute('style');

	// Initial mixitup for animated portfolio filtering
	mixitup('#download', {
		controls: { scope: 'local' },
		callbacks: {
			// Close open portfolio project when resorting
			'onMixStart': function () {
				$('div.toggleDiv').hide();
			}
		}
	});

	// Bind to scroll
	$(window).on('scroll', function () {

		// Display or hide scroll to top button and toggle navbar type
		if ($(this).scrollTop() > 80) {
			$('a.scrollup').fadeIn();
			$('.navbar').addClass('fixed-top animated fadeInDown');
		} else {
			$('a.scrollup').fadeOut();
			$('.navbar.fixed-top').removeClass('fixed-top animated fadeInDown');
		}

		// Mark navbar link, related to scroll item, as active
		// - Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight + 50;
		// - Get items until scroll position
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop)
				return this;
		});
		// - Get id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';
		// - If id changed, reset active class
		if (lastId !== id) {
			lastId = id;
			menuItems.removeClass('active');
			menuItems.filter('[href="#' + id + '"]').addClass('active');
		}

		// Animate triangles once, when they come in view
		$('.triangle').each(function () {
			// Element has not been animated yet
			if (!$(this).hasClass('animated')) {
				// Element is in view
				if (($(window).scrollTop() + $(window).innerHeight() > $(this).offset().top) && ($(window).scrollTop() < $(this).offset().top + $(this).outerHeight())) {
					// Add animate classes
					$(this).addClass('animated fadeInDown');
				}
			}
		});
	});

	// Trigger scroll event once to set initial element states
	$(window).trigger('scroll');

	// Function for scrolling to top
	$('.scrollup').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	// Function for scrolling to sections
	// EDIT: Do not wrap into "load", since this can fire before "ready".
	// $(window).on('load', function () {
		function filterPath(string) {
			return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
		}
		$('a[href*="#"]').each(function () {
			if (filterPath(location.pathname) == filterPath(this.pathname) && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
				var $targetId = $(this.hash),
				$targetAnchor = $('[name=' + this.hash.slice(1) + ']');
				var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;

				if ($target) {
					$(this).on('click', function () {
 						// Hack collapse top navigation after clicking
						topMenu.removeClass('show');

						var targetOffset = $target.offset().top - topMenuHeight;
						$('html, body').animate({
							scrollTop: targetOffset
						}, 800);
						return false;
					});
				}
			}
		});
	// });

	// Initially hide portfolio description
	$('div.toggleDiv').hide();

	// Show or hide portfolio description on click
	$('.show_hide').on('click', function () {
		$('.toggleDiv').slideUp(500, '');
		var target = $(this).attr('rel')
		$(target).slideToggle(500, '');
		return false;
	});
});
