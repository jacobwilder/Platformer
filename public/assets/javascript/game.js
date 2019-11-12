var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var collided = false;

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "assets/images/dino1.png";
bg.src = "assets/images/ozp.gif";
fg.src = "assets/images/fg.png";
pipeNorth.src = "assets/images/satellite.png";
pipeSouth.src = "assets/images/satellite.png";

// some variables

var gap = Math.floor(Math.random() * (150 - 100) + 100);
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files
var gameTheme = new Audio();
var fly = new Audio();
var scor = new Audio();

fly.src = "assets/sounds/flap.mp3";
scor.src = "assets/sounds/scoreup.wav";
gameTheme.src = "assets/sounds/theme.wav";
// on key down

document.addEventListener("keydown", moveUp);

function moveUp(event) {
  var x = event.keyCode;
  if (x == 38) {
    bY -= 35;
    fly.play();
    gameTheme.play();
    gameTheme.loop();
  }
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images

function draw() {
  debugger;
  ctx.drawImage(bg, 0, 0, 650, 512);
  ctx.clearRect(0, 0, 650, 512);


  for (var i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == cvs.width - 325) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // detect collision


    if (
      ((bX + bird.width >= pipe[i].x &&
          bX <= pipe[i].x + pipeNorth.width &&
          (bY <= pipe[i].y + pipeNorth.height ||
            bY + bird.height >= pipe[i].y + constant)) ||
        bY + bird.height >= cvs.height) && !collided
    ) {
      collided = true;
      $.ajax({
        method: "POST",
        url: "/api/leaderboards",
        data: {
          player: $("#player").val(),
          score: score
        }
      }).done(function () {

        location.reload(); // reload the page
      })
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }


  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Verdana";
  ctx.fillText("Player : " + $("#player").val(), 10, cvs.height - 40);
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}


$("#start").on("click", function () {
  $("#userInput").hide();
  draw();

})