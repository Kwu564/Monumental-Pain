// Cutscene data

GLOBAL_CUTSCENE_DATA = [
   {
      // New game cutscene
      text: CUTSCENE1,
      bg: 'cutscene1',
      music: 'gameover-song',
      //which state to return to
      state: 'PlayPlatform',
      //destination to return to
      dest: HERO_SANCTUARY,
      execute: function() {
         global_save_point = 1;
      },
      onetime: false,
      played: false
   },
   {
      // "Protect Kevn"
      text: CUTSCENE2,
      bg: null,
      music: 'title-song',
      state: 'PlayPlatform',
      dest: KEVN_1,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   },
   {
      //Boss fight
      text: CUTSCENE3,
      bg: null,
      music: 'gameover-song',
      state: 'PlayPlatform',
      dest: BOSS_FIGHT,
      execute: function() {
         //empty
      },
      onetime: false,
      played: false
   }
]