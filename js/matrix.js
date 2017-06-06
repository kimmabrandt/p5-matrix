
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
      for (var i = 0; i <= width / symbolSize; i++){
          var stream = new Stream();
          stream.generateSymbols(x, random(-1000, 0));
          streams.push(stream);
          x += symbolSize;
      }
      textSize(symbolSize);
      // rectangle and text scale from the center
      textAlign(CENTER, CENTER);
      rectMode(CENTER);
    }


    ////--- DRAW FUNCTION ---////
    function draw(){
      background(0, 150);
      streams.forEach(function(stream) {
          stream.render();
      });
      drawTitleText();
    }


    ////--- SYMBOL CLASS FUNCTION ---////
    function Symbol(x, y, speed, first, opacity, color) {
      this.x = x;
      this.y = y;
      this.value;
      this.speed = speed;
      this.first = first;
      this.opacity = opacity;
      this.color = color;
      this.switchInterval = round(random(2, 25));

      this.setToRandomSymbol = function() {
          var charType = round(random(0, 3));
          if (frameCount % this.switchInterval == 0) {
              if (charType > 1) {
                  this.value = String.fromCharCode(
                    0x30A0 + round(random(0, 96))
                  );
              } else {
                  this.value = String.fromCharCode(
                      0x22B0 + round(random(0, 96))
                  );
              }
        }
      }

      this.rain = function(){
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
      }
    }


    ////--- STREAM FUNCTION ---////
    function Stream() {
      var color = round(random(0, 3));
      this.symbols = [];
      this.totalSymbols = round(random(5, 35));
      this.speed = random(5, 20);

      this.generateSymbols = function(x, y) {
        var opacity = 255;
        var first = round(random(0, 4)) == 1;

        for (var i = 0; i <= this.totalSymbols; i++) {
          symbol = new Symbol(x, y, this.speed, first, opacity, color);
          symbol.setToRandomSymbol();
          this.symbols.push(symbol);
          opacity -= (255 / this.totalSymbols);
          y -= symbolSize;
          first = false;
        }
      }

      this.render = function() {
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(180, 255, 180, symbol.opacity);
            } else if (symbol.color == 1) {
                fill(255,74,220, symbol.opacity);
            } else if (symbol.color == 2) {
                fill(0,255,236, symbol.opacity);
            } else {
                fill(90,255,170, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
      }
    }
    

    ////--- TITLE TEXT FUNCTION ---////
    function drawTitleText() {
      push();
      translate(width/2, height/2);

      // outer rect
      strokeWeight(1);
      stroke(178,255,255);
      noFill();
      rect(0, 0, 520, 110);

      // rectangle
      strokeWeight(1);
      stroke(178,255,255);
      fill(0);
      rect(0, 0, 500, 90);

      // text/title
      fill(178, 255, 255);
      noStroke();
      textFont('UnifrakturMaguntia');
      textSize(48);
      text('⟢⟁ Kim Shadiest ⟁⟣', 0, 0);
      pop();

    };
