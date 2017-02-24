$( document ).ready(function() {

  $(document).foundation();

  //HAMBURGER NAVIGATION
  document.querySelector( "#nav-toggle" ).addEventListener( "click", function() {
      this.classList.toggle( "active" );
      $('.nav-link').toggleClass('show');
      $('.icon-link').toggleClass('show');    
      $('.top-left__corner').toggleClass('shrink-height');
      $('.bottom-right__corner').toggleClass('shrink-width');
  });

// fix menu style jump
  $('.menu-link').delay( 800 ).fadeIn( 400 );
  console.log('test');


  var nextUrlModule = (function(){


    //NEXT PAGE ARROW
    var origin = window.location.origin;
    var currentPathName = window.location.pathname;

    var index = origin + '/index.html';
    var work = origin + '/work.html';
    var about = origin + '/about.html';
    var contact = origin + '/contact.html';

    switch(currentPathName) {
      case '/index.html':
        
        $('.nav-arrow').attr('href', work )

    }

  })();


 // Animate for hover
 function animationHover(element, animation){
     element = $(element);
     element.hover(
         function() {
             element.addClass('animated ' + animation);        
         },
         function(){
             //wait for animation to finish before removing classes
             window.setTimeout( function(){
                 element.removeClass('animated ' + animation);
             }, 2000);         
         });
 }

 $(document).ready(function(){
     $('.js-bounce').each(function() {
         animationHover(this, 'jello');
     });
 });
  

//////SLICK SLIDER 

// Basic initialization is like this:
// $('.your-class').slick();

// I added some other properties to customize my slider
// Play around with the numbers and stuff to see
// how it works.
$('.slick-carousel').slick({
  infinite: true,
  slidesToShow: 1, // Shows a three slides at a time
  slidesToScroll: 1, // When you click an arrow, it scrolls 1 slide at a time
  arrows: true, // Adds arrows to sides of slider
  dots: false // Adds the dots on the bottom
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
      bg: {r:0,g:0,b:0},
      // bg: {r:200,g:200,b:200},
      matter: [
        {r:50,g:50,b:50}, 
        {r:100,g:100,b:100}
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
          // TweenMax.to($navDot, 0.35, {scale: 1, color: 0xFFFFFF});
          // TweenMax.to($('#item_' + activeID), 0.35, {scale: 1.5, backgroundColor: 'transparent',color: 0xCC0000});
      
      //
      if(activeID === 0) {
        // console.log('activeID if === 0',activeID);
        $arrowPrev.fadeOut();
      } else {
        // console.log('activeID else ',activeID);
        $('#text_'+activeID).fadeIn(1000);
          $arrowPrev.fadeIn();
      }
      
      if(activeID + 1 == carousel_count) {
        // console.log('activeID +1 =count',activeID);
        // console.log('carousel_count',carousel_count);
        $arrowNext.fadeOut();
      } else {
        $('#text_'+activeID).fadeIn(1000);
        //add description/button class to show and hide active_id -1 class
        
        // console.log($('#text_'+activeID));
        // console.log('else activeID', activeID);
        $arrowNext.fadeIn();
      }

    }
      
      //
      function updateDirections() {
          swipeDir = this.getDirection("start");
      }
      
    //$itemArrow.click(function() {
    $itemArrow.on('click', function() {
      
      if(Modernizr.touch) return;
      
      if($(this).hasClass('item_next')) {activeID++;
      navigateSlide();}
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
          $('#text_'+activeID).fadeIn(1400);
      
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

    $('.modal_link').click(function(){
        var parentID = $(this).parent().attr("id");
        $(this).addClass('modal_'+parentID);
        $('#modal_container_'+parentID).css({opacity:1}, {position:absolute});
    });
  })();



/////// CIRCLE JS /////////
   var colors = {
       'pink': '#E1499A',
       'yellow': '#f0ff08',
       'green': '#47e495'
   };

   var color = colors.pink;

   var radius = 100;
   var border = 5;
   var padding = 30;
   var startPercent = 0;
   var endPercent = 0.85;


   var twoPi = Math.PI * 2;
   var formatPercent = d3.format('.0%');
   var boxSize = (radius + padding) * 2;


   var count = Math.abs((endPercent - startPercent) / 0.01);
   var step = endPercent < startPercent ? -0.01 : 0.01;

   var arc = d3.svg.arc()
       .startAngle(0)
       .innerRadius(radius)
       .outerRadius(radius - border);

   var parent = d3.select('div#content');

   var svg = parent.append('svg')
       .attr('width', boxSize)
       .attr('height', boxSize);

   var defs = svg.append('defs');

   var filter = defs.append('filter')
       .attr('id', 'blur');

   filter.append('feGaussianBlur')
       .attr('in', 'SourceGraphic')
       .attr('stdDeviation', '7');

   var g = svg.append('g')
       .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

   var meter = g.append('g')
       .attr('class', 'progress-meter');

   meter.append('path')
       .attr('class', 'background')
       .attr('fill', '#ccc')
       .attr('fill-opacity', 0.5)
       .attr('d', arc.endAngle(twoPi));

   var foreground = meter.append('path')
       .attr('class', 'foreground')
       .attr('fill', color)
       .attr('fill-opacity', 1)
       .attr('stroke', color)
       .attr('stroke-width', 5)
       .attr('stroke-opacity', 1)
       .attr('filter', 'url(#blur)');

   var front = meter.append('path')
       .attr('class', 'foreground')
       .attr('fill', color)
       .attr('fill-opacity', 1);

   var numberText = meter.append('text')
       .attr('fill', '#fff')
       .attr('text-anchor', 'middle')
       .attr('dy', '.35em');

   function updateProgress(progress) {
       foreground.attr('d', arc.endAngle(twoPi * progress));
       front.attr('d', arc.endAngle(twoPi * progress));
       numberText.text(formatPercent(progress));
   }

   var progress = startPercent;

   (function loops() {
       updateProgress(progress);

       if (count > 0) {
           count--;
           progress += step;
           setTimeout(loops, 10);
       }
   })();


///work slide hover

var randColorArray =['cb7330', '9b5424', 'c46220', '5bbfa0', '50a086', '10596B','a0c24e', '90a843'];

var blueColorArray =['6EBECE', '04738A', '10596B', '0E5767', '3D9FBE','047080', '0C638B', '106068', '1A737C', '57B9CF', '0B526C', '0F7F8A', '0B8898', '208899', '279AA6', '2A9AA6','1C8E78'];

    function randomFillColor(){
      var fillColor = randColorArray[Math.floor(Math.random() * randColorArray.length)+1];
      return fillColor;
    };

    function blueFillColor(){
      var fillColor = blueColorArray[Math.floor(Math.random() * blueColorArray.length)+1];
      return fillColor;
    };

    function randBlueTimer() {
        var $shape = $(".shape").eq([Math.floor(Math.random()*($(".shape").length))])
        //hover color changes not affected by random color changes
        if (!$( $shape[0] ).hasClass( "more-opacity" )) {
            $shape.css('fill', '#'+blueFillColor());
        }
        setTimeout(randBlueTimer, 50);            
    }
    randBlueTimer();

    // Changes to bright full-opacity colors and fades back to blue family colors//
    $(".shape").hover(function(){
      $(this).css('fill', '#'+randomFillColor());
      $(this).addClass("more-opacity").delay(1300).queue(function(next){
          $(this).removeClass("more-opacity");
          next();
         $(this).css('fill', '#'+blueFillColor());
        next();
      });
    })


});
