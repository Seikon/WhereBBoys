//Create database if don't exists
use wherebboysdb;
//-----Create collections-----
// -- Training places
db.createCollection("trainingPlaces", {autoIndexId : true});

