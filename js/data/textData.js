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
      text: ['Screen 1: Platworld test textbox using GLOBAL_TEXT_STYLE',
            'Screen 2: This sentence is very long so that I can see how the world wrap works using this style and so that others can see the world wrap as well',
            'Screen 3: Press \'E\' to continue'],
      style: GLOBAL_TEXT_STYLE
   },
   {
      // This is the overworld test text box
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
   }
]


/////////////////////////////
//CONSTANT VARIABLES BELOW //
//HOLD TEXT_DATA INDICES   //
//WITH MORE MEMORABLE NAMES//
/////////////////////////////

const OWORLD_TEXTBOX_TEST = 1;
const PLATWORLD_TEXTBOX_TEST = 0;