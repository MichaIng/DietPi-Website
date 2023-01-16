// https://github.com/MichaIng/DietPi-Website
'use strict';
!function () {
	// Initialise home slider: https://github.com/Le-Stagiaire/jquery.cslider
	// Check first if function exist to allow skipping it on dietpi-software site
	if (typeof $.fn.cslider === 'function')
		$('#home').cslider();

	// Store used elements globally once
	var lastId,
	    scrollUp = document.querySelector('a.scrollup'),
	    triangles = document.querySelectorAll('svg.triangle'),
	    singleProjects = document.querySelectorAll('div.single-project'),
	    navbar = document.querySelector('div.navbar-collapse'),
	    navbarHeight = 60, // navbar.outerHeight() leads to wrong scroll offset when menu is expanded
	    // Navigation bar links
	    navbarLinks = navbar.querySelectorAll('a[href^="#"]'),
	    // Navigation bar targets
	    navbarTargets = [];
	    for (let x of navbarLinks) {
		navbarTargets.push(document.getElementById(x.hash.substring(1)));
	    }

	// Bind to scroll
	window.addEventListener('scroll', function () {
		// Mark navbar link, related to scroll position, as active
		// - Get ID of the current target
		var curId = '';
		for (let x of navbarTargets) {
			if (x.getBoundingClientRect().y > navbarHeight + 50)
				break;
			curId = x.id;
		}

		// - If ID changed, change links active class accordingly
		if (lastId !== curId) {
			lastId = curId;
			for (let x of navbarLinks) {
				if (x.hash === '#' + curId) {
					x.classList.add('active');
				} else {
					x.classList.remove('active');
				}
			}
		}

		// Animate triangles once, when they come in view
		for (let x of triangles) {
			// Break once loop reached triangle below viewport
			if (x.getBoundingClientRect().y > window.innerHeight)
				break;
			// Triangle is in view and has not been animated yet
			if (x.getBoundingClientRect().bottom > 0 && !x.classList.contains('fadeInDown'))
				// Add animate classes
				x.classList.add('fadeInDown');
		}

		// Display or hide scroll-to-top button
		if (window.pageYOffset > 80) {
			scrollUp.style.opacity = 100;
		} else {
			scrollUp.style.opacity = 0;
		}
	});

	// Trigger scroll event once to set initial element states
	window.dispatchEvent(new Event('scroll'));

	// Initialise MixItUp for animated portfolio tile filtering
	mixitup('div.mixitup', {
		controls: { scope: 'local' },
		callbacks: {
			// Close open portfolio project when resorting
			'onMixStart': function () {
				for (let x of singleProjects) {
					x.style.display = 'none';
				}
			}
		}
	});

	// Show or hide portfolio description on click
	for (let x of document.querySelectorAll('.show_hide')) {
		x.addEventListener('click', function () {
			$('div.single-project').slideUp(500, '');
			$(x.getAttribute('rel')).slideToggle(500, '');
		});
	}

	// Function for smooth scrolling links
	for (let x of document.querySelectorAll('a[href^="#"]')) {
		// Scroll to top offset
		let target, targetOffset;
		if (x.hash === '') {
			targetOffset = 0;
		// Scroll target
		} else {
			target = document.getElementById(x.hash.substring(1));
		}
		x.addEventListener('click', function () {
			// Collapse navbar when scrolling
			navbar.classList.remove('show');
			// Get section offset
			if (target)
				targetOffset = window.pageYOffset + target.getBoundingClientRect().y - navbarHeight;
			// Scroll in 0.75 seconds
			$('html, body').animate({
				scrollTop: targetOffset
			}, 750);
			// Omit browser link processing
			return false;
		});
	}
}();
