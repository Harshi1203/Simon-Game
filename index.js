// alert("fhksjshfkfh");
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).on("keypress",function(event){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=(Math.floor(Math.random()*4));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").click(function(){
    userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    var now=$("#"+currentColour);
    now.addClass("pressed");
    setTimeout(function(){
        now.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }
    else{
        playSound("wrong");
        var now=$("body");
        now.addClass("game-over");
        setTimeout(function(){
            now.removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}