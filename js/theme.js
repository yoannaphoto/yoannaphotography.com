var readyState = function (callback) {
	var body = document.body;

	if (body && body.readyState == 'loaded') {
		callback();
	}
	else {
		if (window.addEventListener) {
			window.addEventListener('load', callback, false);
		}
		else {
			window.attachEvent('onload', callback);
		}
	}
}

readyState(function () {
	/**
	 * Scroll Page
	 */
	function scrollPage(page) {
		$('#navigation a[data-nav="scroll"]').removeClass('active');

		$('#navigation a[href="#/' + page + '"]').addClass('active');

		scroll = false;

		$('html, body').animate({ scrollTop:$('#' + page).offset().top }, 800, function () {
			scroll = true;
		});
	}

	/**
	 * Panel offset
	 */
	$('.panel').css({'margin-top':$('#header').height()});


	/**
	 * Window scroll
	 */
	$(window).scroll(function () {
		var self = this;

		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
		}
		else {
			$('#back-top').fadeOut();
		}
	});

	/**
	 * Window resize
	 */
	$(window).resize(function () {
		introPos();
	});

	/**
	 * Scroll to top links
	 */
	$('#back-top').click(function (event) {
		$('#navigation a[data-nav="scroll"]').removeClass('active');

		var firstItem = $('#navigation a[data-nav="scroll"]:first');

		firstItem.addClass('active');

		hasher.setHash(firstItem.attr('href').replace('#/', ''));

		$('html, body').animate({ scrollTop:0 }, 800);

		return false;
	});

	$('#logo').click(function (event) {
		$('#navigation a[data-nav="scroll"]').removeClass('active');

		var firstItem = $('#navigation a[data-nav="scroll"]:first');

		firstItem.addClass('active');

		hasher.setHash(firstItem.attr('href').replace('#/', ''));

		$('html, body').animate({ scrollTop:0 }, 800);

		return false;
	});


	$("#slider4").responsiveSlides({
		auto: true,
		pager: false,
		nav: true,
		speed: 500,
		namespace: "callbacks",
		before: function () {
			$('.events').append("<li>before event fired.</li>");
		},
		after: function () {
			$('.events').append("<li>after event fired.</li>");
		}
	});

});
