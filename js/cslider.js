// Original: https://github.com/Le-Stagiaire/jquery.cslider/blob/0c99322/src/jquery.cslider.js
'use strict';
!function () {
	function Slider(el, options) {
		this.el = el;
		this._init(options);
	}
	Slider.defaults = {
		current: 0, // Initial slide [index]
		bgincrement: 100, // Background parallax [pixels], set "0" to disable
		autoplay: true, // Slideshow enabled [true|false]
		interval: 6000 // Slideshow interval [milliseconds]
	};
	Slider.prototype = {
		_init: function (options) {
			this.options = Object.assign({}, Slider.defaults, options);
			this.isAnimating = false;
			this.bgpositer = 0;
			// Detect slides
			this.slides = this.el.querySelectorAll('div.da-slide');
			this.slidesCount = this.slides.length;
			this.current = (this.options.current >= 0 && this.options.current < this.slidesCount) ? this.options.current : 0;
			this.slides[this.current].classList.add('da-slide-current');
			// Create navigation dots
			let html = '<nav class="da-dots">';
			for (let i = 0; i < this.slidesCount; ++i) {
				if (i === this.current) {
					html += '<span class="da-dots-current"></span>';
				} else {
					html += '<span></span>';
				}
			}
			this.el.insertAdjacentHTML('beforeend', html + '</nav>');
			this.dots = this.el.querySelectorAll('nav.da-dots > span');
			// Detect navigation arrows
			this.navNext = this.el.querySelectorAll('span.da-arrows-next');
			this.navPrev = this.el.querySelectorAll('span.da-arrows-prev');
			// Register navigation events
			this._loadEvents();
			// Start slideshow if enabled
			if (this.options.autoplay) this._startSlideshow();
		},
		_navigate: function (target, direction) {
			if (this.current === target || this.isAnimating) return;
			this.isAnimating = true;
			const current = this.slides[this.current], next = this.slides[target];
			// Start slide animation depending on direction
			if (direction === 'next') {
				current.classList.remove('da-slide-toright', 'da-slide-fromleft', 'da-slide-fromright', 'da-slide-current');
				current.classList.add('da-slide-toleft');
				next.classList.remove('da-slide-toleft', 'da-slide-toright', 'da-slide-fromleft');
				next.classList.add('da-slide-fromright', 'da-slide-current');
				++this.bgpositer;
			} else {
				current.classList.remove('da-slide-toleft', 'da-slide-fromleft', 'da-slide-fromright', 'da-slide-current');
				current.classList.add('da-slide-toright');
				next.classList.remove('da-slide-toleft', 'da-slide-toright', 'da-slide-fromright');
				next.classList.add('da-slide-fromleft', 'da-slide-current');
				--this.bgpositer;
			}
			// Start background animation if enabled
			if (this.options.bgincrement) this.el.style.backgroundPositionX = this.bgpositer * this.options.bgincrement + '%';
			// Update navigation dots
			for (let x of this.dots) {
				if (x === this.dots[target]) {
					x.classList.add('da-dots-current');
				} else {
					x.classList.remove('da-dots-current');
				}
			}
			this.current = target;
		},
		_startSlideshow: function () {
			const _self = this;
			this.slideshow = setTimeout(function () {
				const target = (_self.current < _self.slidesCount - 1) ? _self.current + 1 : 0;
				_self._navigate(target, 'next');
				if (_self.options.autoplay) _self._startSlideshow();
			}, this.options.interval);
		},
		_stopSlideshow: function () {
			if (this.options.autoplay) {
				clearTimeout(this.slideshow);
				this.options.autoplay = false;
			}
		},
		_loadEvents: function () {
			const _self = this;
			// Click on navigation dots
			for (let x of this.dots) {
				x.addEventListener('click', function () {
					_self._stopSlideshow();
					const index = Array.from(x.parentNode.children).indexOf(x);
					_self._navigate(index, (index > _self.current) ? 'next' : 'prev');
				});
			}
			// Click on right navigation arrow
			for (let x of this.navNext) {
				x.addEventListener('click', function () {
					_self._stopSlideshow();
					const target = (_self.current < _self.slidesCount - 1) ? _self.current + 1 : 0;
					_self._navigate(target, 'next');
				});
			}
			// Click on left navigation arrow
			for (let x of this.navPrev) {
				x.addEventListener('click', function () {
					_self._stopSlideshow();
					const target = (_self.current > 0) ? _self.current - 1 : _self.slidesCount - 1;
					_self._navigate(target, 'prev');
				});
			}
			// Flag to disable navigation during animation
			if (this.options.bgincrement) {
				this.el.addEventListener('transitionend', function (e) {
					if (_self.isAnimating && (e.target === e.currentTarget)) _self.isAnimating = false;
				});
			} else {
				this.el.addEventListener('animationend', function (e) {
					if (_self.isAnimating && (e.originalEvent.animationName === 'fromRight' || e.originalEvent.animationName === 'fromLeft')) _self.isAnimating = false;
				});
			}
		}
	};
	new Slider(document.querySelector('#home'));
}();
