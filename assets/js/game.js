// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset()

    // fight each enemy by looping through the list of enemies
    for ( var i = 0; i < enemyInfo.length; i++ ) {
        // log player attributes
        console.log( playerInfo );

        // if player is alive, procees
        if ( playerInfo.health > 0 ) {
            window.alert( "Welcome to Robot Gladiators! Round " + ( i + 1 ) );
    
            // pick enemy using looped index
            var pickedEnemyObj = enemyInfo[i];
    
            // set enemy random health
            pickedEnemyObj.health = randomNumber( 40, 60 );

            // log enemy attributes
            console.log( pickedEnemyObj );
    
            // pass the generated enemy to the fight function
            fight( pickedEnemyObj );

            // if the player lives after a fight, and its not the last enemy
            if( playerInfo.health > 0 && i < enemyInfo.length - 1 ) {
                // ask if player wants to enter shop
                var storeConfirm = window.confirm( "The fight is over, visit the store before the next round?" )

                // if yes, go to shop
                if ( storeConfirm ) {
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

// function to end the entire game
var endGame = function() {
    // check localStorage for a high score
    var highScore = function() {
        if( localStorage.getItem( 'highScore' ) ) {
            // if it exists, pull for comparison
            var highScore = localStorage.getItem( 'highScore' )
            var highScoreName = localStorage.getItem( 'name' )
            if( playerInfo.money < highScore ) {
                // if your score is less, post alert
                window.alert( "You did not beat the high score of " + highScore + " set by " + highScoreName )
            } else {
                // if your score is more, post new data to storage and alert
                localStorage.setItem( 'highScore',   playerInfo.money )
                localStorage.setItem( 'name',    playerInfo.name ) 
                window.alert( "Congratulations " + playerInfo.name + ", you set a new high score of " + playerInfo.money )
            }
        } else {
            // if it does not exist, post to storage
            localStorage.setItem( 'highScore',   playerInfo.money )
            localStorage.setItem( 'name',    playerInfo.name ) 
        }
    }
    // call function
    highScore();

    // ask to play again
    var playAgainConfirm = window.confirm( "Would you like to play again?" );

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert( "Thank you for playing Robot Gladiators! Come back soon!" );
    }
}

// Fight function
var fight = function( enemy ) {
    // initial turn selection
    var isPLayerTurn = true;

    // turn order randomize
    if( Math.random() > 0.5 ) {
        isPLayerTurn = false;
    }
    
    while ( playerInfo.health > 0 && enemy.health > 0 ) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if ( isPLayerTurn ) {
            if ( fightOrSkip() ) {
                // if true, leave fight by breaking loop
                break;
                }
                
                // randomize attack damage
                var damage = randomNumber( playerInfo.attack - 3, playerInfo.attack );

                // remove enemy health
                enemy.health=  Math.max( 0, enemy.health- damage );

                // log a resulting message to the console
                console.log(
                    playerInfo.name + " attacked " + enemy.name + " for " + damage + " damage. " + enemy.name + " now has " + enemy.health+ " health remaining."
                );

                // check enemy's health
                if ( enemy.health <= 0 ) {
                    // random money winnings
                    var winnings = randomNumber( 15, 25 );
                    window.alert( enemy.name + " has died! You have been awarded " + winnings + ' money' );
                    // if player wins award player random money for winning
                    playerInfo.money = playerInfo.money + winnings;
                    break
                } else {
                    // if enemy still alive, alert
                    window.alert( enemy.name + " still has " + enemy.health + " health left." );
                };
        } else {
            // randomize attack damage
            var damage = randomNumber( enemy.attack - 3, enemy.attack )

            // remove player health
            playerInfo.health =  Math.max( 0, playerInfo.health - damage );

            // log a resulting message to the console
            console.log(
                enemy.name + " attacked " + playerInfo.name + " for " + damage + " damage. " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //check players health
            if ( playerInfo.health <= 0 ) {
                // if player dies, alert
                window.alert( playerInfo.name + " has died!" );
                break;
            } else {
                // if player still alive, alert
                window.alert( playerInfo.name + " still has " + playerInfo.health + " health left." );
            }    
        }
        // switch turn order for next round
        isPLayerTurn = !isPLayerTurn;
    }
};

// function to end the entire game
var endGame = function() {
    var highScore = function() {
        if( localStorage.getItem( 'highScore' ) ){
            var highScore = localStorage.getItem( 'highScore' )
            var highScoreName = localStorage.getItem( 'name' )
            if( playerInfo.money < highScore ) {
                window.alert( "You did not beat the high score of " + highScore + " set by " + highScoreName )
            } else {
                localStorage.setItem( 'highScore',   playerInfo.money )
                localStorage.setItem( 'name',    playerInfo.name ) 
                window.alert( "Contratulations" + playerInfo.name + ", you set a new high score of " + playerInfo.money )
            }
        } else {
            localStorage.setItem( 'highScore',   playerInfo.money )
            localStorage.setItem( 'name',    playerInfo.name ) 
        }
    }
    highScore()

    var playAgainConfirm = window.confirm( "Would you like to play again?" );

    if ( playAgainConfirm ) {
        startGame();
    } else {
        window.alert( "Thank you for playing Robot Gladiators! Come back soon!" );
    }
}
// shop function
var shop = function() {
    // prompt for type of shopping
    var shopOptionPrompt = window.prompt( "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE." );
    
    // validate that input was entered
    if ( !shopOptionPrompt ) {
        window.alert( "You need to provide a valid answer! Please try again." );
        return shop();
      }
    
    // conver to number  
    shopOptionPrompt = parseInt( shopOptionPrompt )

    // switch based on selection
    switch( shopOptionPrompt ) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert( "Leaving the store." );
            break;
        default:
            window.alert( "You did not pick a valid option. Try again" );
            shop();
            break;
    }
}

// random number function
var randomNumber = function( min, max ) {
    var value = Math.floor( Math.random() * ( max - min + 1) ) + min;
    return value;
};

// set player name
var getPlayerName = function() {
    var name = "";

    while ( !name ) {
        name = prompt( "What is your robot's name?" )
    }

    console.log( `Your robot's name is ` + name )
    return name;
};


// see if the player wants to commit to a fight, or skip
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt( 'Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.' );
      
    // Conditional Recursive Function Call
    if ( !promptFight ) {
        window.alert( "You need to provide a valid answer! Please try again." );
        return fightOrSkip();
    }
  
    // lowercase for validation
    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if ( promptFight === "skip" ) {
      // confirm player wants to skip
      var confirmSkip = window.confirm( "Are you sure you'd like to quit?" );
  
        // if yes (true), leave fight
        if ( confirmSkip ) {
            window.alert( playerInfo.name + " has decided to skip this fight. Goodbye!" );
            // subtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max( 0, playerInfo.money - 10 );

            // return true if player wants to leave
            return true;
        }
    }   
    return false;
};


// Define player
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
        if( this.money >= 7 ) {
            window.alert( "Refilling player's health by 20 for 7 dollars!" )
            this.health += 20;
            this.money -= 7;
            console.log( this.name + "'s new health is " + this.health )
        } else {
            window.alert( "You don't have enough money!" )
        }
    },
    upgradeAttack: function() {
        if( this.money >= 7 ) {
            window.alert( "Upgrading player's attack by 6 for 7 dollars." );
            this.attack += 6;
            this.money -= 7;
            console.log( this.name + "'s new attack is " + this.attack )
        } else {
            window.alert( "You don't have enough money!" )
        }
    },
};

// Define enemies
var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber( 10, 14 ),
    },
    {
      name: "Amy Android",
      attack: randomNumber( 10, 14 ),
    },
    {
      name: "Robo Trumble",
      attack: randomNumber( 10, 14 ),
    }
];

//Run Game
startGame();

