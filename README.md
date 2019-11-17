# SUPER HEROES RPG GAME

This is a RPG game with super heroes theme.

The goal of the game is defeat all the enemies.

When the game starts, the player will choose a character by clicking on the character's picture. The player will fight as that character for the rest of the game.

The player must then defeat all of the remaining characters.

Once the player selects an opponent, it will be able to click the attack button:

 - Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). 
 - The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. 
 - The player will keep hitting the attack button in an effort to defeat their opponent.
 
When the defender's HP is reduced to zero or below, the player character can now choose a new opponent.

The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

[Play the Game!](https://carolinapc.github.io/rpg-game/)

![gameview](https://carolinapc.github.io/assets/images/rpggame.png)

## Design notes

Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.

Each time the player attacks, their character's Attack Power increases by its base Attack Power. For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).

The enemy character only has Counter Attack Power. Unlike the player's Attack Points, Counter Attack Power never changes.

The Health Points, Attack Power and Counter Attack Power of each character are differ.

No characters in the game can heal or recover Health Points. 

The values of Health Points, Attack Power and Counter Attack Power changing every time the game starts.

## Technologies Used

- Javascript
- jQuery
- CSS

