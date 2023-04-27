var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(150).fadeIn(150); 
    playSound(userChosenColor);
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 150);
}

$(document).keydown(function(){
if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else{
        $(document).click(function(){
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        })
    }
}

function startOver(){
    level = 0;
    started = false;
}