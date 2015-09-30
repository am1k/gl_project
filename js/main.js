var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
    ]

};

BrowserDetect.init();


if(BrowserDetect.browser === 'Explorer' || BrowserDetect.browser === 'MS Edge'){
    document.querySelector('#ui-svg').removeAttribute('data');
    document.querySelector('#ui-svg').setAttribute('data', 'img/svg/ui_design_ie.svg');
}

var options = {
    useEasing : true,
    useGrouping : true,
    separator : ',',
    decimal : '.',
    prefix : '',
    suffix : ''
};
var project = new CountUp("project", 0, 236, 0, 1.4, options);

var pixel = new CountUp("pixels", 0, 1.1, 1, 2, options);

var hours = new CountUp("hours", 0, 2.4, 1, 1.8, options);


document.querySelector('.opener-btn').addEventListener('click', function(){
    document.querySelector('.top-head').classList.toggle('mobile-nav');
    if(document.querySelector('.top-head').classList.contains('mobile-nav')){
        document.querySelector('.top-head.mobile-nav nav').style.height = heightScreen + "px"
    } else {
        document.querySelector('.top-head nav').style.height = empty
    }
});

var mainBlock = document.querySelector('.our-work'),
    infoBlock = document.querySelector('.info-wrapper'),
    mapUkraine = document.querySelector('.contact-information'),
    header = document.querySelector('header'),
    sceneBlock = document.querySelector('.scene'),
    screenHeight = document.documentElement,
    empty = '0px',
    heightScreen = screenHeight.clientHeight,
    heightHeader = header.offsetHeight;

function recalculate(){
    header.style.minHeight = heightScreen + "px";
    sceneBlock.style.minHeight = heightScreen + "px";
    animationBlockHeight = mainBlock.offsetHeight,
    infoAnimateBlockHeight = infoBlock.offsetHeight,
    mapUkraineHeight = mapUkraine.offsetHeight,
    heightScreen,
    distanceToBlock = mainBlock.offsetTop,
    infoDistanceToBlock = infoBlock.offsetTop,
    mapUkraineToBlock = mapUkraine.offsetTop,
    infoStartAnimation =  infoDistanceToBlock + infoAnimateBlockHeight/2,
    mapUkraineAnimation = mapUkraineToBlock + mapUkraineHeight/2,
    startAnimation = distanceToBlock + animationBlockHeight/2;
}

function debounce(fn, delay){
    var timer;

    return function(){
        clearTimeout(timer);

        timer = setTimeout(function(){
            fn.apply(null);
        }, delay);
    };
}
recalculate();

window.addEventListener('resize', debounce(recalculate, 200));
window.addEventListener('scroll', function(){
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(scrolled + heightScreen > startAnimation) {
        project.start();
        pixel.start();
        hours.start();
    }
});

var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

function once(fn) {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            return fn.apply(this, arguments)
        }
    }
}

var startMainLogo = function(){
    var self = document.querySelector('object#logo');
    Array.prototype.forEach.call(self.contentDocument.querySelector('svg').querySelectorAll('animateTransform'), function(animate){
            animate.beginElement();
})};

window.addEventListener('load', setTimeout(startMainLogo, 1500));



var startAnimate = once(function(){
    var self = document.querySelectorAll('object');
    for(var i=1; i<self.length-1; i++){
        Array.prototype.forEach.call(self[i].contentDocument.querySelector('svg').querySelectorAll('animate, animateTransform'), function(animate){
            if(!animate.hasAttribute('animation')) {
                animate.beginElementAt(animate.getAttribute('time'));
            }
        });
    }
});

var startMap = once(function(){
    var self = document.querySelector('object#map');
    Array.prototype.forEach.call(self.contentDocument.querySelector('svg').querySelectorAll('animate'), function(animate){
        if(!animate.hasAttribute('animation')) {
            animate.beginElement();
        }
    });
});

function checkViewAreaAnimate(){
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(flag && (scrolled + heightScreen >= infoStartAnimation) && (scrolled + heightScreen) <= infoStartAnimation + heightScreen/2) {
        startAnimate();
    }
}

function checkViewAreaMap(){
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(flag && (scrolled + heightScreen >= mapUkraineAnimation) && (scrolled + heightScreen) <= mapUkraineAnimation + heightScreen) {
        startMap();
    }
}

var objArray = document.querySelectorAll('object');

var flag = false;

var icons = Promise.all(Array.prototype.map.call(objArray, function(item){
    return new Promise(function(resolve, reject){
        item.addEventListener('load', function(){
            resolve(item);
            reject(new Error("Error"));
        });
    });
})).then(function(){
    flag = true;
    checkViewAreaAnimate();
    checkViewAreaMap();
});

function responsiveStart(){
    if(document.body.clientWidth > 767){
        window.addEventListener('scroll', function () {
            checkViewAreaAnimate();
            checkViewAreaMap();
        });
    } else {
        document.querySelector('#ux-design').removeAttribute('data');
        document.querySelector('#ux-design').setAttribute('data', 'img/svg/ux_design_mobile.svg');
    }
}

responsiveStart();
