var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var dino = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

dino.src = "assets/images/dino2.png";
bg.src = "assets/images/zy85SqV.gif";
fg.src = "";
pipeNorth.src = "assets/images/dinoegg.png";
pipeSouth.src = "assets/images/dinoegg2.png";

// some variables

var gap = 85;
var constant = pipeNorth.height + gap;

var bX = 50;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "";
scor.src = "";

// on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 25;
  fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;
    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // detect collision

    if (
      (bX + dino.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + dino.height >= pipe[i].y + constant)) ||
      bY + dino.height >= cvs.height - fg.height
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

  // ctx.drawImage(pipeNorth, 100, 0);
  // ctx.drawImage(pipeSouth, 100, 0 + constant);

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(dino, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

draw();
