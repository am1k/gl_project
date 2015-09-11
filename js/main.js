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
            console.log(item);
            resolve(item);
            reject(new Error("Error"));
        });
    });
})).then(function(){
    flag = true;
    checkViewAreaAnimate();
    checkViewAreaMap();
});

window.addEventListener('scroll', function(){
    checkViewAreaAnimate();
    checkViewAreaMap();
});



//
//items.map(function(item){
//    var promise = new Promise();
//
//    item.addEventListener('load', function(){
//       promise.resolve();
//    });
//
//    return promise;
//});
