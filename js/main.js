// Jacob Wynd, Kiefer Nemeth, Kevin Wu, Kindon Smith
// Initial demo of Monumental Pain
// includes basic movement and switching between top-down and platformer views
// 4/30/2017
//We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
//
// 5/2/2017 -Kindon, updated file structure so states have their own files
// (please update this comment block with each iteration)
// added background color via css
// changed background color to black and replaced hero character with a new character;
// removed header tag, and centered the game canvas onto the webpage

var game;
var global_destination;  // Use this variable to set where we are going
var global_x = 592;
var global_y = 768;
var global_playMusic = true;
var canPause = true;

window.onload = function() {
    //scaled dimensions: 600, 400
   game =  new Phaser.Game(800, 600, Phaser.CANVAS);
   // define states
   // Add gameOver state
   game.state.add('Boot', Boot);
   game.state.add('Load', Load);
   game.state.add('Title', Title);
   game.state.add('PlayOver', PlayOver);
   game.state.add('PlayPlatform', PlayPlatform);
   game.state.start('Boot');
   
}