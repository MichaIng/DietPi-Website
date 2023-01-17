// https://github.com/MichaIng/DietPi-Website
'use strict';
!function () {
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
			scrollUp.style.opacity = '1';
		} else {
			scrollUp.style.opacity = '0';
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
	for (let x of document.querySelectorAll('.close, .thumbnail')) {
		x.addEventListener('click', function () {
			let target = document.querySelector(x.getAttribute('rel'));
			for (let x of singleProjects) {
				if (x === target) {
					x.style.height = x.scrollHeight + 'px';
					x.classList.remove('hidden');
				} else if (x.clientHeight) {
					x.style.height = '0';
					x.classList.add('hidden');
				}
			}
		});
	}

	// Collapse navbar when clicking page anchor
	for (let x of document.querySelectorAll('a[href^="#"]')) {
		x.addEventListener('click', function () {
			navbar.classList.remove('show');
		});
	}
}();
