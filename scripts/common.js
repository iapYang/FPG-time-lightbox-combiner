var $ad = $('#ad');
var $banner = $('#banner');
var $panel = $('#panel');

var btn_close = $('.btn-close');
var btn_userAction = $('.btn-userAction');
var btn_clickThrough = $('.btn-clickthrough');

/* banner */
var overlay = $banner.find('.overlay');

/* panel */
var body_container = $panel.find('.body-container');
var gallery_container = $panel.find('.gallery-container');
var gallery = gallery_container.find('.gallery');
var gallery_title = gallery.find('.gallery-title');
var gallery_content = gallery.find('.gallery-content');
var gallery_item = gallery.find('.gallery-item');


var $video =  $('video');
var videoTrackingModule = new EBG.VideoModule($video[0]);
var video_element = $('video');
var video_dom = video_element[0];
var video_play_btn = $('.video-play-btn');
var video_sound_btn = $('.video-sound-btn');


/* footer */
var footer_container = $('.footer-container');
var footer_item = footer_container.find('.footer-item');

/* common */
var btn_container = $('.btn-container');

/* loading */
var intervalId;
var prevTime;
var loading = $('.loading');

/* swiper */
var next_button = $('.swiper-button-next');
var prev_button = $('.swiper-button-prev');





var content_swiper, footer_swiper;


var $window = $(window);

var AD_CM = {};
AD_CM.flag_banner_hover = null;
AD_CM.flag_gallery_title_click = false;
AD_CM.flag_swiper_trigger = true;
AD_CM.active_index = 0;


var ua = window.navigator.userAgent.toLowerCase();
window.platform = {
    isHD: window.devicePixelRatio > 1,
    isiPad: ua.match(/ipad/i) !== null,
    isNexus7: ua.match(/Nexus 7/gi) !== null,
    isMobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) !== null && ua.match(/Mobile/i) !== null,
    isiPhone: ua.match(/iphone/i) !== null,
    isAndroid: ua.match(/android/i) !== null,
    // isAndroid444: ua.match(/android 4\.4\.4/i) !== null,
    // isAndroid43: ua.match(/android 4\.3/i) !== null,
    isS3: ua.match(/gt\-i9300/i) !== null,
    isS4: ua.match(/(gt\-i95)|(sph\-l720)/i) !== null,
    isS5: ua.match(/sm\-g900/i) !== null,
    isIE: /(msie|trident)/i.test(navigator.userAgent),
    isIE11: ua.match(/Trident\/7\.0/i) !== null,
    isChrome: ua.match(/Chrome/gi) !== null,
    isFirefox: ua.match(/firefox/gi) !== null,
    hasTouch: ('ontouchstart' in window),
    supportsSvg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
};

window.platform.isAndroidPad = platform.isAndroid && !platform.isMobile;
window.platform.isTablet = platform.isiPad || platform.isAndroidPad;
window.platform.isDesktop = !(platform.isMobile || platform.isTablet);
window.platform.isIOS = platform.isiPad || platform.isiPhone;


// console.log = function(){}


function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, function(){
            startAd();
        });
    } else {
        startAd();
    }
}

function startAd() {
    pictureLoad();

    useInAppCloseButton();
    addEventListeners();

    initGallery();

    AD_CM.adLoaded();
}

function useInAppCloseButton() {
    var sdkData = EB.getSDKData();

    if (sdkData !== null) {
        if (sdkData.SDKType === "MRAID") {
            // set sdk to use custom close button
            EB.setExpandProperties({
                useCustomClose: true
            });
        }
    }
}

function loadingHolder(){
    intervalId = setInterval(function() {
        if (prevTime == $video[0].currentTime) {
            loading.addClass('active');
        } else {
            prevTime = $video[0].currentTime;
            loading.removeClass('active');
        }
    }, 300);
}

function clearLoadingHolder(){
    clearInterval(intervalId);
    loading.removeClass('active');
}

function addEventListeners() {
    btn_container.on('mouseenter', function(){
        var normal = $(this).find('.normal');

        TweenMax.to(normal, 0.3, {
            autoAlpha: 0
        });
    }).on('mouseleave', function(){
        var normal = $(this).find('.normal');

        TweenMax.to(normal, 0.3, {
            autoAlpha: 1
        });
    });

    $banner.on('click', function(){
        clearTimeout(AD_CM.flag_banner_hover);

        expand();
    }).on('mouseenter', function(){
        AD_CM.flag_banner_hover = setTimeout(expand, 2000);

        overlay.addClass('active');
    }).on('mouseleave', function(){
        clearTimeout(AD_CM.flag_banner_hover);

        overlay.removeClass('active');
    });

    btn_close.on('click', collapse);
    btn_userAction.on('click', userActionCounter);
    btn_clickThrough.on('click', clickthrough);



    gallery_title.on('click', function(){
        var $this = $(this);
        var parent_gallery = $this.parents('.gallery');
        var index = parent_gallery.index();

        changeToGallery(index, true);
    });

    gallery_item.on('click', function(){
        var $this = $(this);
        var index = $this.data('index');
        var indexTracking = index + 1;

        switch(indexTracking){
            case 1:
                EB.userActionCounter('Thumbnail1_Counter');
                console.log('Thumbnail1_Counter');
                break;
            case 2:
                EB.userActionCounter('Thumbnail2_Counter');
                console.log('Thumbnail2_Counter');
                break;
            case 3:
                EB.userActionCounter('Thumbnail3_Counter');
                console.log('Thumbnail3_Counter');
                break;
            case 4:
                EB.userActionCounter('Thumbnail4_Counter');
                console.log('Thumbnail4_Counter');
                break;
            case 5:
                EB.userActionCounter('Thumbnail5_Counter');
                console.log('Thumbnail5_Counter');
                break;
            case 6:
                EB.userActionCounter('Thumbnail6_Counter');
                console.log('Thumbnail6_Counter');
                break;
        }

        changeToItem(index, true);

    }).on('mouseenter', function(){
        $(this).addClass('hover');
    }).on('mouseleave', function(){
        $(this).removeClass('hover');
    });

    footer_item.on('click', function(){
        var $this = $(this);
        var index = $(this).index();
        var indexTracking = index + 1;

        switch(indexTracking){
            case 1:
                EB.userActionCounter('Thumbnail1_Counter');
                console.log('Thumbnail1_Counter');
                break;
            case 2:
                EB.userActionCounter('Thumbnail2_Counter');
                console.log('Thumbnail2_Counter');
                break;
            case 3:
                EB.userActionCounter('Thumbnail3_Counter');
                console.log('Thumbnail3_Counter');
                break;
            case 4:
                EB.userActionCounter('Thumbnail4_Counter');
                console.log('Thumbnail4_Counter');
                break;
            case 5:
                EB.userActionCounter('Thumbnail5_Counter');
                console.log('Thumbnail5_Counter');
                break;
            case 6:
                EB.userActionCounter('Thumbnail6_Counter');
                console.log('Thumbnail6_Counter');
                break;
        }

        changeToItem(index, true);

    }).on('mouseenter', function(){
        $(this).addClass('hover');
    }).on('mouseleave', function(){
        $(this).removeClass('hover');
    });

    $window.on('resize', function(){
        if(footer_swiper != undefined){
            footer_swiper.update(true);
            footer_swiper.slideTo(AD_CM.active_index);
        }
        
        if(myScroll != undefined){
            myScroll.refresh();
            myScroll.scrollToElement(gallery_item[AD_CM.active_index], 500, 0, -10);
        }
        
    });

    video_play_btn.on('click', function(){
        var $this = $(this);
        var video = $(this).prev('video')[0];

        video.play();
    }).on('mouseenter', function(){
        $this = $(this);
        var hover = $this.find('.hover');
        var normal = $this.find('.normal');

        hover.addClass('active').removeClass('hidden');
        normal.addClass('hidden').removeClass('active');
    }).on('mouseleave', function(){
        $this = $(this);
        var hover = $this.find('.hover');
        var normal = $this.find('.normal');

        hover.addClass('hidden').removeClass('active');
        normal.addClass('active').removeClass('hidden');
    });

    video_sound_btn.on('click', function(){
        if(video_sound_btn.hasClass('muted')){
            video_dom.muted = false;
            video_sound_btn.removeClass('muted');
        }else{
            video_dom.muted = true;
            video_sound_btn.addClass('muted');
        }
    });

    video_element.on('click', function(){
        var $this = $(this);
        var play_btn = $this.next('.video-play-btn');

        this.pause();
        play_btn.removeClass('hidden');


        var hover = play_btn.find('.hover');
        var normal = play_btn.find('.normal');

        hover.addClass('active').removeClass('hidden');
        normal.addClass('hidden').removeClass('active');
    }).on('play', function(){
        loadingHolder();

        var $this = $(this);
        var play_btn = $this.next('.video-play-btn');

        play_btn.addClass('hidden');
    }).on('ended', function(){
        clearLoadingHolder();

        var $this = $(this);
        var play_btn = $this.next('.video-play-btn');

        play_btn.removeClass('hidden');
    }).on('pause', function(){
        clearLoadingHolder();
    });


    prev_button.on('click', function(){
        if(content_swiper.activeIndex == 0){
            content_swiper.slideTo(content_swiper.slides.length - 1);
        }else{
            content_swiper.slidePrev();     
        }
    }).on('mouseenter', function(){
        prev_button.addClass('active');
    }).on('mouseleave', function(){
        prev_button.removeClass('active');
    });

    next_button.on('click', function(e){
        if(content_swiper.activeIndex == content_swiper.slides.length - 1){
            content_swiper.slideTo(0);
        }else{
            content_swiper.slideNext();     
        }
    }).on('mouseenter', function(){
        next_button.addClass('active');
    }).on('mouseleave', function(){
        next_button.removeClass('active');
    });

    AD_CM.registerEvents();
}



var flag_expand_first = true;
function expand() {
    EB.expand();

    AD_CM.beforeExpand();

    TweenMax.fromTo($banner, 1, {
        autoAlpha: 1
    }, {
        autoAlpha: 0,
        onComplete: function(){
            TweenMax.set($banner, {
                display: 'none'
            });

            flag_close_ad = false;
        }
    });

    
    TweenMax.fromTo($panel, 1, {
        autoAlpha: 0,
        display: 'block'
    }, {
        autoAlpha: 1,
        onStart: function(){
            if(flag_expand_first){
                flag_expand_first = false;
                initSwiper();
            }
            
            refreshActiveSwiper();
        },
        onComplete: function(){
            $ad.removeClass('collapsed').addClass('expanded');

            content_swiper.update(true);
            AD_CM.afterExpand();
        }
    });
}

var flag_close_ad = false;
function collapse() {
    EB.collapse();

    AD_CM.beforeCollapse();

    flag_close_ad = true;
    resetVideo();

    TweenMax.set($banner, {
        autoAlpha: 1,
        display: 'block'
    });

    TweenMax.set($panel, {
        autoAlpha: 0,
        display: 'none',
        onComplete: function(){
            $ad.removeClass('expanded').addClass('collapsed');

            changeToGallery(0, true);
            changeToItem(0, true);

            AD_CM.afterCollapse();
        }
    });

    return false;
}

function clickthrough() {
    //
    EB.clickthrough();
}

function userActionCounter() {
    //
    EB.userActionCounter("CustomInteraction");
}

function pictureLoad() {
    $('.preload').each(function() {
        var $this = $(this);
        var src = $this.data('source');
        var img = $('<img>').attr({
            src: src,
            alt: '',
        });

        $this.append(img);
    });
}

function initGallery(){
    var body_container_height = 410;//body_container.height();
    var title_hight = gallery_title.outerHeight();

    var content_height = body_container_height - title_hight * gallery_title.length;
    var gallery_active = gallery.filter('.active');
    
    gallery_active.find('.gallery-content').height(content_height);

    gallery_item.each(function(i, item){
        $(item).data('index', i);
    });

    $('.btn-learn-more').each(function(i, item){
        $(item).data('index', i + 2);
    });
}

var myScroll;
function initSwiper(){
    myScroll = new IScroll($('.gallery-content')[0], { 
        mouseWheel: true,
        scrollbars: 'custom'
    });

    content_swiper = new Swiper ('.content-swiper-container', {
        onSlideChangeStart: function(){

            resetVideo();
            adjustVideo();
            triggerTracking();

            var target_gallery_item = gallery_item.eq(content_swiper.activeIndex);
            var target_gallery = target_gallery_item.parents('.gallery');
            var target_gallery_index = target_gallery.index();

            changeToGallery(target_gallery_index);

            if(AD_CM.flag_swiper_trigger){
                changeToItem(content_swiper.activeIndex);
            }else{
                AD_CM.flag_swiper_trigger = true;
            }
        }
    });

    footer_swiper = new Swiper('.footer-swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
        freeMode: true,
        mousewheelControl: true
    });
}

function resetVideo(){
    video_element[0].pause();
    if(video_element[0].currentTime != 0){
        video_element[0].currentTime = 0;    
    }
    video_element.next('.video-play-btn').removeClass('hidden');

    if(video_sound_btn.hasClass('muted') && flag_close_ad){
        video_dom.muted = false;
        video_sound_btn.removeClass('muted');
    }
}

function adjustVideo(){
    var active_content_swiper = $(content_swiper.slides[content_swiper.activeIndex]);
    var video_ele = active_content_swiper.find('.swiper-item-video');

    if(video_ele.length > 0){
        if(platform.isIE11){
            $video.css('display', 'block').css('opacity', '1');    
        }
        
        if(!flag_close_ad){
            $video[0].play();
        }
        
    }else{
        if(platform.isIE11){
            setTimeout(function(){
                $video.css('display', 'none').css('opacity', '0');    
            }, 300);
        }
    }
}

/*
    index: 0 ~ n
*/
function changeToGallery(index, need_toTop){
    if(AD_CM.flag_gallery_title_click) return;
    AD_CM.flag_gallery_title_click = true;

    var clicked_gallery = gallery.eq(index);

    if(clicked_gallery.hasClass('active')){
        AD_CM.flag_gallery_title_click = false;        
        return;
    }

    var active_gallery = gallery.filter('.active');
    var active_index = active_gallery.index();

    

    var active_content = active_gallery.find('.gallery-content');
    var current_content = clicked_gallery.find('.gallery-content');

    var target_height = active_content.height();

    TweenMax.to(active_content, 0.5, {
        height: 0
    });

    TweenMax.to(current_content, 0.5, {
        height: target_height,
        onStart: function(){
            var scroller = clicked_gallery.find('.swiper-scrollbar');
            TweenMax.set(scroller, {
                autoAlpha: 0
            });

            active_gallery.removeClass('active');
            clicked_gallery.addClass('active');
        },
        onComplete: function(){
            AD_CM.flag_gallery_title_click = false;

            if(need_toTop){
                myScroll.scrollTo(0, 0);
            }

            refreshActiveSwiper(true);
        }
    });
}

/*
    index: 0 ~ n (no loop)
*/
function changeToItem(index, need_swiper){
    AD_CM.active_index = index;

    var active_gallery_item = gallery_item.eq(index);

    if(active_gallery_item.hasClass('active')) return;

    var active_item_index = active_gallery_item.index();


    gallery_item.removeClass('active');
    active_gallery_item.addClass('active');

    var parent_index = active_gallery_item.parents('.gallery').index();
    myScroll.scrollToElement(active_gallery_item[0], 500, 0, -10);    
    
    footer_swiper.slideTo(index);


    var active_footer_item = footer_item.eq(index);

    footer_item.removeClass('active');
    active_footer_item.addClass('active');


    if(need_swiper){
        AD_CM.flag_swiper_trigger = false;

        content_swiper.slideTo(index);
    }
}

function refreshActiveSwiper(flag_fadeIn){
    myScroll.refresh();
}

function triggerTracking(){
    if(flag_close_ad) return;
    flag_close_ad = false;

    if(!AD_CM.flag_swiper_trigger) return;

    var indexTracking = content_swiper.activeIndex + 1;

    switch(indexTracking){
        case 1:
            EB.userActionCounter('Slide1_Counter');
            console.log("Slide1_Counter");
            break;
        case 2:
            EB.userActionCounter('Slide2_Counter');
            console.log("Slide2_Counter");
            break;
        case 3:
            EB.userActionCounter('Slide3_Counter');
            console.log("Slide3_Counter");
            break;
        case 4:
            EB.userActionCounter('Slide4_Counter');
            console.log("Slide4_Counter");
            break;
        case 5:
            EB.userActionCounter('Slide5_Counter');
            console.log("Slide5_Counter");
            break;
        case 6:
            EB.userActionCounter('Slide6_Counter');
            console.log("Slide6_Counter");
            break;
    }
}




$window.on('load', initEB);











