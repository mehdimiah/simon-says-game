
var toggle = 0
var level = 1;
var userClickedPattern = []
var gamePattern = []
var buttonColours = ["red" , "blue" , "green" , "yellow"]


$(document).keydown(function (event) {
    toggle++;
    if (toggle === 1) {
       nextSequence(); 
    }
    
})

function startOver() {
    level = 1
    gamePattern = []
    toggle = 0
}


$(".btn").click(function(event) {
    var userChosenColour = event.target.id
    animatePress(userChosenColour)
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    playSound(event.target.id)
    checkAnswer(userClickedPattern.length -1);
})


function checkAnswer (currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000)
        }


    }else {
        console.log("wrongs")
        var audio = new Audio("sounds/wrong.mp3");
        audio.play()

        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200)
        
        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();

    }

}

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    $("#level-title").text("Level "+level)
    level++; 
}




function playSound(name) {
  
var audio = new Audio("sounds/"+ name +".mp3")
audio.play();  

}

function animatePress(currentColour) {

    $(".btn." + currentColour).addClass("pressed")
    setTimeout(function () {
        $(".btn." + currentColour).removeClass("pressed")
    },100);


}
