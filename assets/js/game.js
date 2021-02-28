// Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 1000;
var playerAttack = 50;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Fight function
var fight = function( enemyName ) {

    while( enemyHealth > 0 && playerHealth > 0 ) {
        // prompt for player action
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose")

        // if player picks "skip" confirm and then stop the loop
        if ( promptFight === "skip" | promptFight === "SKIP" ) {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?")

            // if yes (true), leave fight
            if ( confirmSkip ) {
                window.alert( playerName + " has decided to skip this fight. Goodbye!");
                // subtract money form playerMoney for skipping
                playerMoney = playerMoney - 2;
                console.log("playerMoney", playerMoney)
                break
            }
            // if no (false ), as question again by running fight() again
            else {
                fight();
            }
            window.alert(playerName + " has chosen to skip the fight!");
        } 

        // subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
        enemyHealth =  enemyHealth - playerAttack;

        // log a resulting message to the console so we know that it worked
        console.log(
            playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        };

        // subtract the value of 'enemyAttack' from the value of 'subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable' and use that result to update the value in the 'playerHealth' variable
        playerHealth =  playerHealth - enemyAttack;

        // log a resulting message to the console so we know that it worked
        console.log(
            enemyName + " attacked " + playerName + " . " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check players health
        if (playerHealth <=0 ) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }    
    }
};

// function to end the entire game
var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great job, yo've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You have lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}


// function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 1000;
    playerAttack = 100;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
      if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
        var pickedEnemyName = enemyNames[i];
  
        enemyHealth = 50;
  
        fight(pickedEnemyName);
      }
      else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
    }

    endGame()
};
startGame()




//at the end of the game, either win or lose, ask if the player wants to play again

//if yes, refill initial stats


//refill would consume money and fill the player health

//upgrade would consume money and add the the player attack

