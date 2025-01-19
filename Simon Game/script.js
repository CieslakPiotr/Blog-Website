var colours = ["green", "red", "yellow", "blue"];
var gameColours = [];
var userChoosenColours = [];
var level = 0;
var startGame = false;

$(document).keypress(function() {
    if (!startGame) {
        $("#level-title").text("Level " + level);
        nextSeqeunce();
        startGame = true;
    }
});

$(".btn").on("click", function() {
    var choosenColour = $(this).attr("id");
    userChoosenColours.push(choosenColour);
    playSound(choosenColour);
    animation(choosenColour);
    checkAnswers(userChoosenColours.length-1);
});

function checkAnswers(currentLevel) {
    if (gameColours[currentLevel] === userChoosenColours[currentLevel]) {
        console.log("success");

        if (userChoosenColours.length === gameColours.length) {
            setTimeout(function() {
                nextSeqeunce();
            }, 1000);
          } 
    } else {
        console.log("wrong"); 
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startAgain();
    }
};

function nextSeqeunce() { 
    userChoosenColours = [];

    level ++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //Generate random number
    var randomColour = colours[randomNumber]; //Choose random colour from an array

    gameColours.push(randomColour) //Add colour to the database

    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100); //Fading animation for a button with choosen randomn colour 

    playSound(randomColour);
}; 

function startAgain() {
    gameColours = [];
    level = 0;
    startGame = false;
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animation(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};
