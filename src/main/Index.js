const ObjectHelper = require('./common/object/ObjectHelper.js');

function DatabaseStarter(){

  this.autoConfigure = () => {
    console.log("Searching database engine ...");

    if(!ObjectHelper.hasProperty(global.NodebootContext, "instancedDependecies.configuration.nodeboot.database.client")){
      console.log("nodeboot.database.engine was not found in application.json. Database starter will not autoconfigured.");
      return;
    }
    var databaseClient = global.NodebootContext.instancedDependecies.configuration.nodeboot.database.client;

    if(databaseClient === ''){
      console.log(`Database client is null or empty : ${databaseClient}`);
      return;
    }

    const options = global.NodebootContext.instancedDependecies.configuration.nodeboot.database;

    try{
      if (require.resolve(databaseClient)) {
         console.log(`database: ${databaseClient} was detected. Configuring...`);
         const knex = require('knex')(options);
         return knex;
      }else{
        console.log("database client is not loaded as npm module");
      }
    }catch(err){
      console.log(err);
    }
  }
}

module.exports = DatabaseStarter;
