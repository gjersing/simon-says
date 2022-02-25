const buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  level++;
  $("#level-title").text("LEVEL " + level);

  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

  userClickedPattern = [];
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(color) {
  //$("#" + color).fadeOut(150).fadeIn(150);
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function startOver() {
  playSound("wrong");
  $(document.body).addClass("game-over");

  setTimeout(function() {
    $(document.body).removeClass("game-over");
  }, 200);

  $("#level-title").html("GAME OVER.<br>PRESS ANY KEY TO RESTART.");
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(clickIndex) {
  if (gamePattern[clickIndex] == userClickedPattern[clickIndex]) {
    playSound(gamePattern[clickIndex]);
  } else {
    startOver();
    return;
  }

  //Check if end of sequence
  if (!gamePattern[clickIndex+1]) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

$(".btn").click(function(event) {
  if (started) {
    var playerChosenColor = event.currentTarget.id;
    userClickedPattern.push(playerChosenColor);
    animatePress(playerChosenColor);
    checkAnswer(userClickedPattern.length-1);
  }
});

$(document).keypress(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});
