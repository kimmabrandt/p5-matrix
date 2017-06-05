
    var streams = [];
    var symbolSize = 21;


    ////--- SETUP FUNCTION ---////
    function setup() {
      createCanvas(
        window.innerWidth,
        window.innerHeight
      );
      background(0);
      var x = 0;
      // width / symbolSize to get the total amnt of streams
      for (var i = 0; i <= width / symbolSize; i++){
          var stream = new Stream();
          stream.generateSymbols(x, random(-1000, 0)); //each stream will have a diff x, and y will be random so streams are staggered
          // push stream into streams array
          streams.push(stream);
          // make each stream start right next to last one
          x += symbolSize;
      }
      textSize(symbolSize);
      ////for demonstration purposes @ the beginning - puts a single symbol on the page
      // symbol = new Symbol(
      //   width / 2,
      //   0,
      //   random(5, 10)
      // );
      // symbol.setToRandomSymbol();
    }


    ////--- DRAW FUNCTION ---////
    //gets called repeatedly at 60fps
    function draw(){
      //re-draw background each frame
      //2nd value is opacity (255 is most opaque)
      background(0, 150);

      //loop thru all streams and render all at once
      //forEach on the streams array
      streams.forEach(function(stream) {
          stream.render();
      });
    }



    ////--- SYMBOL CLASS ---////
    function Symbol(x, y, speed, first, opacity, color) {
      this.x = x;
      this.y = y;
      this.value;
      this.speed = speed;
      this.first = first; //first symbol
      this.opacity = opacity;
      this.color = color;
      this.switchInterval = round(random(2, 25));

      // switches from one character to another
      this.setToRandomSymbol = function() {
        // conditional
        //frameCount built into p5.js - keeps running tally of how many frames
        //have passed thus far
        //when switchInterval divides evenly into frameCount, set it to 0
        //and then set a new symbol
        if (frameCount % this.switchInterval == 0) {
          this.value = String.fromCharCode(
            0x30A0 + round(random(0, 96))
          );
        }

      }


      this.rain = function(){
        //if it is, then set it = 0, otherwise increment y with seed
        this.y = (this.y >= height) ? 0 : this.y += this.speed;

        //this is the same as the above nicer looking code
        // if (this.y >= height) {
        //   this.y = 0;
        // } else {
        //   this.y += this.speed;
        // }
      }
    }

    function Stream() {
      var color = round(random(0, 3));

      this.symbols = [];
      //make a range so each stream has a diff amnt of symbols
      this.totalSymbols = round(random(5, 35));
      this.speed = random(5, 20);

      this.generateSymbols = function(x, y) {
        //get a random number 0 or 1. evaluate if equal to 1
        //1 in 4 chance
        var opacity = 255;
        var first = round(random(0, 4)) == 1;

        for (var i = 0; i <= this.totalSymbols; i++) {
          //every iteration create a new symbol
          symbol = new Symbol(x, y, this.speed, first, opacity, color);
          symbol.setToRandomSymbol();
          //push each symbol into symbol array
          this.symbols.push(symbol);
          //y is decremented, so each symbol is stacked on top of the next (in a line)
          opacity -= (255 / this.totalSymbols);
          y -= symbolSize;
          first = false;
        }
      }

      // display each symbol on canvas after creating it. the stream renders the symbols instead of each symbol rendering iteself
      this.render = function() {
        this.symbols.forEach(function(symbol) {
            //make first symbol white
            if (symbol.first) {
                fill(180, 255, 180, symbol.opacity);
            } else if (symbol.color == 1) {
                fill(255,74,220, symbol.opacity);
                //previous fill: 0, 185, 70 // 0, 255, 70
            } else if (symbol.color == 2) {
                fill(0,255,236, symbol.opacity);
            } else {
                fill(90,255,170, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y); //this changes to symbol bc we are iterating over symbol
            symbol.rain();
            symbol.setToRandomSymbol();
        });
      }




    }
