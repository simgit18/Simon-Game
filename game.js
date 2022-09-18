
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColors = ["red","green","yellow","blue"];





jQuery(document).ready(function($){


    $(document).keypress(function() {
        if (!started) {
          $("#level-title").text("Level " + level);
          nextSequence();
          started = true;
        }
      });

      
                $(".btn").click(function(){
                    var userChosenColor = $(this).attr('id');
                    
                    userClickedPattern.push(userChosenColor);
                    animatePress(userChosenColor);
                    audioPLayer(userChosenColor);
                    
                    matchPattern(userClickedPattern.length-1);

                })


    // jQuery code is in here
    
    });

    function nextSequence(){


        userClickedPattern = [];
        level++;
        $("#level-title").text("Level "+level)

            var randomNumber = Math.floor(Math.random()*3) + 1;
            var chosenButton = buttonColors[randomNumber];

            audioPLayer(chosenButton);
            $("#" + chosenButton).fadeIn(100).fadeOut(100).fadeIn();
            gamePattern.push(chosenButton);

    }

    function audioPLayer(button){
        var audio = new Audio("sounds/" + button + ".mp3")
        audio.play();
    }

 
    function animatePress(button){
        $("#" + button).addClass("pressed");
        setTimeout(function(){$("#"+button).removeClass("pressed")}, 100);


    }

    function matchPattern(currentLevel){
        console.log(gamePattern+" \n"+userClickedPattern)
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

            console.log("success");
      
            //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
            if (userClickedPattern.length === gamePattern.length){
      
              //5. Call nextSequence() after a 1000 millisecond delay.
              setTimeout(function () {
                nextSequence();
              }, 1000);
      
            }
      
          } else {
            
            $("#level-title").text("GameOver!!! \n To start Again press A")
            startOver();
            audioPLayer("wrong");
            console.log("wrong");
      
          }
      
      }

      function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
      }