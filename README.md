![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

<!-- Project title -->
# Jelly Invaders

<!-- Small introduction to game in 2/3 sentences. -->
# Intro
This browser game has been created using a few concepts of the classic Space Invaders.
It is my first project whilst studying at General Assembly in the Software Engineering Immersive. 


<!-- Short description about motivation behind the creation and maintenance of the project. -->
<!-- why this project matters -->
## Motivation
Since this is my first project whilst learning to code, I decided to create a game that I would enjoy. I decided to create a game containing some of the basics of Space Invaders, but also add my own ideas to. The pixel art in Space Invaders influenced me want to create a similar game, however I wanted to use a different theme to the classic.

# Table of Contents




<!-- Build status buttons -->
<!-- need more info -->

<!-- Code style buttons -->

## Screenshots
<!-- include logo screenshots, demo screenshots -->
<!--ADD IMAGE: ![readme-one](assets/screenshots/welcome-page) -->

## Tech used
* HTML
* CSS5
* JavaScript


## Getting Started
The game is deployed on GitHub Pages and it can be found here: https://github.com/missreems/project-01

Download the source code of the game using the clone button on the GitHub page. To play the game, open the index.html file in your browser and click 'Start'. If any issues arise, check the console. All images used within the game are PNG files and are stored in the assets folder. There are a range of sprites avaiable if you would like to change your player or jellies.


## Game Architecture

Jelly Invaders is a game where the user moves the player and attempts to shoot all the moving jellies on the 10x10 grid before it reaches the bottom. The player can be moved left and right using the left and right arrow keys, and can shoot using the 'V' key.

The game currently has 1 level, consisting of one wave of jellies.





The game has two modes which the player can choose from: one player or two players.

![readme-one](images/readme-one.png)

In the **two players mode** the players take turns to drop a Spongebob or a Squidward respectively until one of them manages to place four in a line vertically, horizontally or diagonally.

In the **one player mode** the player plays as Spongebob against the computer (Squidward). The computer reacts to Spongebob's move following these rules:

1) It checks if Spongebob has three in a row (vertical, diagonal or horizontal) and plays on the fourth circle. This for now only works if Spongebob's last move was to place the third circle. There's also an animation that shakes the three Spongebobs in a line to indicate that squidward defended.

The defence priority is horizontal > vertical > diagonal as naturally players will try to place four in a row or a column.

2) If there's no '3 in a line' then it checks for 2s in a line in all directions.

3) If there's no '2 in a line' either then it generates a random number between 0 and 2 and if 0 then places the player on the first available left hand side column. If 1 then places it above and if 2 then on the right.

An example of the function used for column four:


## Features
<!-- what makes your project stand out? -->

## Code Example
<!-- developers should be able to figure out how your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise. -->

## Installation
<!-- Provide step by step series of examples and explanations about how to get a development env running. -->

## How to use
<!-- include step by step guide to use your project. -->

## Credits
<!-- This could be a link to any repo which inspired you to build this project, any blogposts or links to people who contrbuted in this project. -->

## License
<!-- A short snippet describing the license (MIT, Apache etc) -->
<!-- MIT © Yourname -->

<!-- details to help a new user get started: 1. how to install and start the game -->