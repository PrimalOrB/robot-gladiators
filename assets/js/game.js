// Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
  
    // Conditional Recursive Function Call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
  
    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if ( promptFight === "skip" ) {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // return true if player wants to leave
            return true;
        }
    }   
    return false;
};

// Fight function
var fight = function( enemy ) {
    var isPLayerTurn = true;

    // turn order randomize
    if( Math.random() > 0.5 ) {
        isPLayerTurn = false;
    }
    
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if ( isPLayerTurn ) {
            if ( fightOrSkip() ) {
                // if true, leave fight by breaking loop
                break;
                }
     
                var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

                // remove enemy health
                enemy.health=  Math.max(0, enemy.health- damage);

                // log a resulting message to the console so we know that it worked
                console.log(
                    playerInfo.name + " attacked " + enemy.name + " for " + damage + " damage. " + enemy.name + " now has " + enemy.health+ " health remaining."
                );

                // check enemy's health
                if (enemy.health<= 0) {
                    window.alert(enemy.name + " has died!");
                    // award player money for winning
                    playerInfo.money = playerInfo.money + 20;
                    break
                } else {
                    window.alert(enemy.name + " still has " + enemy.health+ " health left.");
                };
        } else {
            // subtract the value of 'enemy.attack' from the value of 'subtract the value of 'playerInfo.attack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable' and use that result to update the value in the 'playerInfo.health' variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack)
            playerInfo.health =  Math.max(0, playerInfo.health - damage);

            // log a resulting message to the console so we know that it worked
            console.log(
                enemy.name + " attacked " + playerInfo.name + " for " + damage + " damage. " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //check players health
            if (playerInfo.health <=0 ) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }    
        }
        // switch turn order for next round
        isPLayerTurn = !isPLayerTurn;
    }
};

// function to end the entire game
var endGame = function() {
    var highScore = function() {
        if( localStorage.getItem('highScore') ){
            var highScore = localStorage.getItem('highScore')
            var highScoreName = localStorage.getItem('name')
            if( playerInfo.money < highScore ) {
                window.alert("You did not beat the high score of " + highScore + " set by " + highScoreName)
            } else {
                localStorage.setItem('highScore',   playerInfo.money)
                localStorage.setItem('name',    playerInfo.name) 
                window.alert("Contratulations" + playerInfo.name + ", you set a new high score of " + playerInfo.money)
            }
        } else {
            localStorage.setItem('highScore',   playerInfo.money)
            localStorage.setItem('name',    playerInfo.name) 
        }
    }
    highScore()



    // if (playerInfo.health > 0) {
    //     window.alert("Great job, yo've survived the game! You now have a score of " + playerInfo.money + ".");
    // } else {
    //     window.alert("You have lost your robot in battle.");
    // }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    shopOptionPrompt = parseInt( shopOptionPrompt )

    switch(shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again");
            shop();
            break;
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * ( max - min + 1) ) + min;
    return value
}

var getPlayerName = function() {
    var name = "";

    while ( name === "" || name === null ) {
        name = prompt("What is your robot's name?")
    }

    console.log(`Your robot's name is ` + name)
    return name
}


var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
        },
    refillHealth: function() {
        if(this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars!")
            this.health += 20;
            this.money -= 7;
            console.log(this.name + "'s new health is " + this.health)
        } else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
            console.log(this.name + "'s new attack is " + this.attack)
        } else {
            window.alert("You don't have enough money!")
        }
    },
}

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14),
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14),
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14),
    }
  ];

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset()

    for (var i = 0; i < enemyInfo.length; i++) {
        console.log(playerInfo);

      if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
        var pickedEnemyObj = enemyInfo[i];
  
        pickedEnemyObj.health = randomNumber(40, 60);

        console.log(pickedEnemyObj);
  
        fight(pickedEnemyObj);

        if( playerInfo.health > 0 && i < enemyInfo.length - 1 ) {
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")

            if (storeConfirm){
                shop();
            }
        }
      }
      else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
    }

    endGame()
};
startGame()