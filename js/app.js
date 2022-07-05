'use strict';
// https://github.com/MichaIng/DietPi-Website
// Initialise home slider: https://github.com/Le-Stagiaire/jquery.cslider
// Check first if function exist to allow skipping it on dietpi-software site

let glider = new Glider(document.querySelector('.glider'), {
	slidesToShow: 1,
	dots: '.dots',
	rewind: true,
	arrows: {
		prev: '.glider-prev',
		next: '.glider-next'
	}
});

function sliderAuto(slider, ms) {
	let slideTimeout = null;
	let nextIndex = 1;

	function slide() {
		slideTimeout = setTimeout(
			function () {
				if (nextIndex >= 4) {
					nextIndex = 0;
				}
				slider.scrollItem(nextIndex++);
			},
			ms
		);
	}

	slider.ele.addEventListener('glider-animated', function () {
		window.clearInterval(slideTimeout);
		slide();
	});

	slide();
}

sliderAuto(glider, 5000)

// Map navigation bar scroll links and targets
var lastId,
	navbar = document.querySelector("div.navbar-collapse"),
	navbarHeight = 60, // $navbar.outerHeight() leads to wrong scroll offset when menu is expanded
	// Navigation bar links
	navbarLinks = Array.from(navbar.querySelectorAll('a[href^="#"]'));

// Bind to scroll
window.addEventListener('scroll', function () {
	// Get current scroll offset
	var scrollTop = window.scrollY;

	// Mark navbar link, related to scroll position, as active
	// - Get targets until current scroll position
	var cur = navbarLinks.map(function (x) {
		if (x.getBoundingClientRect().top + window.scrollY < scrollTop + navbarHeight + 50)
			return x;
	});
	// - Get id of the current target
	cur = cur[cur.length - 1];
	var id = cur && cur.length ? cur[0].id : '';
	// - If id changed, change links active class accordingly
	if (lastId !== id) {
		lastId = id;
		navbarLinks.forEach(x => x.classList.remove('active'));
		navbarLinks.filter(x => x.hash == '#' + id).forEach(x => x.classList.add('active'));
	}

	// Animate triangles once, when they come in view
	document.querySelectorAll('svg.triangle').forEach(function (x) {
		let height = x.getBoundingClientRect().top;
		// Element has not been animated yet and is in view
		if (!x.classList.contains('fadeInDown') && (scrollTop + window.innerHeight > height + window.scrollY) && (scrollTop < height + window.scrollY)) {
			// Add animate classes
			x.classList.add('fadeInDown');
		}
	});

	// Display or hide scroll to top button
	if (scrollTop > 80) {
		document.querySelector('a.scrollup').style.opacity = "100";
	} else {
		document.querySelector('a.scrollup').style.opacity = "0";
	}
});

// Trigger scroll event once to set initial element states
window.dispatchEvent(new Event('scroll'));

// Initialise MixItUp for animated portfolio tile filtering
mixitup('div.mixitup', {
	controls: { scope: 'local' },
});

document.querySelectorAll('div.toggleDiv').forEach(y => {
	y.style.display = ""
})

// Show or hide portfolio description on click
document.querySelectorAll('.show_hide').forEach(x => x.addEventListener('click', function () {
	document.querySelectorAll('div.toggleDiv').forEach(y => {
		y.classList.remove("active")
	})
	let y = document.querySelector(x.getAttribute('rel'));
	if (y == null) {
		return;
	}

	if (!y.classList.contains("active")) {
		y.classList.add("active")
	}
}));
