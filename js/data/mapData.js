//A global array that stores static data for map loading

const TILE_SIZE = 32;

GLOBAL_MAP_DATA = [
   {
       //This is the overworld object
       
       //TILEMAP FILES
       mapKey: 'oworld', //key for tilemap
       setKey: 'oworld-tile',
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 0,
       spawnY: 0,
       
       //LOCATION TO RETURN TO IN OVERWORLD
       retX: 400,
       retY: 300
       
       //NPC DEFINITIONS
       //NPCs = [];
   },
   {
       //Kevn map definition
       //TILEMAP FILES
       mapKey: 'forestbattle',
       setKey: 'forest-tile', //key for tilemap
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 640,
       spawnY: 320,
       
       //LOCATION TO RETURN TO IN OVERWORLD
       retX: (18 * TILE_SIZE) + 16,
       retY: (10 * TILE_SIZE) + 16
       
       //NPC DEFINITIONS
       //NPCs = [];
   },
   {
       //Hatu map definition
       //TILEMAP FILES
       mapKey: 'forestbattle2',
       setKey: 'forest-tile', //key for tilemap
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 1792,
       spawnY: 384,
       
       //LOCATION TO RETURN TO IN OVERWORLD
       retX: (9 * TILE_SIZE) + 16,
       retY: (13 * TILE_SIZE) + 16
       
       //NPC DEFINITIONS
       //NPCs = [];
   }
]

const O_WORLD = 0;
const KEVN_1 = 1;
const HATU_1 = 2;
