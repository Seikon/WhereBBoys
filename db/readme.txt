-- Make sure that you have installed mongodb in your computer.
-- Open a terminal in your OS and execute mongo client ( make sure that you have a mongo service running (if not use mongod command))

mongod --dbpath %PROJECT_DIRECTORY%\db\data

Example: mongod --dbpath C:\Workspace\WhereBBoys\db\data

-- Execute the script createDatabase.mongo.js (create database and collections):

mongo < createDatabase.mongo.js

-- Insert the test data into db executing the testData.mongo.js script

mongo < testData.mongo.js

-- Create DB objects (indexes, triggers...)

mongo < createDBObjects.mongo.js

