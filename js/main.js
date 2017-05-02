// Jacob Wynd, Kiefer Nemeth, Kevin Wu, Kindon Smith
// Initial demo of Monumental Pain
// includes basic movement and switching between top-down and platformer views
// 4/30/2017
//
// 5/2/2017 -Kindon, updated file structure so states have their own files
// (please update this comment block with each iteration)

var game;

window.onload = function() {
   game =  new Phaser.Game(800, 600, Phaser.AUTO);
   // define states
   // Add boot, title, and gameOver states later
   game.state.add('Load', Load);
   game.state.add('PlayOver', PlayOver);
   game.state.add('PlayPlatform', PlayPlatform);
   game.state.start('Load'); // in final build, should say 'Boot'
}

////////////////////////
//BOOT STATE GOES HERE or before load
////////////////////////



/////////////////////////
//TITLE STATE GOES before Play
/////////////////////////



