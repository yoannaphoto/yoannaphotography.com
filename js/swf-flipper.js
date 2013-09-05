var current_page = 0;
var readyState = function (callback) {
	var body = document.body;

	if (body && body.readyState == 'loaded') {
		callback();
	} else {
		if (window.addEventListener) {
			window.addEventListener('load', callback, false);
		} else {
			window.attachEvent('onload', callback);
		}
	}
}

var PageFlipper = {
	first_page : 1,
	last_page : 1190,

	getCurrentPage: function(){
		var current_url = $('#player').attr('src').split('/');
		return current_url[1].split('.')[0] * 1;
	},

	nextPage: function(){
		var next_page = this.getCurrentPage()+1;
		if(next_page > this.last_page){
			next_page = this.last_page;
		}
		this.setPage(next_page);
	},

	previousPage: function(){
		var next_page = this.getCurrentPage()-1;
		if(next_page < this.first_page){
			next_page = this.first_page;
		}
		this.setPage(next_page);
	},

	setPage: function(page){
		if(isNaN(page)){
			alert('Wrong page number');
			return false;
		}
		var file_number = ('0000' + page).slice(-4);
		var url = 'swf/'+ file_number +'.swf';
		$('#player').attr('src', url);
		$('#pager').val(page);

		this.markActiveChapter(page);
		$.cookie('chem-page', page, { expires: 14 });
	},

	markActiveChapter: function(page){
		$('.nav-list li').removeClass('active');

		var previous_link = false;
		$.each($('.nav-list a'),function(index, aTag) {
			var page_number = $(aTag).attr('href');
			if(page == page_number){
				$(aTag).parent('li').addClass('active');
				return false;
			}
			if(page*1 < page_number*1){
				if(!previous_link){
					previous_link = aTag;
				}
				$(previous_link).parent('li').addClass('active');
				return false;
			}
			previous_link = aTag;
		});
	},

	init: function(){
		var last_viewed = $.cookie('chem-page');
		if(last_viewed){
			this.setPage(last_viewed);
		} else {
			$('#pager').val(this.getCurrentPage());
		}
		return this;
	}
}


readyState(function () {
	var flipper = PageFlipper.init();

	$('#page-navigation a:first').click(function (event) {
		flipper.previousPage();
		return false;
	});

	$('#page-navigation a:last').click(function (event) {
		flipper.nextPage();
		return false;
	});

	$('.nav-list a').click(function () {
		flipper.setPage($(this).attr('href'));
		$(this).parent('li').addClass('active');
		return false;
	});

	$('#pager').keyup(function (event) {
		if(event.keyCode == 13){
			flipper.setPage($(this).val());
		}
		return true;
	});
});