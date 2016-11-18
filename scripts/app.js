var product = $banner.find('.product');
var logo = $banner.find('.logo');
var text = $banner.find('.banner-text');
var roll = $banner.find('.roll-container');

var CTA = $('.cta-container');
var panel_logo = $panel.find('.logo');
var swiper_slide = $('.content-swiper-container .swiper-slide');
var thumb_item = $('.gallery-container .gallery-item');
var footer_slide = $('.footer-swiper-container .swiper-slide');
var btn_learn_more = $('.btn-learn-more');

var header_container = $('.header-container');


AD_CM.adLoaded = function(){
	TweenMax.fromTo(product, 0.6, {
		autoAlpha: 0,
		y: 100
	}, {
		autoAlpha: 1,
		y: 0,
		delay: 0.3
	});

	TweenMax.fromTo(roll, 0.6, {
		autoAlpha: 1,
		y: '100%'
	}, {
		y: '0%',
		delay: 0.6
	});

	TweenMax.fromTo(text, 0.6, {
		autoAlpha: 0,
		y: -50
	}, {
		autoAlpha: 1,
		y: 0,
		delay: 0.9
	});

	TweenMax.fromTo(logo, 0.6, {
		autoAlpha: 0,
	}, {
		autoAlpha: 1,
		delay: 1.2
	});
}

AD_CM.beforeExpand = function(){

}

AD_CM.afterExpand = function(){
	
}

AD_CM.beforeCollapse = function(){
	
}

AD_CM.afterCollapse = function(){

}

AD_CM.registerEvents = function(){

	CTA.on('click', function(){
		EB.clickthrough("CTA_Exit");
		collapse();
		return false;
	});

	panel_logo.on('click', function(){
		EB.clickthrough("Logo_Exit");
		collapse();
		return false;
	});

	header_container.on('click', function(){
		EB.clickthrough("Background_Exit");
		collapse();

		return false;
	});

	btn_learn_more.on('click', function(){
		var index = $(this).data('index');

		switch(index){
            case 1:
	            EB.clickthrough('Slide1_CTA_Exit');
	            break;
            case 2:
	            EB.clickthrough('Slide2_CTA_Exit');
	            break;
            case 3:
	            EB.clickthrough('Slide3_CTA_Exit');
	            break;
            case 4:
	            EB.clickthrough('Slide4_CTA_Exit');
	            break;
            case 5:
	            EB.clickthrough('Slide5_CTA_Exit');
	            break;
            case 6:
	            EB.clickthrough('Slide6_CTA_Exit');
	            break;
        }

        collapse();

		return false;
	});
}







