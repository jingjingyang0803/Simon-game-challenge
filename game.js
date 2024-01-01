// Variable to track whether the game has started
var started = false;

// Variable to keep track of the game level
var level = 0;

// Event listener for keyboard press to start the game
$(document).keypress(function () {
  if (!started) {
    nextSequence(); // Start the game sequence
    started = true; // Update the game started status
  }
});

// Array of possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game's sequence of colors
var gamePattern = [];

// Array to store the sequence of colors clicked by the user
var userClickedPattern = [];

// Function to generate the next sequence in the game
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber]; // Select a random color from the array
  gamePattern.push(randomChosenColour); // Add the selected color to the game pattern
  console.log(gamePattern); // Log the game pattern for debugging

  // Animate the selected button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour); // Play the corresponding sound

  level++; // Increase the level
  $("#level-title").text("Level " + level); // Update the level display

  userClickedPattern = []; // Reset the user's clicked pattern for the new level
}

// Function to play sound based on the button color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Create a new audio object with the corresponding sound file
  audio.play(); // Play the sound
}

// Event listener for button clicks
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); // Get the id (color) of the clicked button
  userClickedPattern.push(userChosenColour); // Add the clicked color to the user's sequence
  console.log(userClickedPattern); // Log the user's sequence for debugging

  playSound(userChosenColour); // Play the corresponding sound
  animatePress(userChosenColour); // Animate the button press

  checkAnswer(userClickedPattern.length - 1); // Check the user's answer
});

// Function to animate the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Add the "pressed" class to the button
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // Remove the "pressed" class after 100ms
  }, 100);
}

// Function to check the user's answer against the game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user's answer is correct
    if (userClickedPattern.length === gamePattern.length) {
      // If the user has completed the sequence
      setTimeout(function () {
        nextSequence(); // Move to the next sequence after 1000ms
      }, 1000);
    }
  } else {
    // If the user's answer is wrong
    playSound("wrong"); // Play the wrong sound
    $("body").addClass("game-over"); // Add the "game-over" class to the body

    // Reset the game state
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;

    setTimeout(function () {
      $("body").removeClass("game-over"); // Remove the "game-over" class after 200ms
    }, 200);

    // Update the level title to indicate game over and prompt for restart
    $("#level-title").html("Game Over! <br />Press Any Key to Restart");
  }
}
