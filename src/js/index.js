window.addEventListener('DOMContentLoaded', function() {
    loadSliders();
    reloadSlider();
    showMenu();
    customSelect();
    resizeImageHapyy();
    resizeVideo();
    /*
    var feed = new Instafeed({
        accessToken: 'your-token'
      });
      feed.run();
    */
})
window.addEventListener('load', function() {
    clickOnMapIco();
    setTimeout(function() {
        ShowPopup() 
    }, 3000);
    acordeon();
    scrollToTop();
    currentLocation();
    scrollToSeeSides();
    hrefMenu();
})
window.addEventListener('resize', function() {
    reloadSlider();
    resizeAcordeon();
    resizeVideo();
    resizeImageHapyy();
})
window.addEventListener('scroll', function() {
    downBrightnes();
})
window.addEventListener('locationchange', function(){
    hrefMenu();
    hrefWine();
})
window.addEventListener("fullscreenchange", function() {
    console.log("work");
    ofFullScrenn();
});

//---Changed active slider on contact section
function slicktoGo() {
    const locatiounCurrent = document.querySelectorAll("header .inputs-wrapper .dropdown-list li");
    const buttonNext = document.querySelector('.locations .slick-arrow.slick-next');
    const buttonNextM = document.querySelector('.contact .slick-arrow.slick-next');
    let current;

    if (locatiounCurrent) {
        for (let index = 0; index < locatiounCurrent.length; index++) {
            const element = locatiounCurrent[index];
            if (element.classList.contains("active")) {
                current = index;
            }
        }
        if (buttonNext) {  
            for (let index = 1; index <= current; index++) {
                buttonNext.click();
            }
        }
        if (buttonNextM) {  
            setTimeout(() => {
                for (let index = 1; index <= current; index++) {
                    buttonNextM.click();
                }
            }, 400);
        }

    }
}

//----Load all slider
function loadSliders(jQuery) {
    $('.backgrounds-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1500,
        fade: true,
        cssEase: 'ease-in-out',
    });
    $('.contact-wrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: false
    });
    $('.review-wrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });   
    $('.about-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });   
    $('.video-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
    });
    $('#slider-fade').slick({
        autoplaySpeed: 3000,
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        fade: true,
        cssEase: 'linear'
    });

}
//---unslick slider when PC
function reloadSlider() {
    if (window.innerWidth < 769) {
        jQuery('.contact-wrapper').slick('refresh');
    }
    else{
        jQuery('.contact-wrapper').slick('unslick');
    }
}

//------When click on button, scroll to top
function scrollToTop() {
    jQuery(document).on("click", ".scroll-to-top", function(e) {
        e.preventDefault();
        var top = 0;
        jQuery('body, html').animate({scrollTop: top}, 800); // scroll to top
    });
}

//-------Show mobile menu
function showMenu() {
    const burger = document.querySelector(".burger");
    const header = document.querySelector('header');
    const body = document.querySelector('body');
    burger.addEventListener('click', function() {
        header.classList.toggle("show");
        body.classList.toggle('no-scroll');
    })
}

//-------Changed current sity
function clickOnMapIco() {
    const adressWrapper = document.querySelector("header .inputs-wrapper");
    const ico = adressWrapper.querySelector('.adress-ico');
    const dropdownsItems = adressWrapper.querySelectorAll('.dropdown-list li');
    ico.addEventListener('click', function() {
        adressWrapper.classList.toggle('hidden');
    })
    for (let index = 0; index < dropdownsItems.length; index++) {
        const element = dropdownsItems[index];
        element.addEventListener('click', function() {
            for (let index = 0; index < dropdownsItems.length; index++) {
                const item = dropdownsItems[index];
                item.classList.remove('active');
            }
            element.classList.add('active');
            adressWrapper.classList.add('hidden');
            localStorage.setItem('location', index);
            changeMenuLocation();
        })   
    }
}

//----location current
function currentLocation() {
    if (!localStorage.getItem('location') || localStorage.getItem('location') == 'null') {
        var request = new XMLHttpRequest();
        var arr, lat, long, lenght, id;
        const adressWrapper = document.querySelector("header .inputs-wrapper");
        const dropdownsItems = adressWrapper.querySelectorAll('.dropdown-list li');
        request.open('GET', 'https://api.ipdata.co/?api-key=e595a04ee508fa04063c682827b921725648cb10b610a209c679dc8e');
        request.setRequestHeader('Accept', 'application/json');
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                arr = JSON.parse(this.responseText);
                lat = arr.latitude;
                long = arr.longitude;
            }    
            //----calculate the distance from point to point
            const citys = document.querySelectorAll('header .dropdown-list li');
            for (let index = 0; index < citys.length; index++) {
                let sum;
                const element = citys[index];
                const elementLat = Number(element.dataset.lat);
                const elementLong = Number(element.dataset.long);
                sum = Math.sqrt(Math.pow((elementLat - lat), 2) + Math.pow((elementLong - long), 2));
                if (index == 0) {
                    lenght = sum;
                    id = index;
                }
                if (sum < lenght) {
                    lenght = sum;
                    id = index;
                }
            }
            //---changed active item sity
            if (adressWrapper) {
                for (let index = 0; index < dropdownsItems.length; index++) {
                    const element = dropdownsItems[index];
                    if (index == id) {
                        for (let index = 0; index < dropdownsItems.length; index++) {
                            const item = dropdownsItems[index];
                            item.classList.remove('active');
                        }
                        element.classList.add('active');
                        adressWrapper.classList.add('hidden');
                        localStorage.setItem('location', index);
                    }
                }   
                changeMenuLocation();
            }
        };
        request.send();
    }
    else{
        const id = Number(localStorage.getItem('location'));
        const adressWrapper = document.querySelector("header .inputs-wrapper");
        const dropdownsItems = adressWrapper.querySelectorAll('.dropdown-list li');
        if (adressWrapper) {
            for (let index = 0; index < dropdownsItems.length; index++) {
                const element = dropdownsItems[index];
                if (index == id) {
                    for (let index = 0; index < dropdownsItems.length; index++) {
                        const item = dropdownsItems[index];
                        item.classList.remove('active');
                    }
                    element.classList.add('active');
                    adressWrapper.classList.add('hidden');
                    localStorage.setItem('location', index);
                }
            }   
            changeMenuLocation();
            slicktoGo();
        }
    }        
}

//------Show welcome popup
function ShowPopup() {
    const popup = document.querySelector('.welcome-popup');
    const closeBtn = popup.querySelector('.close');
    const body = document.querySelector('body');
    const date = new Date();
    const dayToday = date.getDate();

    //take current date and show popup if today not visited website
    if (dayToday != localStorage.getItem("date")) {
        popup.classList.remove('hidden');
        body.classList.add('no-scroll');
        localStorage.setItem('date', dayToday);
    }

    //hiden popup
    closeBtn.addEventListener('click', function() {
        popup.classList.add('hidden');
        body.classList.remove('no-scroll');
    })
    popup.addEventListener('click', function(event) {
        if (event.target.classList.contains("welcome-popup")) {
            popup.classList.add('hidden');
            body.classList.remove('no-scroll');   
        }
    })
}

//----Acordeon on menu
function acordeon() {
    const dishesWrapper = document.querySelectorAll('.dishes .dishes-tab');
    if (dishesWrapper.length != 0) {
        for (let index = 0; index < dishesWrapper.length; index++) {
            const acordeonItem = dishesWrapper[index];
            const buttonMore = acordeonItem.querySelector('.button-more');
            const tabTitle = acordeonItem.querySelector('.tab-title');
            const buttonClose = acordeonItem.querySelector('.button-close');
            const content = acordeonItem.querySelector('.tab-content');
            tabTitle.addEventListener('click', function() {
                let minus;
                if (index == 0) {
                    minus = 60;
                }
                else{
                    minus = 20;
                }
                let headerHeight = document.querySelector('header').clientHeight;
                const rect = tabTitle.getBoundingClientRect(),
                      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let top = rect.top + scrollTop - headerHeight + minus;

                if (acordeonItem.classList.contains('hidden')) {
                    jQuery('body, html').animate({scrollTop: top}, 500); // scroll to top
                    setTimeout(() => {
                        tabTitle.classList.remove("big");
                    }, 600);
                    setTimeout(() => {
                        const height = content.scrollHeight + 40;
                        content.style.height = height + "px";
                        acordeonItem.classList.remove('hidden');
                        buttonMore.classList.add('rotate');
                    }, 1300);
                }
                
                else{
                    content.style.height = "0px";
                    acordeonItem.classList.add('hidden');
                    buttonMore.classList.remove('rotate');
                    setTimeout(() => {
                        tabTitle.classList.add("big");
                    }, 1100);
                    setTimeout(() => {
                        jQuery('body, html').animate({scrollTop: top}, 500); // scroll to top 
                    }, 1600);
                }

            })
            if (buttonClose) {
                buttonClose.addEventListener('click', function() {
                    let headerHeight = document.querySelector('header').clientHeight;
                    const rect = tabTitle.getBoundingClientRect(),
                          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    let minus;
                    if (index == 0) {
                        minus = 60;
                    }
                    else{
                        minus = 20;
                    }
                    let top = rect.top + scrollTop - headerHeight + minus;
                    
                    jQuery('body, html').animate({scrollTop: top}, 500); // scroll to top
                    setTimeout(() => {
                        tabTitle.classList.add("big");
                    }, 600);
                    setTimeout(() => {                    
                        acordeonItem.classList.add('hidden');
                        content.style.height = "0px";
                        buttonMore.classList.remove('rotate');
                    }, 1100);  
                })
            }
        }
    }
}

//----down brightness on slider when change scroll
function downBrightnes() {
    const main = document.querySelector('.main-window');
    if (main) {
        const height = main.clientHeight;
        const scroll = window.pageYOffset;
        let percent;
        percent = (scroll / height) * 100;
        percent = 100 - percent;
        main.style.filter = "brightness(" + percent + "%)";
        if (percent < 0) {
            main.classList.add('hidden');
        }
        else{
            main.classList.remove('hidden');
        }
    }
}

//---custom select
function customSelect() {
    const selectsWrapper = document.querySelectorAll('.custom-select');
    if (selectsWrapper.length != 0) {
        for (let index = 0; index < selectsWrapper.length; index++) {
            //custom select
            const element = selectsWrapper[index];
            //select in wrapper
            const select = element.querySelector('select');
            let value = select.value;
            //---index current value
            let currentIndex;
            //added current value
            element.insertAdjacentHTML('afterbegin', value);
            //option in select
            const options = select.querySelectorAll('option');
            //wrapper item double select
            const selectWrapper = element.querySelector('.select-items');
            //copy otion to item
            for (let inde = 0; inde < options.length; inde++) {
                const option = options[inde];
                let item;
                if (select.value == option.value) {
                    currentIndex = inde;
                }
                if (currentIndex == inde) {
                    item = "<p class='item active'>" + option.value + "</p>";
                }
                else{
                    item = "<p class='item'>" + option.value + "</p>";
                }
                selectWrapper.insertAdjacentHTML('beforeEnd', item);
            }
        
            //---show fropdown list
            element.addEventListener('click', function(e) {
                e.stopPropagation();
                selectWrapper.classList.toggle('show');
            })

            //---list item
            const itemList = selectWrapper.querySelectorAll('.item');
            for (let index = 0; index < itemList.length; index++) {
                const item = itemList[index];
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    for (let index = 0; index < itemList.length; index++) {
                        const item = itemList[index];
                        item.classList.remove('active');
                    }
                    item.classList.add('active');
                    changedSelect(element, index);
                    selectWrapper.classList.remove('show');
                })
            }
        }
    }
}

//changed current select
function changedSelect(wrapSelect, id) {
    const select = wrapSelect.querySelector("select");
    const options = select.querySelectorAll('option');
    select.value = options[id].value;
    let value = select.value;
    wrapSelect.removeChild(wrapSelect.firstChild);
    wrapSelect.insertAdjacentHTML('afterbegin', value);
}

//click overflow select
jQuery(document).mouseup(function (e) {
    var container = jQuery(".custom-select");
    if (container.has(e.target).length === 0){
        for (let index = 0; index < container.length; index++) {
            const element = container[index];
            const selectWrapper = element.querySelector('.select-items');
            selectWrapper.classList.remove('show');
        }
    }
});


//When window resize chenged block size
function resizeAcordeon() {
    const tabs = document.querySelectorAll('.dishes-tab');
    if (tabs.length != 0) {
        for (let index = 0; index < tabs.length; index++) {
            const element = tabs[index];
            if (!element.classList.contains("hidden")) {
                const content = element.querySelector('.tab-content');
                const height = content.scrollHeight;
                content.style.height = content.scrollHeight + "px";
            }
        }
    }
}

//------When click on button, scroll to top
function scrollToSeeSides() {
    jQuery(document).on("click", "#linkSides", function(e) {
        e.preventDefault();
        const sides = document.querySelector("#sides");
        sides.querySelector(".tab-title").click();
    });
}

//resize video
function resizeVideo() {
    // const catering = document.querySelector(".catering-menu");
    // if (catering) {
    //     const video = catering.querySelector('iframe');
    //     let height;
    //     height = video.clientWidth / 1.77;
    //     video.style.height = height + 'px';
    // }

    const catering = document.querySelector(".main-window-half");
    if (catering) {
        const video = catering.querySelector('.video');
        if (video) {
            let height;
            height = video.clientWidth / 1.77;
            video.style.height = height + 'px';
            catering.style.height = height + 'px';
        }
    }

    /*
    const videos = document.querySelectorAll('.about-video .video-item');
    if (videos.length != 0) {
        for (let index = 0; index < videos.length; index++) {
            const element = videos[index];
            const height = element.clientWidth / 1.77;
            element.style.height = height + 'px';
        }
    }
    */
}

//resize happyHour image
function resizeImageHapyy() {
    const fullWindow = document.querySelector('.main-window-half.full');
    if (fullWindow) {
        let height = window.innerWidth / 1.7;
        fullWindow.style.height = height + "px";
    }
}

//Open wine section when url have #wine
function hrefWine() {
    const href = window.location.href; 
    if (href.slice(-4) == "wine") {
        setTimeout(() => {
            document.querySelector(".tab-title").click();
            setTimeout(() => {
                let headerHeight = document.querySelector('header').clientHeight;
                const rect = document.querySelector("#wine").getBoundingClientRect(),
                      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const top = rect.top + scrollTop - headerHeight + 20;
                jQuery('body, html').animate({scrollTop: top}, 1000);
            }, 3000);
        }, 1000);
    }
}

//Open section when page have id and url have it #id
function hrefMenu() {
    const href = window.location.href;
    const tabs = document.querySelectorAll(".dishes-tab");
    let idList = [], k = 0;
    if (tabs.length != 0) {
        for (let index = 0; index < tabs.length; index++) {
            const element = tabs[index];
            idList.push(element.id);
        }
        for (let index = 0; index < idList.length; index++) {
            const element = idList[index];
            const lenghtElement = "-" + element.length;
            if (element == href.slice(lenghtElement)) {
                document.querySelectorAll('.tab-title')[index].click();
                k = k + 1;       
            }
        }
        /*if (k == 0) {
            const menuSecond = tabs[1].querySelector(".tab-title");
            //console.log(menuSecond);
            setTimeout(() => {
                menuSecond.click();
            }, 500); 
        }*/
    }
    hrefWine();
}

//change menu when another location
function changeMenuLocation() {
    const dates = document.querySelectorAll('.card .date-wrapper .date');
    if (dates.length != 0) {
        const adressList = document.querySelectorAll('.inputs-wrapper .dropdown-list li');
        let currentActive;
        //take current location
        for (let index = 0; index < adressList.length; index++) {
            const element = adressList[index];
            if (element.classList.contains("active")) {
                currentActive = index;
            }
        }

        //change current location on menu 
        for (let index = 0; index < dates.length; index++) {
            const element = dates[index];
            if (currentActive != index) {
                element.classList.remove('active');
            }
            else{
                element.classList.add('active');
            }
        }

    }

    //Open menu list
    const adress = document.querySelectorAll('.card .date-wrapper .date .adress');
    if (adress.length != 0) {
        const wrapperAdress = document.querySelector("header .inputs-wrapper");
        for (let index = 0; index < adress.length; index++) {
            const element = adress[index];
            element.addEventListener('click', function() {
                wrapperAdress.classList.remove('hidden');
            })
        }
    }
}

//Of full screen on Video
function ofFullScrenn() {
    console.log("work");
    document.cancelFullscreen();
    document.webkitCancelFullscreen();
    document.mozCancelFullScreen();
}

// mask();
// function mask() {
//     ///For mask
// // jQuery Mask Plugin v1.14.16
// // github.com/igorescobar/jQuery-Mask-Plugin
// var jQueryjscomp=jQueryjscomp||{};jQueryjscomp.scope={};jQueryjscomp.findInternal=function(a,n,f){a instanceof String&&(a=String(a));for(var p=a.length,k=0;k<p;k++){var b=a[k];if(n.call(f,b,k,a))return{i:k,v:b}}return{i:-1,v:void 0}};jQueryjscomp.ASSUME_ES5=!1;jQueryjscomp.ASSUME_NO_NATIVE_MAP=!1;jQueryjscomp.ASSUME_NO_NATIVE_SET=!1;jQueryjscomp.SIMPLE_FROUND_POLYFILL=!1;
// jQueryjscomp.defineProperty=jQueryjscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,n,f){a!=Array.prototype&&a!=Object.prototype&&(a[n]=f.value)};jQueryjscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};jQueryjscomp.global=jQueryjscomp.getGlobal(this);
// jQueryjscomp.polyfill=function(a,n,f,p){if(n){f=jQueryjscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var k=a[p];k in f||(f[k]={});f=f[k]}a=a[a.length-1];p=f[a];n=n(p);n!=p&&null!=n&&jQueryjscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:n})}};jQueryjscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,f){return jQueryjscomp.findInternal(this,a,f).v}},"es6","es3");
// (function(a,n,f){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports&&"undefined"===typeof Meteor?module.exports=a(require("jquery")):a(n||f)})(function(a){var n=function(b,d,e){var c={invalid:[],getCaret:function(){try{var a=0,r=b.get(0),h=document.selection,d=r.selectionStart;if(h&&-1===navigator.appVersion.indexOf("MSIE 10")){var e=h.createRange();e.moveStart("character",-c.val().length);a=e.text.length}else if(d||"0"===d)a=d;return a}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c=
// b.get(0);if(c.setSelectionRange)c.setSelectionRange(a,a);else{var g=c.createTextRange();g.collapse(!0);g.moveEnd("character",a);g.moveStart("character",a);g.select()}}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},
// 100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){f===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){f=c.val()}).on("focus.mask",function(b){!0===e.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){e.clearIfNotMatch&&!k.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,e,t,f=0;f<d.length;f++)(b=l.translation[d.charAt(f)])?(c=b.pattern.toString().replace(/.{1}jQuery|^.{1}/g,""),e=b.optional,
// (b=b.recursive)?(a.push(d.charAt(f)),t={digit:d.charAt(f),pattern:c}):a.push(e||b?c+"?":c)):a.push(d.charAt(f).replace(/[-\/\\^jQuery*+?.()|[\]{}]/g,"\\jQuery&"));a=a.join("");t&&(a=a.replace(new RegExp("("+t.digit+"(.*"+t.digit+")?)"),"(jQuery1)?").replace(new RegExp(t.digit,"g"),t.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);
// c=b}else c=b[c]();return c},calculateCaretPosition:function(a){var d=c.getMasked(),h=c.getCaret();if(a!==d){var e=b.data("mask-previus-caret-pos")||0;d=d.length;var g=a.length,f=a=0,l=0,k=0,m;for(m=h;m<d&&c.maskDigitPosMap[m];m++)f++;for(m=h-1;0<=m&&c.maskDigitPosMap[m];m--)a++;for(m=h-1;0<=m;m--)c.maskDigitPosMap[m]&&l++;for(m=e-1;0<=m;m--)c.maskDigitPosMapOld[m]&&k++;h>g?h=10*d:e>=h&&e!==g?c.maskDigitPosMapOld[h]||(e=h,h=h-(k-l)-a,c.maskDigitPosMap[h]&&(h=e)):h>e&&(h=h+(l-k)+f)}return h},behaviour:function(d){d=
// d||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,l.byPassKeys)){e=c.getMasked();var h=c.getCaret(),g=b.data("mask-previus-value")||"";setTimeout(function(){c.setCaret(c.calculateCaretPosition(g))},a.jMaskGlobals.keyStrokeCompensation);c.val(e);c.setCaret(h);return c.callbacks(d)}},getMasked:function(a,b){var h=[],f=void 0===b?c.val():b+"",g=0,k=d.length,n=0,p=f.length,m=1,r="push",u=-1,w=0;b=[];if(e.reverse){r="unshift";m=-1;var x=0;g=k-1;n=p-1;var A=function(){return-1<
// g&&-1<n}}else x=k-1,A=function(){return g<k&&n<p};for(var z;A();){var y=d.charAt(g),v=f.charAt(n),q=l.translation[y];if(q)v.match(q.pattern)?(h[r](v),q.recursive&&(-1===u?u=g:g===x&&g!==u&&(g=u-m),x===u&&(g-=m)),g+=m):v===z?(w--,z=void 0):q.optional?(g+=m,n-=m):q.fallback?(h[r](q.fallback),g+=m,n-=m):c.invalid.push({p:n,v:v,e:q.pattern}),n+=m;else{if(!a)h[r](y);v===y?(b.push(n),n+=m):(z=y,b.push(n+w),w++);g+=m}}a=d.charAt(x);k!==p+1||l.translation[a]||h.push(a);h=h.join("");c.mapMaskdigitPositions(h,
// b,p);return h},mapMaskdigitPositions:function(a,b,d){a=e.reverse?a.length-d:0;c.maskDigitPosMap={};for(d=0;d<b.length;d++)c.maskDigitPosMap[b[d]+a]=1},callbacks:function(a){var g=c.val(),h=g!==f,k=[g,a,b,e],l=function(a,b,c){"function"===typeof e[a]&&b&&e[a].apply(this,c)};l("onChange",!0===h,k);l("onKeyPress",!0===h,k);l("onComplete",g.length===d.length,k);l("onInvalid",0<c.invalid.length,[g,a,b,c.invalid,e])}};b=a(b);var l=this,f=c.val(),k;d="function"===typeof d?d(c.val(),void 0,b,e):d;l.mask=
// d;l.options=e;l.remove=function(){var a=c.getCaret();l.options.placeholder&&b.removeAttr("placeholder");b.data("mask-maxlength")&&b.removeAttr("maxlength");c.destroyEvents();c.val(l.getCleanVal());c.setCaret(a);return b};l.getCleanVal=function(){return c.getMasked(!0)};l.getMaskedVal=function(a){return c.getMasked(!1,a)};l.init=function(g){g=g||!1;e=e||{};l.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;l.byPassKeys=a.jMaskGlobals.byPassKeys;l.translation=a.extend({},a.jMaskGlobals.translation,e.translation);
// l=a.extend(!0,{},l,e);k=c.getRegexMask();if(g)c.events(),c.val(c.getMasked());else{e.placeholder&&b.attr("placeholder",e.placeholder);b.data("mask")&&b.attr("autocomplete","off");g=0;for(var f=!0;g<d.length;g++){var h=l.translation[d.charAt(g)];if(h&&h.recursive){f=!1;break}}f&&b.attr("maxlength",d.length).data("mask-maxlength",!0);c.destroyEvents();c.events();g=c.getCaret();c.val(c.getMasked());c.setCaret(g)}};l.init(!b.is("input"))};a.maskWatchers={};var f=function(){var b=a(this),d={},e=b.attr("data-mask");
// b.attr("data-mask-reverse")&&(d.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(d.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(d.selectOnFocus=!0);if(p(b,e,d))return b.data("mask",new n(this,e,d))},p=function(b,d,e){e=e||{};var c=a(b).data("mask"),f=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof d&&(d=d(b)),"object"!==typeof c||f(c.options)!==f(e)||c.mask!==d}catch(w){}},k=function(a){var b=document.createElement("div");a="on"+a;var e=a in b;e||(b.setAttribute(a,
// "return;"),e="function"===typeof b[a]);return e};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,f=c.watchInterval;c=d.watchInputs||c.watchInputs;var k=function(){if(p(this,b,d))return a(this).data("mask",new n(this,b,d))};a(this).each(k);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(k)},f));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);
// delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(f)};k={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,keyStrokeCompensation:10,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&
// k("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};k=a.jMaskGlobals=a.extend(!0,{},k,a.jMaskGlobals);k.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},k.watchInterval)},window.jQuery,window.Zepto);
// }