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
       spawnX: 100,
       spawnY: 200,
       
       //LOCATION TO RETURN TO IN OVERWORLD
       retX: 18 * TILE_SIZE,
       retY: 10 * TILE_SIZE
       
       //NPC DEFINITIONS
       //NPCs = [];
   },
   {
       //Hatu map definition
       //TILEMAP FILES
       mapKey: 'forestbattle2',
       setKey: 'forest-tile', //key for tilemap
       
       //SPAWN LOCATION IN PLATFORM
       spawnX: 100,
       spawnY: 200,
       
       //LOCATION TO RETURN TO IN OVERWORLD
       retX: 18 * TILE_SIZE,
       retY: 10 * TILE_SIZE
       
       //NPC DEFINITIONS
       //NPCs = [];
   }
]

const O_WORLD = 0;
const KEVN_1 = 1;
const HATU_1 = 2;
