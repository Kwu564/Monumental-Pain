//A global array that stores static data for map loading

const TILE_SIZE = 32;

GLOBAL_MAP_DATA = [
   {
       // 0
       //This is the overworld object
       
       //TILEMAP FILES
       mapKey: 'oworld', //key for tilemap
       setKey: 'oworld-tile',
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 0,
       spawnY: 0,
       
       //NPC DEFINITIONS
       //NPCs = [];
   },
   {
       // 1
       //Kevn1 map definition
       //TILEMAP FILES
       mapKey: 'kevn1-map',
       setKey: 'forest-tile', //key for tilemap
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 640,
       spawnY: 320,
       
       //NPC DEFINITIONS
       //NPCs = [];
   },
   {
       // 2
       //Kevn2 map definition
       //TILEMAP FILES
       mapKey: 'kevn2-map',
       setKey: 'forest-tile', //key for tilemap
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 1792,
       spawnY: 384,
       
       //NPC DEFINITIONS
       //NPCs = [];
   },
   {
       // 3
       //Hatu map definition
       //TILEMAP FILES
       mapKey: 'forestbattle2',
       setKey: 'forest-tile', //key for tilemap
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 1792,
       spawnY: 384,
       
       //NPC DEFINITIONS
       //NPCs = [];
   },
   {
       // 4
       //Xanxiz map definition
       //TILEMAP FILES
       mapKey: 'xanxik1-map',
       setKey: 'forest-tile', //key for tilemap
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 1792,
       spawnY: 384,
       
       //NPC DEFINITIONS
       //NPCs = [];
   }
]

const O_WORLD = 0;
const KEVN_1 = 1;
const HATU_1 = 2;
const XANZIK_1 = 4;
