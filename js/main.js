// Variables
var questions = [];
var animationClass;
var times = 0;
var iteration = 2;

if (animation === magic || animation === space) animationClass = 'magictime';
if (animation === bounce || animation === zoom) animationClass = 'animated';

$.fn.extend({
    animateCss: function(animationName, t=null) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass(animationClass + ' ' + animationName).one(animationEnd, function() {
            $(this).removeClass(animationClass + ' ' + animationName);
            if(!t) $(this).hide();
        });
    }
});

window.onload = start();

// Methods
$.getJSON('questions.json', function (data) {
    if(lang == 'en'){
         data.en.forEach(function (item) {
             questions.push(item);
        });
     }else{
         data.gr.forEach(function (item) {
             questions.push(item);
        });
     }
 });

function start(){
    $('#logo').attr("src", "img/1.gif");
    $('#logo').show();
    $('#logo').animateCss('zoomIn',1);
    setTimeout(function(){
        animate();
    }, 2000);
}

function animate() {
        if (iteration < 5) {
            changeImg(iteration);
        } else {
            iteration = 1;
            $('#logo').animateCss(animation[getRandomInt(0, animation.length - 1)]);
            showQ();
        }
}

function changeImg(image) {
    setTimeout(function() {
        $('#logo').attr("src", "img/" + image + ".gif");
        $('#logo').show();
        iteration++;
        animate();
    }, time * 1000);
}

function showQ() {
    setTimeout(function() {
        $('#quote').html(getQuestion());
        $('#quote').show();
        setTimeout(function() {
            $('#quote').hide();
            $('#logo').hide();
            iteration = 1;
            start();
            times++;
        }, 5000);
    }, 3000);
}

function getQuestion() {
    if (times > questions.length - 1) times = 0;
    return questions[times];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
