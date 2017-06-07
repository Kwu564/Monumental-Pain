//A global array that stores static data for map loading

const TILE_SIZE = 32;

GLOBAL_MAP_DATA = [
   {
       // 0
       //This is the overworld object
       
       //TILEMAP FILES
       mapKey: 'oworld', //key for tilemap
       setKey: 'oworld-tile',
       
       bgKey: null
   },
   {
       // 1
       //Kevn1 map definition
       //TILEMAP FILES
       mapKey: 'kevn1-map',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'kevn-bg'
   },
   {
       // 2
       //Kevn2 map definition
       //TILEMAP FILES
       mapKey: 'kevn2-map',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'kevn-bg'
   },
   {
       // 3
       //Hatu map definition
       //TILEMAP FILES
       mapKey: 'hatu1-map',
       setKey: 'mountain-tile', //key for tilemap
       
       bgKey: 'hatu-bg'
   },
   {
       // 4
       //Xanxiz map definition
       //TILEMAP FILES
       mapKey: 'xanxik1-map',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'xanzik-bg'
   },
   {
       // 5
       //ice map definition
       //TILEMAP FILES
       mapKey: 'ice1-map',
       setKey: 'ice-tile', //key for tilemap
       
       bgKey: 'hatu-bg'
   },
   {
       // 6
       //forestbattle1 map definition
       //TILEMAP FILES
       mapKey: 'forestbattle',
       setKey: 'forest-tile', //key for tilemap
       
       bgKey: 'kevn-bg'
   },
   {
      // 7
      //hero sanctuary map
      mapKey: 'herosanctuary',
      setKey: 'forest-tile',
      
      bgKey: 'kevn-bg'
   }
]

const O_WORLD = 0;
const KEVN_1 = 1;
const HATU_1 = 2;
const HATU_2 = 3;
const XANZIK_1 = 4;
const ICE_1 = 5;
const FORESTBATTLE_1 = 6;
const HERO_SANCTUARY = 7;
