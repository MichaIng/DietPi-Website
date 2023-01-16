// Original: https://github.com/Le-Stagiaire/jquery.cslider/blob/0c99322/src/jquery.cslider.js
'use strict';
!function () {
    $.Slider = function (options, element) {
        this.$el = $(element);
        this._init(options);
    };
    $.Slider.defaults = {
        current: 0, // Initial slide [index]
        bgincrement: 100, // Background parallax [pixels], set "0" to disable
        autoplay: true, // Slideshow enabled [true|false]
        interval: 6000 // Slideshow interval [milliseconds]
    };
    $.Slider.prototype = {
        _init: function (options) {
            this.options = $.extend(true, {}, $.Slider.defaults, options);
            this.isAnimating = false;
            this.bgpositer = 0;
            // Detect slides
            this.$slides = this.$el.find('div.da-slide');
            this.slidesCount = this.$slides.length;
            this.current = (this.options.current >= 0 && this.options.current < this.slidesCount) ? this.options.current : 0;
            this.$slides.eq(this.current).addClass('da-slide-current');
            // Create navigation dots
            var $navigation = $('<nav class="da-dots"/>');
            for (var i = 0; i < this.slidesCount; ++i) {
                if (i === this.current) {
                    $navigation.append('<span class="da-dots-current"/>');
                } else {
                    $navigation.append('<span/>');
                }
            }
            $navigation.appendTo(this.$el);
            this.$pages = this.$el.find('nav.da-dots > span');
            // Detect navigation arrows
            this.$navNext = this.$el.find('span.da-arrows-next');
            this.$navPrev = this.$el.find('span.da-arrows-prev');
            // Register navigation events
            this._loadEvents();
            // Start slideshow if enabled
            if (this.options.autoplay) {
                this._startSlideshow();
            }
        },
        _navigate: function (page, dir) {
            if (this.current === page || this.isAnimating) {
                return false;
            }
            this.isAnimating = true;
            var $current = this.$slides.eq(this.current),
                $next = this.$slides.eq(page),
                rmClasses = 'da-slide-toleft da-slide-toright da-slide-fromleft da-slide-fromright',
                classTo, classFrom;
            // Direction
            if (dir === 'next') {
                classTo = 'da-slide-toleft';
                classFrom = 'da-slide-fromright';
                ++this.bgpositer;
            } else {
                classTo = 'da-slide-toright';
                classFrom = 'da-slide-fromleft';
                --this.bgpositer;
            }
            // Start background animation if enabled
            if (this.options.bgincrement) {
                this.$el.css('background-position-x', this.bgpositer * this.options.bgincrement + '%');
            }
            // Start slide animation
            $current.removeClass(rmClasses);
            $next.removeClass(rmClasses);
            $current.addClass(classTo);
            $next.addClass(classFrom);
            $current.removeClass('da-slide-current');
            $next.addClass('da-slide-current');
            // Update navigation dots
            this.$pages.removeClass('da-dots-current');
            this.$pages.eq(page).addClass('da-dots-current');
            this.current = page;
        },
        _startSlideshow: function () {
            var _self = this;
            this.slideshow = setTimeout(function () {
                var page = (_self.current < _self.slidesCount - 1) ? _self.current + 1 : 0;
                _self._navigate(page, 'next');
                if (_self.options.autoplay) {
                    _self._startSlideshow();
                }
            }, this.options.interval);
        },
        _stopSlideshow: function () {
            if (this.options.autoplay) {
                clearTimeout(this.slideshow);
                this.options.autoplay = false;
            }
        },
        _loadEvents: function () {
            var _self = this;
            // Click on navigation dots
            this.$pages.on('click.cslider', function () {
                _self._stopSlideshow();
                var dir = ($(this).index() > _self.current) ? 'next' : 'prev';
                _self._navigate($(this).index(), dir);
                return false;
            });
            // Click on right navigation arrow
            this.$navNext.on('click.cslider', function () {
                _self._stopSlideshow();
                var page = (_self.current < _self.slidesCount - 1) ? _self.current + 1 : 0;
                _self._navigate(page, 'next');
                return false;
            });
            // Click on left navigation arrow
            this.$navPrev.on('click.cslider', function () {
                _self._stopSlideshow();
                var page = (_self.current > 0) ? _self.current - 1 : _self.slidesCount - 1;
                _self._navigate(page, 'prev');
                return false;
            });
            // Flag to disable navigation during animation
            if (this.options.bgincrement) {
                this.$el.on('transitionend.cslider', function (event) {
                    if (_self.isAnimating && (event.target === event.currentTarget)) {
                        _self.isAnimating = false;
                    }
                });
            } else {
                this.$el.on('animationend.cslider', function (event) {
                    if (_self.isAnimating && (event.originalEvent.animationName === 'fromRight' || event.originalEvent.animationName === 'fromLeft')) {
                        _self.isAnimating = false;
                    }
                });
            }
        }
    };
    $.fn.cslider = function (options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var instance = $.data(this, 'cslider');
                if (!instance) {
                    console.error("cannot call methods on cslider prior to initialization; " +
                    "attempted to call method '" + options + "'");
                } else if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    console.error("no such method '" + options + "' for cslider instance");
                } else {
                    instance[options].apply(instance, args);
                }
            });
        } else {
            this.each(function () {
                var instance = $.data(this, 'cslider');
                if (!instance) {
                    $.data(this, 'cslider', new $.Slider(options, this));
                }
            });
        }
        return this;
    };
}();
