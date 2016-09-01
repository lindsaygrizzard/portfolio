$(document).foundation();

//HAMBURGER NAVIGATION
document.querySelector( "#nav-toggle" ).addEventListener( "click", function() {
    this.classList.toggle( "active" );
    $('.nav-link').toggleClass('show');
    $('.icon-link').toggleClass('show');    
    $('.top-left__corner').toggleClass('shrink-height');
    $('.bottom-right__corner').toggleClass('shrink-width');
});


////// The following snippet was taken from a code pen created by Dean Wagman
////// See the original greatness at http://codepen.io/deanwagman/pen/EjLBdQ

// Little Canvas things
var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d');

// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration, Play with these
var config = {
  particleNumber: 40,
  maxParticleSize: 5,
  maxSpeed: 2,
  colorVariation: 4
};

// Colors
var colorPalette = {
    bg: {r:98,g:197,b:182},
    // bg: {r:200,g:200,b:200},
    matter: [
      {r:118,g:206,b:193}, 
      {r:137,g:203,b:193}
    ]
};

// Some Variables hanging out
var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    drawBg,

// Draws the background for the canvas, because space
drawBg = function (ctx, color) {
    ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
};

// Particle Constructor
var Particle = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height);
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize);
    // Color of the rock, given some randomness
    this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)],true );
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
    var r,g,b,a, variation;
    r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.r);
    g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.g);
    b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.b);
    a = Math.random() + .5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return {r,g,b,a};
    }
};

// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function (p) {
    var a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
    p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
    return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function (x, y, r, c) {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
};

// Remove particles that aren't on the canvas
var cleanUpArray = function () {
    particles = particles.filter((p) => { 
      return (p.x > -100 && p.y > -100); 
    });
};


var initParticles = function (numParticles, x, y) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }
    particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c);
    });
};

// That thing
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     function(callback) {
        window.setTimeout(callback, 1000 / 60);
     };
})();


// Our Frame function
var frame = function () {
  // Draw background first
  drawBg(ctx, colorPalette.bg);
  // Update Particle models to new position
  particles.map((p) => {
    return updateParticleModel(p);
  });
  // Draw em'
  particles.forEach((p) => {
      drawParticle(p.x, p.y, p.r, p.c);
  });
  // Play the same song? Ok!
  window.requestAnimFrame(frame);
};

// Click listener
document.body.addEventListener("click", function (event) {
    var x = event.clientX,
        y = event.clientY;
    cleanUpArray();
    initParticles(config.particleNumber, x, y);
});

// First Frame
frame();

// First particle explosion
initParticles(config.particleNumber);

//////// End of particles in space! ////////


/// AJAX PAGE LOAD //////
// $(".home-link").click(function(){
//     $( ".content-wrapper" ).load( "/index.html" );
// });

// $(".work-link").click(function(){
//     $( ".content-wrapper" ).load( "/work.html" );
// });

// $(".about-link").click(function(){
//     $( ".content-wrapper" ).load( "/about.html" );
// });

// $(".contact-link").click(function(){
//     $( ".content-wrapper" ).load( "/contact.html" );
// });

///////// TO DO: Replace above with REACT //////////////



////////////// start carousel ///////////////////

var carousel = (function () {
 
    //
    var activeID = 0,
        itemW = 940,
        carousel_count = $('.carousel_item').length,
        $carouselItems = $('.carousel_items'),
        $carouselItem = $('.carousel_item'),
        $arrowPrev = $('.item_prev'),
        $arrowNext = $('.item_next'),
    $itemArrow = $('.item_arrow'),
        $navDot,
    $navDots = $('.nav_dots'),
        swipeDir,
        slideSpeed = .95,
        slideMeth = Power2.EaseInOut;
    
    //
  function init() {
     
    $carouselItems.css({'width': (itemW * carousel_count + 20) + 'px'});
    $navDots.css({'width': (95 * carousel_count) + 'px'});
    $itemArrow.css({'opacity': .8});
    
    setupDraggable();
    setupDots();
    navigateSlide();
    }
  init();
    
    //
  function setupDraggable() { 
      
    Draggable.create($carouselItems, {
            type:'x',
            edgeResistance: 0.65,
            dragResistance: 0.0,
            bounds:'.carousel_container',
            onDrag:updateDirections,
            onThrowUpdate:updateDirections,
            throwProps:true,
            onDragStart:function(evt) {}
      });    
  };
                
  // set up dots
  function setupDots() {    
    for(var i = 0; i < carousel_count; i++) {
      $navDots.append('<div class="nav_dot" id="dot_' + i + '"></div>');
    }    
    $navDot = $('.nav_dot');
  }  
  
  // navigate slide
    function navigateSlide() {
        
        if(activeID >= carousel_count-1) activeID = carousel_count-1;
        if(activeID <= 0) activeID = 0;     
                        
        var xTarget = ((activeID * itemW) * -1);
        
        TweenMax.to($carouselItems, slideSpeed, {x: xTarget, ease: slideMeth, onComplete: slideDone});
    }
    
    function slideDone() {
        
        $navDot.css({backgroundColor: '#fff'});
    
    //
        TweenMax.to($navDot, .35, {scale: 1, color: 0xFFFFFF});
        TweenMax.to($('#dot_' + activeID), .35, {scale: 1.5, backgroundColor: 'transparent',color: 0xCC0000});
    
    //
    if(activeID == 0) {$arrowPrev.fadeOut()} 
    else {$arrowPrev.fadeIn()}
    
    if(activeID + 1 == carousel_count) {$arrowNext.fadeOut()}
    else {$arrowNext.fadeIn()}
    }
    
    //
    function updateDirections() {
        swipeDir = this.getDirection("start");
    }
    
  //$itemArrow.click(function() {
  $itemArrow.on('click', function() {
    
    if(Modernizr.touch) return;
    
    if($(this).hasClass('item_next')) {activeID++}
    else {activeID--};
    
    navigateSlide();
    });
  
  $itemArrow.on('touchstart', function() {
    if($(this).hasClass('item_next')) {activeID++}
    else {activeID--};
    
    navigateSlide();
    });
  
    $navDot.hover(      
        function() {            
            TweenMax.to($(this), .35, {scale: 1.5});
        }, function() {
             if($(this).attr('id').split('_')[1] == activeID) return;
           TweenMax.to($(this), .35, {scale: 1.0});
        }  
    );
    
  $navDot.click(function() {        
    var dotID = $(this).attr('id').split('_')[1];
        activeID = dotID;
            
      navigateSlide();      
    });
  
    //
    $carouselItem.mousedown(function() {        
        activeID = $(this).attr('id').split('_')[1];
    
    $(this).removeClass('grab');
    $(this).addClass('grabbing');
    
    });
  
  //   
  $carouselItem.mouseenter(function() {        
    $(this).removeClass('grabbing');
    $(this).addClass('grab');
  });

  $carouselItem.mouseup(function() {        
    $(this).removeClass('grabbing');
    $(this).addClass('grab');
  });  
  
})();


/////////////// end carousel ///////////////

