require('nodejs-require-enhancer');
const ObjectHelper = require('common/object/ObjectHelper.js');

function DatabaseStarter(){

  this.autoConfigure = (rootNodeModulesLocation) => {
    console.log("Searching database engine ...");

    if(!ObjectHelper.hasProperty(global.NodebootContext, "instancedDependecies.configuration.nodeboot.database.client")){
      console.log("nodeboot.database.engine was not found in application.json. Database starter will not autoconfigured.");
      return;
    }

    var databaseClient = global.NodebootContext.instancedDependecies.configuration.nodeboot.database.client;

    if(typeof databaseClient === 'undefined'){
      console.log(`Database client is null or empty : ${databaseEngine}`);
      return;
    }

    const options = global.NodebootContext.instancedDependecies.configuration.nodeboot.database;

    try{
      if (require.resolve(databaseClient)) {
         console.log(`database: ${databaseClient} was detected. Configuring...`);
         const knex = require('knex')(options);
         return knex;
      }else{
        console.log("database client is not loaded ad npm module");
      }
    }catch(err){
      console.log(err);
      if(err.code!="MODULE_NOT_FOUND"){
      }
    }
  }
}

module.exports = DatabaseStarter;
