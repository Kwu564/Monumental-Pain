// An array file for all text boxes and related data

// Text stlyes

const GLOBAL_TEXT_STYLE = {
   font: "Courier",
   fontSize: "16px",
   fill: 'black',
   wordWrap: true,
   wordWrapWidth: 800,
   align: 'center',
   backgroundColor: '#CFA26B'
}

const MAIN_BUTTON_TEXT_STYLE = {
   font: "Courier",
   fontSize: "32px",
   fill: 'black',
   align: 'center',
   backgroundColor: "#CFA26B"
}

const PAUSE_BUTTON_TEXT_STYLE = {
   font: "Courier",
   fontSize: "64px",
   fill: 'black',
   align: 'center',
   backgroundColor: "#CFA26B"
}

// TEXT_DATA will contain words of all text boxes pass objects from 
// this array to the function in the text prefab to create text boxes
// Psuedo code format for TEXT_DATA objects
/*
* {
   // Place a comment here explaining what this textbox is for and any other relevent information
   text: ['text that goes in first screen',
         'text that goes in second screen',
         'and so on...'],
   style: {
      // In here you can define a new object with the same fields as GLOBAL_TEXT_STYLE
      // or define a new single use text box stlye
      // if you think you will want to use the same style multiple times,
      // define it below as const STLYENAME_STYLE = {//object definition//}
   }
}
*/
const TEXT_DATA = [{
      // This is the platWorld test
      // Index 0
      text: ['Screen 1: Platworld test textbox using GLOBAL_TEXT_STYLE',
            'Screen 2: This sentence is very long so that I can see how the world wrap works using this style and so that others can see the world wrap as well',
            'Screen 3: Press \'E\' to continue'],
      style: GLOBAL_TEXT_STYLE
   },
   {
      // This is the overworld test text box 
      // Index 1
      text: ['This text box will pause the game, press \'E\' to continue to the next screen',
            'text is big to demonstrate that style can change by textBox',
            'Text box is anchored at the top center',
            'Anchor points can be arguments of textBox later if people think it is necessary',
            'press \'E\' to begin your adventure'],
      style: {
         font: "bold Courier",
         fontSize: "28px",
         fill: 'black',
         wordWrap: true,
         wordWrapWidth: 500,
         align: 'center',
         backgroundColor: '#CFA26B'
      }
   },
   {
      // This is the help text box for the title screen (and possibly pause menu later)
      // Index 2
      text: ['~~TEXTBOX~~\n\nWhenever you see a textbox like this, you may press \'E\' to move to the next box, \'Q\' to go back to the previous box, or \'ESC\' to return to the game at any time \nPress \'E\' to continue',
            '~~MAP VIEW~~\n\nThe game has two points of view, the first is a top down "Map View" when in this mode use \'W\' to move north, \'A\' to move west, \'S\' to move south, and \'D\' to move east',
            '~~PLATFORMER~~\n\nWhen in map view, you can walk into a town to enter it. After entering a town or other object from the map view, you will be in a platformer where you can use\'W\' to jump, \'A\' to move left, and \'D\' to move right',
            '~~PLATFORMER CONT.~~\n\n In the platformer levels, you can use \'SPACEBAR\' to attack and \'E\' to go through doors\n To return to the Map View, walk off either side of the screen',
            '~~WEAPONS~~\n\nWhen in the platformer you will have access to weapons press\'1\' to equip the sword, \'2\' to equip the crossbow, and \'3\' to sheath all weapons.',
            '~~THANKS~~\n\n Thank you for playing "Monumental Pain", have fun storming the castle'],
      style: {
         font: 'Courier',
         fontSize: '32px',
         fill: 'black',
         wordWrap: true,
         wordWrapWidth: 600,
         align: 'center',
         backgroundColor: '#CFA26B'
      }
   },
   {
      text: ['You are a fool. Your mother thinks so. I think so. You probably think so too.','That\'s how much of a fool you are'],
      style: GLOBAL_TEXT_STYLE
   }
]


/////////////////////////////
//CONSTANT VARIABLES BELOW //
//HOLD TEXT_DATA INDICES   //
//WITH MORE MEMORABLE NAMES//
/////////////////////////////

const PLATWORLD_TEXTBOX_TEST = 0;
const OWORLD_TEXTBOX_TEST = 1;
const HELP = 2;
const YOU_ARE_A_FOOL = 3;

////////////////////////////////////////////
// THIS CONSTANT IS A BOOLEAN VALUES THAT //
// EXPRESSES THE NAVIGATION LIMITATIONS   //
////////////////////////////////////////////

const NAVIGABLE = true;